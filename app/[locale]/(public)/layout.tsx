import { Navigation } from '@/components/Navigation';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

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

      {/* WhatsApp Floating Button */}
      <WhatsAppButton phoneNumber={whatsappNumber} locale={locale} />
    </>
  );
}


