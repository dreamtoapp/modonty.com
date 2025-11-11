import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
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
  const navTranslations = await getTranslations('nav');
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {children}
      </main>
      <footer className="border-t py-8 mt-16 no-print">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground space-y-3">
          <nav className="flex items-center justify-center gap-4 flex-wrap text-xs uppercase tracking-wider text-muted-foreground/80">
            <Link
              href={`/${locale}/contact`}
              className="hover:text-primary transition-colors"
            >
              {navTranslations('contact')}
            </Link>
            <span className="text-muted-foreground/40">•</span>
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-primary transition-colors"
            >
              {navTranslations('privacy')}
            </Link>
          </nav>
          <p>© 2024 JBRtechno. All rights reserved.</p>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton phoneNumber={whatsappNumber} locale={locale} />
    </>
  );
}


