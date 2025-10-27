import { AdminAuth } from '@/components/AdminAuth';
import { AdminSidebar } from '@/components/AdminSidebar';

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <AdminAuth>
      <div className="flex h-screen overflow-hidden">
        <aside className="w-64 flex-shrink-0 no-print border-r">
          <AdminSidebar locale={locale} />
        </aside>
        <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
          {children}
        </main>
      </div>
    </AdminAuth>
  );
}

