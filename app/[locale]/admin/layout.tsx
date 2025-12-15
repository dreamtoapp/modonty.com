import { AdminLayoutWrapper } from '@/components/admin/AdminLayoutWrapper';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { AdminLogoutButton } from '@/components/admin/AdminLogoutButton';
import { BackToDashboardButton } from '@/components/admin/BackToDashboardButton';
import { UserAvatar } from '@/components/common/UserAvatar';
import { getTranslations } from 'next-intl/server';
import { auth } from '@/lib/auth';
import { UserRole } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('admin');

  // Check session - if no session, likely login page (proxy handles redirects)
  // If session exists, render admin UI. If not, let AdminLayoutWrapper handle it
  const session = await auth();
  const hasSession = session?.user && session.user.id && session.user.role && session.user.email;
  const userRole = session?.user?.role as UserRole;

  // Fetch user with Staff and Application relations to get profile image
  let profileImageUrl: string | null = null;
  if (hasSession && session.user.id) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          staff: {
            select: {
              application: {
                select: {
                  profileImageUrl: true,
                },
              },
            },
          },
        },
      });
      profileImageUrl = user?.staff?.application?.profileImageUrl || null;
    } catch (error) {
      console.error('Error fetching user profile image:', error);
    }
  }

  // Render admin UI only if we have a session (non-login pages)
  if (hasSession) {
    return (
      <AdminLayoutWrapper showAdminUI={true}>
        <div className="flex h-screen overflow-hidden">
          <aside className="w-64 flex-shrink-0 no-print border-r">
            <AdminSidebar locale={locale} />
          </aside>
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Admin Header */}
            <header className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Link href={`/${locale}`}>
                  <Button variant="ghost" size="sm">
                    <Home className="h-4 w-4 mr-2" />
                    {t('backToWebsite')}
                  </Button>
                </Link>
                <BackToDashboardButton userRole={userRole as string} />
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Link href={`/${locale}/admin/settings`}>
                  <button className="flex items-center justify-center hover:opacity-80 transition-opacity">
                    <UserAvatar
                      name={session.user.name}
                      email={session.user.email}
                      imageUrl={profileImageUrl}
                      size="sm"
                    />
                  </button>
                </Link>
                <AdminLogoutButton />
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
              {children}
            </main>
          </div>
        </div>
      </AdminLayoutWrapper>
    );
  }

  // No session - likely login page, render children without admin UI
  return (
    <AdminLayoutWrapper showAdminUI={false}>
      {children}
    </AdminLayoutWrapper>
  );
}

