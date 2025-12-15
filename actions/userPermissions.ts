'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';

/**
 * Get all routes that a user has permission to access
 */
export async function getUserRoutePermissions(userId: string): Promise<string[]> {
  const session = await auth();

  if (!session?.user || session.user.role !== UserRole.SUPER_ADMIN) {
    throw new Error('Unauthorized');
  }

  const permissions = await prisma.userRoutePermission.findMany({
    where: { userId },
    select: { route: true },
    orderBy: { route: 'asc' },
  });

  return permissions.map((p) => p.route);
}

/**
 * Update user's route permissions
 * Replaces all existing permissions with the new list
 */
export async function updateUserRoutePermissions(
  userId: string,
  routes: string[]
): Promise<void> {
  const session = await auth();

  if (!session?.user || session.user.role !== UserRole.SUPER_ADMIN) {
    throw new Error('Unauthorized');
  }

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Cannot modify SUPER_ADMIN permissions (they have access to all routes anyway)
  if (user.role === UserRole.SUPER_ADMIN) {
    throw new Error('Cannot modify SUPER_ADMIN permissions');
  }

  // Delete all existing permissions for this user
  await prisma.userRoutePermission.deleteMany({
    where: { userId },
  });

  // Create new permissions
  if (routes.length > 0) {
    await prisma.userRoutePermission.createMany({
      data: routes.map((route) => ({
        userId,
        route,
      })),
    });
  }

  revalidatePath('/admin/users');
  revalidatePath('/admin/no-permissions');
  revalidatePath('/', 'layout');
}

/**
 * Get all users with their route permissions (for admin view)
 */
export async function getAllUserPermissions() {
  const session = await auth();

  if (!session?.user || session.user.role !== UserRole.SUPER_ADMIN) {
    throw new Error('Unauthorized');
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      permissions: {
        select: {
          route: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return users.map((user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    routes: user.permissions.map((p) => p.route),
  }));
}


















