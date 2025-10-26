import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface PlanCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  locale: string;
  viewLabel: string;
}

export function PlanCard({ title, description, href, icon: Icon, locale, viewLabel }: PlanCardProps) {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="rounded-lg bg-primary/10 p-3 mb-4">
            <Icon className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={`/${locale}${href}`}>
          <Button className="w-full group">
            {viewLabel}
            <ArrowRight className={`h-4 w-4 transition-transform group-hover:${locale === 'ar' ? '-translate-x-1' : 'translate-x-1'}`} />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

