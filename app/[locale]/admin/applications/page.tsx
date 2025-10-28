import { prisma } from '@/lib/prisma';
import { ApplicationCard } from '@/components/ApplicationCard';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, Clock, CheckCircle2, X, XCircle } from 'lucide-react';
import Link from 'next/link';

export default async function ApplicationsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ position?: string }>;
}) {
  const { locale } = await params;
  const { position: filterPosition } = await searchParams;

  // Build query with optional position filter
  const whereClause = filterPosition ? { position: filterPosition } : {};

  const [applications, stats] = await Promise.all([
    prisma.application.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.application.groupBy({
      by: ['status'],
      where: whereClause,
      _count: true,
    }),
  ]);

  const statsMap = {
    total: applications.length,
    pending: stats.find((s) => s.status === 'PENDING')?._count || 0,
    reviewed: stats.find((s) => s.status === 'REVIEWED')?._count || 0,
    accepted: stats.find((s) => s.status === 'ACCEPTED')?._count || 0,
    rejected: stats.find((s) => s.status === 'REJECTED')?._count || 0,
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
            <Briefcase className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">
              {locale === 'ar' ? 'طلبات التوظيف' : 'Job Applications'}
            </h1>
          </div>
        </div>
        <p className="text-muted-foreground text-base">
          {locale === 'ar'
            ? 'إدارة ومراجعة جميع طلبات التوظيف المقدمة'
            : 'Manage and review all submitted job applications'}
        </p>

        {/* Filter Badge */}
        {filterPosition && (
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">
              {locale === 'ar' ? 'مفلتر حسب الوظيفة:' : 'Filtered by position:'}
            </span>
            <Badge variant="secondary" className="text-sm">
              {filterPosition}
            </Badge>
            <Link href={`/${locale}/admin/applications`}>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                <X className="h-3 w-3 mr-1" />
                {locale === 'ar' ? 'إزالة الفلاتر' : 'Clear Filters'}
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {locale === 'ar' ? 'إجمالي الطلبات' : 'Total Applications'}
                </p>
                <p className="text-3xl font-bold mt-1">{statsMap.total}</p>
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
                <p className="text-3xl font-bold mt-1 text-yellow-600">{statsMap.pending}</p>
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
                <p className="text-3xl font-bold mt-1 text-blue-600">{statsMap.reviewed}</p>
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
                <p className="text-3xl font-bold mt-1 text-green-600">{statsMap.accepted}</p>
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
                <p className="text-3xl font-bold mt-1 text-red-600">{statsMap.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              {locale === 'ar' ? 'لا توجد طلبات توظيف' : 'No Applications Yet'}
            </h2>
            <p className="text-muted-foreground">
              {locale === 'ar'
                ? 'سيتم عرض طلبات التوظيف هنا عند استلامها'
                : 'Job applications will appear here when submitted'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((application) => (
            <ApplicationCard key={application.id} application={application} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}

