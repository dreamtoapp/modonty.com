import { Navigation } from '@/components/Navigation';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {children}
      </main>
      <footer className="border-t py-8 mt-16 no-print">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Modonty. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}


