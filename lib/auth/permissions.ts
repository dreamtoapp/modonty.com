import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';

/**
 * Check if a user has permission to access a route
 * @param route - The route to check (e.g., "/admin/applications")
 * @param userId - The user ID to check permissions for
 * @returns true if user has access, false otherwise
 */
export async function hasRoutePermission(
  route: string,
  userId: string
): Promise<boolean> {
  try {
    // Get user to check if SUPER_ADMIN
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true, isActive: true },
    });

    // User must exist and be active
    if (!user || !user.isActive) {
      return false;
    }

    // SUPER_ADMIN always has access to all routes
    if (user.role === UserRole.SUPER_ADMIN) {
      return true;
    }

    // All authenticated users can access their own profile/settings page
    if (route === '/admin/settings') {
      return true;
    }

    // Check user-specific route permissions (exact match first)
    let userPermission = await prisma.userRoutePermission.findUnique({
      where: {
        userId_route: {
          userId,
          route,
        },
      },
    });

    // If exact match found, return true
    if (userPermission) {
      return true;
    }

    // For dynamic routes (e.g., /admin/notes/[noteId]), check parent route
    // Remove the last segment and check again
    const routeParts = route.split('/').filter(Boolean);
    if (routeParts.length > 2) {
      // Build parent route by removing last segment
      const parentRoute = '/' + routeParts.slice(0, -1).join('/');

      userPermission = await prisma.userRoutePermission.findUnique({
        where: {
          userId_route: {
            userId,
            route: parentRoute,
          },
        },
      });

      if (userPermission) {
        return true;
      }
    }

    // No permission found
    return false;
  } catch (error) {
    console.error('Error checking route permission:', error);
    // On error, deny access for security
    return false;
  }
}

