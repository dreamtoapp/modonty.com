'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';

/**
 * Get all routes that the current user has access to
 */
export async function getAccessibleRoutes(): Promise<string[]> {
  try {
    const session = await auth();

    if (!session?.user) {
      return [];
    }

    const userId = session.user.id;
    const userRole = session.user.role as UserRole;

    // All possible admin routes (used for SUPER_ADMIN or as reference)
    const allRoutes = [
      '/admin',
      '/admin/organizational-structure',
      '/admin/general-plan',
      '/admin/phase-1-requirements',
      '/admin/hiring-plan',
      '/admin/applications',
      '/admin/applications/interviews',
      '/admin/staff',
      '/admin/contact-messages',
      '/admin/accounting',
      '/admin/costs',
      '/admin/source-of-income',
      '/admin/modonty',
      '/admin/bmc',
      '/admin/bmc/canvas',
      '/admin/bmc/canvas/edit',
      '/admin/subscriptions',
      '/admin/customers',
      '/admin/tasks',
      '/admin/tasks/my-tasks',
      '/admin/notes',
      '/admin/contracts',
      '/admin/reports',
      '/admin/settings',
      '/admin/users',
    ];

    // SUPER_ADMIN has access to all routes
    if (userRole === UserRole.SUPER_ADMIN) {
      return allRoutes;
    }

    // Query user's specific route permissions directly (optimized)
    const userPermissions = await prisma.userRoutePermission.findMany({
      where: { userId },
      select: { route: true },
    });

    // Return list of routes user has access to
    return userPermissions.map((perm) => perm.route);
  } catch (error) {
    console.error('Error getting accessible routes:', error);
    // Return empty array on error to prevent crashes
    return [];
  }
}


