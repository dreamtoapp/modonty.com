import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { getApplicationCountsByPosition, type ApplicationCounts } from '@/lib/applications';
import { getAccessibleRoutes } from '@/actions/auth';
import { AdminSidebarClient } from './AdminSidebarClient';

interface AdminSidebarProps {
  locale: string;
}

export async function AdminSidebar({ locale }: AdminSidebarProps) {
  const t = await getTranslations('admin');

  // Fetch data with error handling
  let applicationCounts: ApplicationCounts[] = [];
  let contactMessageCount = 0;
  let accessibleRoutes: string[] = [];

  try {
    // Fetch application counts
    applicationCounts = await getApplicationCountsByPosition();
    contactMessageCount = await prisma.contactMessage.count();

    // Get accessible routes for current user (server-side)
    accessibleRoutes = await getAccessibleRoutes();
  } catch (error) {
    console.error('Error loading admin sidebar data:', error);
    // Continue with empty data to prevent page crash
  }

  // Calculate total applications count
  const totalApplications = applicationCounts.reduce((sum, c) => sum + c.total, 0);

  return (
    <AdminSidebarClient
      locale={locale}
      totalCount={totalApplications}
      contactMessageCount={contactMessageCount}
      accessibleRoutes={accessibleRoutes}
      translations={{
        adminPanel: t('adminPanel'),
        dashboard: t('dashboard'),
        subscriptions: t('subscriptions'),
        customers: t('customers'),
        tasks: t('tasks'),
        organizationalStructure: t('organizationalStructure'),
        applications: t('applications'),
        contactMessages: t('contactMessages'),
        generalPlan: t('generalPlan'),
        hiringPlan: t('hiringPlan'),
        phase1Requirements: t('phase1Requirements'),
        accounting: t('accounting'),
        costs: t('costs'),
        sourceOfIncome: t('sourceOfIncome'),
        modonty: t('modonty'),
        bmc: t('bmc'),
        bmcCanvas: t('bmcCanvas'),
        bmcCanvasEdit: t('bmcCanvasEdit'),
        employeeAffairs: t('employeeAffairs'),
        administrativeNotes: t('administrativeNotes'),
        contracts: t('contracts'),
        reports: t('reports'),
        settings: t('settings'),
        users: t('users'),
        staff: t('staffManagement'),
      }}
    />
  );
}














