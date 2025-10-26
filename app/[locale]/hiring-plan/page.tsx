import { parseMarkdownFile } from '@/helpers/parseMarkdown';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { BudgetTable } from '@/components/BudgetTable';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PrintButton } from '@/components/PrintButton';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function HiringPlanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { content, title, sections } = parseMarkdownFile('hiring-plan-detailed.md');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8 no-print">
        <Link href={`/${locale}`}>
          <Button variant="ghost" size="sm">
            {locale === 'ar' ? <ArrowRight className="h-4 w-4 ml-2" /> : <ArrowLeft className="h-4 w-4 mr-2" />}
            {locale === 'ar' ? 'العودة' : 'Back'}
          </Button>
        </Link>
        <PrintButton label={locale === 'ar' ? 'طباعة' : 'Print'} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 no-print">
          <Card className="sticky top-20">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">
                {locale === 'ar' ? 'المحتويات' : 'Contents'}
              </h3>
              <nav className="space-y-2">
                {sections
                  .filter((s) => s.level <= 2)
                  .map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={`block text-sm hover:text-primary transition-colors ${section.level === 1
                          ? 'font-semibold'
                          : 'text-muted-foreground pl-4'
                        }`}
                    >
                      {section.title}
                    </a>
                  ))}
              </nav>
            </CardContent>
          </Card>
        </aside>

        <div className="lg:col-span-3 space-y-8">
          <BudgetTable locale={locale} />

          <Card>
            <CardContent className="p-8">
              <h1 className="text-4xl font-bold mb-2">{title}</h1>
              <Separator className="my-6" />
              <MarkdownRenderer content={content} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

