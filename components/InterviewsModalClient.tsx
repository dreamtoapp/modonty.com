import { Card, CardContent } from '@/components/ui/card';
import { CalendarClock } from 'lucide-react';
import Link from 'next/link';

interface InterviewsModalClientProps {
  totalInterviews: number;
  upcomingInterviews: number;
  locale: string;
}

export function InterviewsModalClient({
  totalInterviews,
  upcomingInterviews,
  locale,
}: InterviewsModalClientProps) {
  const isArabic = locale === 'ar';

  return (
    <Link href={`/${locale}/admin/applications/interviews`}>
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-primary/30 hover:border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {isArabic ? 'المقابلات' : 'Interviews'}
              </p>
              <div className="mt-1 space-y-1">
                <p className="text-2xl font-bold text-primary">{totalInterviews}</p>
                <p className="text-xs text-muted-foreground">
                  {isArabic ? `${upcomingInterviews} قادمة` : `${upcomingInterviews} upcoming`}
                </p>
              </div>
            </div>
            <CalendarClock className="h-8 w-8 text-primary" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

