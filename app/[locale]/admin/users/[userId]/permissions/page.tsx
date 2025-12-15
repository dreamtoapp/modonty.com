import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { UserRole } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getUserRoutePermissions } from '@/actions/userPermissions';
import { UserPermissionsPageClient } from './UserPermissionsPageClient';

const ALL_ROUTES = [
  { route: '/admin', label: 'dashboard' },
  { route: '/admin/organizational-structure', label: 'organizationalStructure' },
  { route: '/admin/general-plan', label: 'generalPlan' },
  { route: '/admin/phase-1-requirements', label: 'phase1Requirements' },
  { route: '/admin/hiring-plan', label: 'hiringPlan' },
  { route: '/admin/applications', label: 'applications' },
  { route: '/admin/applications/interviews', label: 'interviews' },
  { route: '/admin/staff', label: 'staffManagement' },
  { route: '/admin/contact-messages', label: 'contactMessages' },
  { route: '/admin/accounting', label: 'accounting' },
  { route: '/admin/costs', label: 'costs' },
  { route: '/admin/source-of-income', label: 'sourceOfIncome' },
  { route: '/admin/modonty', label: 'modonty' },
  { route: '/admin/bmc', label: 'bmc' },
  { route: '/admin/bmc/canvas', label: 'bmcCanvas' },
  { route: '/admin/bmc/canvas/edit', label: 'bmcCanvasEdit' },
  { route: '/admin/subscriptions', label: 'subscriptions' },
  { route: '/admin/customers', label: 'customers' },
  { route: '/admin/tasks', label: 'tasks' },
  { route: '/admin/tasks/my-tasks', label: 'myTasks' },
  { route: '/admin/notes', label: 'administrativeNotes' },
  { route: '/admin/contracts', label: 'contracts' },
  { route: '/admin/reports', label: 'reports' },
  { route: '/admin/settings', label: 'settings' },
  { route: '/admin/users', label: 'users' },
];

export default async function UserPermissionsPage({
  params,
}: {
  params: Promise<{ locale: string; userId: string }>;
}) {
  const session = await auth();
  const { locale, userId } = await params;
  const t = await getTranslations('admin');

  // Only SUPER_ADMIN can access this page
  if (!session?.user || session.user.role !== UserRole.SUPER_ADMIN) {
    redirect(`/${locale}/admin`);
  }

  // Fetch user data
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  // User not found
  if (!user) {
    notFound();
  }

  // SUPER_ADMIN cannot have permissions modified
  if (user.role === UserRole.SUPER_ADMIN) {
    redirect(`/${locale}/admin/users`);
  }

  // Fetch user's current route permissions
  let userRoutes: string[] = [];
  try {
    userRoutes = await getUserRoutePermissions(userId);
  } catch (error) {
    console.error('Error fetching user permissions:', error);
  }

  return (
    <UserPermissionsPageClient
      user={user}
      initialRoutes={userRoutes}
      allRoutes={ALL_ROUTES}
      locale={locale}
    />
  );
}


