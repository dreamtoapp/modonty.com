import { PlanTimeline } from '@/components/PlanTimeline';
import { BudgetTable } from '@/components/BudgetTable';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import hiringPlan from '@/data/plans/hiring.json';

export default async function HiringPlanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <Link href={`/${locale}/admin`}>
          <Button variant="ghost" size="sm">
            {locale === 'ar' ? <ArrowRight className="h-4 w-4 ml-2" /> : <ArrowLeft className="h-4 w-4 mr-2" />}
            {locale === 'ar' ? 'العودة' : 'Back'}
          </Button>
        </Link>
      </div>

      <div className="space-y-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{hiringPlan.title}</h1>
          <p className="text-lg text-muted-foreground">{hiringPlan.subtitle}</p>
        </div>

        {/* Summary Card */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">ملخص الفريق المطلوب</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي الفريق</p>
                <p className="text-2xl font-bold text-primary">{hiringPlan.summary.totalTeam}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">التكلفة الشهرية</p>
                <p className="text-2xl font-bold text-primary">{hiringPlan.summary.monthlyCost}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">ميزانية 4 أشهر</p>
                <p className="text-2xl font-bold text-primary">{hiringPlan.summary.firstFourMonthsBudget}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <BudgetTable locale={locale} />

        <PlanTimeline sections={hiringPlan.sections} />
      </div>
    </div>
  );
}

