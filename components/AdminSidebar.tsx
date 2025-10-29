import { getTranslations } from 'next-intl/server';
import { getApplicationCountsByPosition } from '@/lib/applications';
import { AdminSidebarClient } from './AdminSidebarClient';

interface AdminSidebarProps {
  locale: string;
}

export async function AdminSidebar({ locale }: AdminSidebarProps) {
  const t = await getTranslations('admin');

  // Fetch application counts
  const applicationCounts = await getApplicationCountsByPosition();

  // Calculate total applications count
  const totalApplications = applicationCounts.reduce((sum, c) => sum + c.total, 0);

  return (
    <AdminSidebarClient
      locale={locale}
      totalCount={totalApplications}
      translations={{
        adminPanel: t('adminPanel'),
        subscriptions: t('subscriptions'),
        customers: t('customers'),
        tasks: t('tasks'),
        organizationalStructure: t('organizationalStructure'),
        applications: t('applications'),
        generalPlan: t('generalPlan'),
        hiringPlan: t('hiringPlan'),
        phase1Requirements: t('phase1Requirements'),
        accounting: t('accounting'),
        employeeAffairs: t('employeeAffairs'),
        administrativeNotes: t('administrativeNotes'),
        reports: t('reports'),
        settings: t('settings'),
      }}
    />
  );
}

