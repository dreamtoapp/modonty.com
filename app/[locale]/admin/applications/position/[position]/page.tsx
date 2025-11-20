import { prisma } from '@/lib/prisma';
import { getApplicationStatsByPosition } from '@/lib/applications';
import { ApplicationCard } from '@/components/ApplicationCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, Clock, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getCanonicalPositionTitle, getPositionAliases, getTeamPositions } from '@/helpers/extractMetrics';
import { SortApplications } from '@/components/SortApplications';

export default async function PositionApplicationsPage(
  props: {
    params: Promise<{ locale: string; position: string }>;
    searchParams: Promise<{ sort?: string; status?: string }>;
  }
) {
  const params = await props.params;
  const { locale, position } = params;
  const searchParams = await props.searchParams;
  const { sort, status } = searchParams;
  const decodedPosition = decodeURIComponent(position);
  const canonicalPosition = getCanonicalPositionTitle(decodedPosition);
  const positionAliases = getPositionAliases(canonicalPosition);
  const teamPositions = getTeamPositions();
  const matchedPosition = teamPositions.find((pos) => pos.titleEn === canonicalPosition);
  const displayPosition =
    matchedPosition && locale === 'ar' ? matchedPosition.title : canonicalPosition;

  type StatusFilterKey = 'pending' | 'reviewed' | 'accepted' | 'rejected' | 'total';
  const statusValueMap: Record<Exclude<StatusFilterKey, 'total'>, 'PENDING' | 'REVIEWED' | 'ACCEPTED' | 'REJECTED'> = {
    pending: 'PENDING',
    reviewed: 'REVIEWED',
    accepted: 'ACCEPTED',
    rejected: 'REJECTED',
  };
  const allowedStatusKeys: StatusFilterKey[] = ['pending', 'reviewed', 'accepted', 'rejected', 'total'];
  const normalizedStatus: StatusFilterKey =
    status && allowedStatusKeys.includes(status.toLowerCase() as StatusFilterKey)
      ? (status.toLowerCase() as StatusFilterKey)
      : 'pending';
  const selectedStatus =
    normalizedStatus === 'total'
      ? null
      : statusValueMap[normalizedStatus as Exclude<StatusFilterKey, 'total'>];

  const buildFilterHref = (statusKey: StatusFilterKey) => {
    const params = new URLSearchParams();
    if (sort === 'newest') {
      params.set('sort', 'newest');
    }
    params.set('status', statusKey);
    return `?${params.toString()}`;
  };

  const isActiveStatus = (statusKey: StatusFilterKey) => normalizedStatus === statusKey;

  // Determine sort order (default: oldest first)
  const sortOrder = sort === 'newest' ? 'desc' : 'asc';

  // Fetch statistics and applications for this position
  const [stats, applications] = await Promise.all([
    getApplicationStatsByPosition(canonicalPosition, positionAliases),
    prisma.application.findMany({
      where: {
        position: { in: positionAliases },
        ...(selectedStatus ? { status: selectedStatus } : {}),
      },
      orderBy: { createdAt: sortOrder },
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
            <h1 className="text-4xl font-bold">{displayPosition}</h1>
          </div>
        </div>
        <p className="text-muted-foreground text-base">
          {locale === 'ar'
            ? `إحصائيات وطلبات التوظيف لوظيفة ${displayPosition}`
            : `Application statistics and details for ${displayPosition} position`}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Link href={buildFilterHref('total')} className="block">
          <Card className={isActiveStatus('total') ? 'ring-2 ring-primary' : ''}>
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
        </Link>

        <Link href={buildFilterHref('pending')} className="block">
          <Card className={isActiveStatus('pending') ? 'ring-2 ring-primary' : ''}>
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
        </Link>

        <Link href={buildFilterHref('reviewed')} className="block">
          <Card className={isActiveStatus('reviewed') ? 'ring-2 ring-primary' : ''}>
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
        </Link>

        <Link href={buildFilterHref('accepted')} className="block">
          <Card className={isActiveStatus('accepted') ? 'ring-2 ring-primary' : ''}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {locale === 'ar' ? 'مقبول' : 'Accepted'}
                  </p>
                  <p className="text-3xl font-bold mt-1 text-green-600">{stats.accepted}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {locale === 'ar' ? 'الردود:' : 'Responses:'}{' '}
                    <span className="text-green-500 font-semibold">{stats.acceptedWithResponses}</span>
                  </p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href={buildFilterHref('rejected')} className="block">
          <Card className={isActiveStatus('rejected') ? 'ring-2 ring-primary' : ''}>
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
        </Link>
      </div>

      {/* Sort and Applications List */}
      {applications.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              {locale === 'ar' ? 'الطلبات' : 'Applications'}
            </h2>
            <SortApplications locale={locale} currentSort={sort || 'oldest'} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((application) => (
              <ApplicationCard key={application.id} application={application} locale={locale} />
            ))}
          </div>
        </>
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

