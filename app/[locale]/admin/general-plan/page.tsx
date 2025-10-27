import { PlanTimeline } from '@/components/PlanTimeline';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import generalPlan from '@/data/plans/general.json';

export default async function GeneralPlanPage({ params }: { params: Promise<{ locale: string }> }) {
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

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{generalPlan.title}</h1>
      </div>

      <PlanTimeline sections={generalPlan.sections} />
    </div>
  );
}

