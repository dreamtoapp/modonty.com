import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { UserRole } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getUserRoutePermissions } from '@/actions/userPermissions';
import { ADMIN_ROUTES } from '@/lib/auth/adminRoutes';
import { UserPermissionsPageClient } from './UserPermissionsPageClient';

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
      allRoutes={ADMIN_ROUTES}
      locale={locale}
    />
  );
}


