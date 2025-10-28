import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Code,
  Briefcase,
  Palette,
  PenTool,
  Users,
  Phone,
  ArrowRight,
  FileText,
} from 'lucide-react';

interface PositionApplicationCardProps {
  position: string;
  pendingCount: number;
  totalCount: number;
  locale: string;
}

function getPositionIcon(position: string) {
  const positionLower = position.toLowerCase();

  if (positionLower.includes('cto') || positionLower.includes('technical lead')) {
    return <Code className="h-6 w-6" />;
  }
  if (positionLower.includes('developer') || positionLower.includes('frontend') || positionLower.includes('backend')) {
    return <Code className="h-6 w-6" />;
  }
  if (positionLower.includes('designer') || positionLower.includes('ui/ux')) {
    return <Palette className="h-6 w-6" />;
  }
  if (positionLower.includes('content') || positionLower.includes('writer')) {
    return <PenTool className="h-6 w-6" />;
  }
  if (positionLower.includes('marketing')) {
    return <Users className="h-6 w-6" />;
  }
  if (positionLower.includes('sales') || positionLower.includes('مبيعات')) {
    return <Phone className="h-6 w-6" />;
  }
  if (positionLower.includes('operations')) {
    return <Briefcase className="h-6 w-6" />;
  }

  return <FileText className="h-6 w-6" />;
}

export function PositionApplicationCard({
  position,
  pendingCount,
  totalCount,
  locale,
}: PositionApplicationCardProps) {
  const isRTL = locale === 'ar';

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className={`p-3 rounded-lg bg-primary/10 text-primary ${isRTL ? 'ml-auto' : ''}`}>
            {getPositionIcon(position)}
          </div>
          {pendingCount > 0 && (
            <Badge variant="default" className="font-semibold">
              {pendingCount} {isRTL ? 'قيد المراجعة' : 'Pending'}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg mt-3 line-clamp-2">{position}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{isRTL ? 'إجمالي الطلبات' : 'Total Applications'}</span>
            <span className="font-bold text-foreground text-lg">{totalCount}</span>
          </div>

          {totalCount > 0 ? (
            <Link href={`/${locale}/admin/applications?position=${encodeURIComponent(position)}`}>
              <Button variant="outline" className="w-full group" size="sm">
                {isRTL ? 'عرض الطلبات' : 'View Applications'}
                <ArrowRight className={`h-4 w-4 ${isRTL ? 'mr-2 group-hover:-translate-x-1' : 'ml-2 group-hover:translate-x-1'} transition-transform`} />
              </Button>
            </Link>
          ) : (
            <div className="text-center py-2 text-sm text-muted-foreground">
              {isRTL ? 'لا توجد طلبات بعد' : 'No applications yet'}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

