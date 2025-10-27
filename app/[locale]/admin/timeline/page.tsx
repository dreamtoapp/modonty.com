import { PlanTimeline } from '@/components/PlanTimeline';
import { TimelineView } from '@/components/TimelineView';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Target, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import timelinePlan from '@/data/plans/timeline.json';

export default async function TimelinePage({ params }: { params: Promise<{ locale: string }> }) {
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
          <h1 className="text-4xl font-bold mb-2">{timelinePlan.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">{timelinePlan.subtitle}</p>

          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold">{timelinePlan.goal}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="gap-1">
              <Calendar className="h-3 w-3" />
              الإطلاق الرسمي: {timelinePlan.targets.launch}
            </Badge>
            <Badge variant="outline" className="gap-1 bg-blue-500/10 border-blue-500/20">
              <Calendar className="h-3 w-3" />
              بيتا: {timelinePlan.targets.beta}
            </Badge>
            <Badge variant="outline" className="gap-1 bg-green-500/10 border-green-500/20">
              <Calendar className="h-3 w-3" />
              أول عميل: {timelinePlan.targets.firstClient}
            </Badge>
          </div>
        </div>

        <TimelineView locale={locale} />

        <PlanTimeline sections={timelinePlan.sections} showMetrics={true} />
      </div>
    </div>
  );
}

