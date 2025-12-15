import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { UserRole } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getAccessibleRoutes } from '@/actions/auth';
import { NoPermissionsClient } from './NoPermissionsClient';

export default async function NoPermissionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const session = await auth();
  const { locale } = await params;
  const t = await getTranslations('admin');

  // If not authenticated, redirect to login
  if (!session?.user) {
    redirect(`/${locale}/admin/login`);
  }

  // SUPER_ADMIN should never see this page
  if (session.user.role === UserRole.SUPER_ADMIN) {
    redirect(`/${locale}/admin`);
  }

  // Get user's accessible routes
  const accessibleRoutes = await getAccessibleRoutes();

  // If user has routes, redirect them to the first accessible route
  // But only if they have permission to access /admin (to prevent redirect loop)
  if (accessibleRoutes.length > 0) {
    // Check if user has access to /admin specifically
    const hasAdminAccess = accessibleRoutes.includes('/admin');
    if (hasAdminAccess) {
      redirect(`/${locale}/admin`);
    } else {
      // Redirect to first accessible route
      const firstRoute = accessibleRoutes[0];
      redirect(`/${locale}${firstRoute}`);
    }
  }

  // Get user info
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      email: true,
      name: true,
      role: true,
    },
  });

  return (
    <NoPermissionsClient
      user={user}
      accessibleRoutes={accessibleRoutes}
      locale={locale}
    />
  );
}

















