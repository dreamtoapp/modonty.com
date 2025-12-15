import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';
import { redirect } from 'next/navigation';
import { getStaffTimeEntries } from '@/actions/clockify';
import { TimesheetDetailPage } from '@/components/admin/TimesheetDetailPage';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function TimeTrackingStaffPage({
  params,
}: {
  params: Promise<{ locale: string; staffId: string }>;
}) {
  const { locale, staffId } = await params;
  const isArabic = locale === 'ar';
  const session = await auth();

  if (!session?.user) {
    redirect(`/${locale}/admin`);
  }

  const userRole = session.user.role as UserRole;

  if (userRole !== UserRole.ADMIN && userRole !== UserRole.SUPER_ADMIN) {
    redirect(`/${locale}/admin`);
  }

  const staff = await prisma.staff.findUnique({
    where: { id: staffId },
    select: {
      id: true,
      name: true,
      application: {
        select: {
          applicantName: true,
        },
      },
    },
  });

  if (!staff) {
    redirect(`/${locale}/admin`);
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  const result = await getStaffTimeEntries(staffId, startOfMonth, endOfMonth);

  if (!result.success || !result.summary) {
    redirect(`/${locale}/admin`);
  }

  const staffName =
    staff.application?.applicantName || staff.name || 'Unknown Staff';

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <Link href={`/${locale}/admin`}>
          <Button variant="ghost" size="sm">
            {isArabic ? <ArrowRight className="h-4 w-4 ml-2" /> : <ArrowLeft className="h-4 w-4 mr-2" />}
            {isArabic ? 'العودة' : 'Back'}
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {isArabic ? 'سجل وقت الموظف' : 'Staff Timesheet'}
          </h1>
          <p className="text-muted-foreground">
            {staffName} • {startOfMonth.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')} - {endOfMonth.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {isArabic ? 'تفاصيل سجل الوقت' : 'Timesheet Details'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TimesheetDetailPage
              staffName={staffName}
              summary={result.summary}
              startDate={startOfMonth}
              endDate={endOfMonth}
              locale={locale}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
