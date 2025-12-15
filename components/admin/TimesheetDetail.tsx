'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Calendar, TrendingUp } from 'lucide-react';
import type { TimeSummary } from '@/lib/clockify';

interface TimesheetDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staffName: string;
  summary: TimeSummary;
  startDate: Date;
  endDate: Date;
  locale: string;
}

function formatHours(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.floor((hours - h) * 60);
  return `${h}h ${m}m`;
}

function formatDuration(durationMs: number): string {
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function TimesheetDetail({
  open,
  onOpenChange,
  staffName,
  summary,
  startDate,
  endDate,
  locale,
}: TimesheetDetailProps) {
  const isArabic = locale === 'ar';
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set());

  const toggleDay = (date: string) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(date)) {
      newExpanded.delete(date);
    } else {
      newExpanded.add(date);
    }
    setExpandedDays(newExpanded);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const daysWithEntries = summary.dailyBreakdown.filter((day) => day.entries.length > 0);
  const averageHoursPerDay = daysWithEntries.length > 0
    ? summary.totalHours / daysWithEntries.length
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {isArabic ? 'تفاصيل سجل الوقت' : 'Timesheet Details'}
          </DialogTitle>
          <DialogDescription>
            {staffName} • {startDate.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')} - {endDate.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
          </DialogDescription>
        </DialogHeader>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {isArabic ? 'إجمالي الساعات' : 'Total Hours'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatHours(summary.totalHours)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {isArabic ? 'أيام العمل' : 'Working Days'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {daysWithEntries.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                {isArabic ? 'متوسط يومي' : 'Daily Average'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatHours(averageHoursPerDay)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Breakdown */}
        <div className="flex-1 border rounded-lg overflow-auto max-h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">
                  {isArabic ? 'التاريخ' : 'Date'}
                </TableHead>
                <TableHead className="w-[100px]">
                  {isArabic ? 'الساعات' : 'Hours'}
                </TableHead>
                <TableHead>
                  {isArabic ? 'المدخلات' : 'Entries'}
                </TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summary.dailyBreakdown.map((day) => {
                const isExpanded = expandedDays.has(day.date);
                const hasEntries = day.entries.length > 0;

                return (
                  <>
                    <TableRow
                      key={day.date}
                      className={hasEntries ? 'cursor-pointer hover:bg-muted/50' : ''}
                      onClick={() => hasEntries && toggleDay(day.date)}
                    >
                      <TableCell className="font-medium">
                        {formatDate(day.date)}
                      </TableCell>
                      <TableCell>
                        {hasEntries ? (
                          <Badge variant="default">
                            {formatHours(day.hours)}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">
                            {isArabic ? 'لا توجد' : 'None'}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {hasEntries && (
                          <span className="text-sm text-muted-foreground">
                            {day.entries.length} {isArabic ? 'مدخل' : day.entries.length === 1 ? 'entry' : 'entries'}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {hasEntries && (
                          <span className="text-sm">
                            {isExpanded ? '▼' : '▶'}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                    {isExpanded && hasEntries && (
                      <TableRow key={`${day.date}-details`}>
                        <TableCell colSpan={4} className="bg-muted/30 p-4">
                          <div className="space-y-2">
                            {day.entries.map((entry) => (
                              <div
                                key={entry.id}
                                className="flex items-start justify-between p-2 bg-background rounded border text-sm"
                              >
                                <div className="flex-1">
                                  <div className="font-medium mb-1">
                                    {entry.description || (isArabic ? 'بلا وصف' : 'No description')}
                                  </div>
                                  <div className="flex items-center gap-4 text-muted-foreground text-xs">
                                    <span>
                                      {formatTime(entry.start)} - {formatTime(entry.end)}
                                    </span>
                                    {entry.projectName && (
                                      <Badge variant="outline" className="text-xs">
                                        {entry.projectName}
                                      </Badge>
                                    )}
                                    {entry.billable && (
                                      <Badge variant="secondary" className="text-xs">
                                        {isArabic ? 'قابل للفوترة' : 'Billable'}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="font-medium ml-4">
                                  {formatDuration(entry.duration)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                );
              })}
              {summary.dailyBreakdown.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    {isArabic ? 'لا توجد سجلات وقت في هذا النطاق' : 'No time entries in this range'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}


