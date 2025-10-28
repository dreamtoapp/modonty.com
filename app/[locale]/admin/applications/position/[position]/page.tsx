import { prisma } from '@/lib/prisma';
import { getApplicationStatsByPosition } from '@/lib/applications';
import { ApplicationCard } from '@/components/ApplicationCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, Clock, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function PositionApplicationsPage({
  params
}: {
  params: Promise<{ locale: string; position: string }>;
}) {
  const { locale, position } = await params;
  const decodedPosition = decodeURIComponent(position);

  // Fetch statistics and applications for this position
  const [stats, applications] = await Promise.all([
    getApplicationStatsByPosition(decodedPosition),
    prisma.application.findMany({
      where: { position: decodedPosition },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <Link href={`/${locale}/admin/applications`}>
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'العودة لجميع الطلبات' : 'Back to All Applications'}
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
            <Briefcase className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">{decodedPosition}</h1>
          </div>
        </div>
        <p className="text-muted-foreground text-base">
          {locale === 'ar'
            ? `إحصائيات وطلبات التوظيف لوظيفة ${decodedPosition}`
            : `Application statistics and details for ${decodedPosition} position`}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {locale === 'ar' ? 'إجمالي الطلبات' : 'Total'}
                </p>
                <p className="text-3xl font-bold mt-1">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {locale === 'ar' ? 'قيد المراجعة' : 'Pending'}
                </p>
                <p className="text-3xl font-bold mt-1 text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {locale === 'ar' ? 'تمت المراجعة' : 'Reviewed'}
                </p>
                <p className="text-3xl font-bold mt-1 text-blue-600">{stats.reviewed}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {locale === 'ar' ? 'مقبول' : 'Accepted'}
                </p>
                <p className="text-3xl font-bold mt-1 text-green-600">{stats.accepted}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {locale === 'ar' ? 'مرفوض' : 'Rejected'}
                </p>
                <p className="text-3xl font-bold mt-1 text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications List */}
      {applications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((application) => (
            <ApplicationCard key={application.id} application={application} locale={locale} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {locale === 'ar' ? 'لا توجد طلبات بعد' : 'No Applications Yet'}
            </h3>
            <p className="text-muted-foreground">
              {locale === 'ar'
                ? 'لم يتم استلام أي طلبات توظيف لهذه الوظيفة'
                : 'No job applications have been received for this position yet'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

