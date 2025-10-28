import { getTranslations } from 'next-intl/server';
import { getApplicationCountsByPosition } from '@/lib/applications';
import { getTeamPositions } from '@/helpers/extractMetrics';
import { AdminSidebarClient } from './AdminSidebarClient';

interface AdminSidebarProps {
  locale: string;
}

export async function AdminSidebar({ locale }: AdminSidebarProps) {
  const t = await getTranslations('admin');

  // Fetch application counts
  const applicationCounts = await getApplicationCountsByPosition();
  const positions = getTeamPositions();

  // Create a map for easy lookup
  const countsMap = new Map(applicationCounts.map(c => [c.position, c.total]));

  // Group positions by category
  const leadershipPositions = positions.filter(p => p.phase === 0);
  const technicalPositions = positions.filter(p => p.phase === 1);
  const contentPositions = positions.filter(p => p.phase === 2);
  const salesPositions = positions.filter(p => p.phase === 4);

  const positionGroups = [
    {
      label: locale === 'ar' ? 'القيادة والإدارة' : 'Leadership',
      positions: leadershipPositions,
    },
    {
      label: locale === 'ar' ? 'الفريق التقني' : 'Technical Team',
      positions: technicalPositions,
    },
    {
      label: locale === 'ar' ? 'فريق المحتوى' : 'Content Team',
      positions: contentPositions,
    },
    {
      label: locale === 'ar' ? 'المبيعات والتسويق' : 'Sales & Marketing',
      positions: salesPositions,
    },
  ];

  return (
    <AdminSidebarClient
      locale={locale}
      positionGroups={positionGroups}
      countsMap={Object.fromEntries(countsMap)}
      translations={{
        adminPanel: t('adminPanel'),
        organizationalStructure: t('organizationalStructure'),
        applications: t('applications'),
        allApplications: t('allApplications'),
        generalPlan: t('generalPlan'),
        hiringPlan: t('hiringPlan'),
      }}
    />
  );
}

