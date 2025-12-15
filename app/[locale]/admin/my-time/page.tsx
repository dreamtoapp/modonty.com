import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';
import { redirect } from 'next/navigation';
import { getStaffTimeEntries } from '@/actions/clockify';
import { MyTimeClient } from '@/components/admin/MyTimeClient';

export default async function MyTimePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect(`/${locale}/admin`);
  }

  const role = session.user.role as UserRole;

  if (role !== UserRole.STAFF) {
    redirect(`/${locale}/admin`);
  }

  // Find staff record for this user
  const staff = await prisma.staff.findUnique({
    where: { userId: session.user.id },
    select: {
      id: true,
      application: {
        select: {
          applicantName: true,
        },
      },
      name: true,
    },
  });

  if (!staff) {
    // No staff record linked; redirect back to dashboard
    redirect(`/${locale}/admin`);
  }

  // Current month range
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  const result = await getStaffTimeEntries(staff.id, startOfMonth, endOfMonth);

  const staffName =
    staff.application?.applicantName || staff.name || session.user.name || session.user.email || 'User';

  return (
    <MyTimeClient
      summary={result.success ? result.summary ?? null : null}
      staffName={staffName}
      startDate={startOfMonth.toISOString()}
      endDate={endOfMonth.toISOString()}
      locale={locale}
    />
  );
}

