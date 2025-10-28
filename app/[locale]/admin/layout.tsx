import { AdminAuth } from '@/components/AdminAuth';
import { AdminSidebar } from '@/components/AdminSidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { getTranslations } from 'next-intl/server';
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

  return (
    <AdminAuth>
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
            </div>
            <ThemeToggle />
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
            {children}
          </main>
        </div>
      </div>
    </AdminAuth>
  );
}

