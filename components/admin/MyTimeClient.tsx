'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import type { TimeSummary } from '@/lib/clockify';
import { TimesheetDetail } from './TimesheetDetail';

interface MyTimeClientProps {
  summary: TimeSummary | null;
  staffName: string;
  startDate: string; // ISO string
  endDate: string;   // ISO string
  locale: string;
}

export function MyTimeClient({ summary, staffName, startDate, endDate, locale }: MyTimeClientProps) {
  const isArabic = locale === 'ar';
  const [open, setOpen] = useState<boolean>(!!summary);

  const start = new Date(startDate);
  const end = new Date(endDate);

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                <Clock className="h-6 w-6" />
                {isArabic ? 'سجل وقتي' : 'My Time'}
              </CardTitle>
              <p className="text-muted-foreground mt-1 text-sm">
                {isArabic
                  ? 'عرض ساعات عملك وتفاصيل السجل الزمني لهذا الشهر'
                  : 'View your worked hours and detailed time entries for this month.'}
              </p>
            </div>
            {summary && (
              <Button type="button" onClick={() => setOpen(true)}>
                {isArabic ? 'عرض التفاصيل' : 'View Details'}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!summary && (
            <p className="text-sm text-muted-foreground" dir={isArabic ? 'rtl' : 'ltr'}>
              {isArabic
                ? 'لا توجد بيانات وقت مسجلة لهذا الشهر أو لم يتم ربط حسابك بـ Clockify بعد.'
                : 'No time data found for this month, or your account is not linked to Clockify yet.'}
            </p>
          )}

          {summary && (
            <div className="flex items-baseline gap-4 mt-2">
              <div>
                <div className="text-sm text-muted-foreground">
                  {isArabic ? 'إجمالي الساعات هذا الشهر' : 'Total hours this month'}
                </div>
                <div className="text-3xl font-bold">
                  {summary.totalHours.toFixed(2)}h
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {isArabic
                  ? `${start.toLocaleDateString('ar-SA')} - ${end.toLocaleDateString('ar-SA')}`
                  : `${start.toLocaleDateString('en-US')} - ${end.toLocaleDateString('en-US')}`}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {summary && (
        <TimesheetDetail
          open={open}
          onOpenChange={setOpen}
          staffName={staffName}
          summary={summary}
          startDate={start}
          endDate={end}
          locale={locale}
        />
      )}
    </div>
  );
}

