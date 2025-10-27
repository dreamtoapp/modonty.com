'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { getTeamPositions } from '@/helpers/extractMetrics';
import { ChevronDown, ChevronUp, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from './ui/button';

interface BudgetTableProps {
  locale: string;
}

export function BudgetTable({ locale }: BudgetTableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const positions = getTeamPositions().sort((a, b) => a.phase - b.phase);
  const isArabic = locale === 'ar';

  const totalMin = positions.reduce((sum, pos) => sum + pos.salaryMin * pos.count, 0);
  const totalMax = positions.reduce((sum, pos) => sum + pos.salaryMax * pos.count, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {isArabic ? 'هيكل الرواتب' : 'Salary Structure'}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="gap-2"
          >
            {isArabic ? (isOpen ? 'إخفاء' : 'عرض') : (isOpen ? 'Hide' : 'Show')}
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-start py-3 px-2">
                    {isArabic ? 'المنصب' : 'Position'}
                  </th>
                  <th className="text-center py-3 px-2">
                    {isArabic ? 'العدد' : 'Count'}
                  </th>
                  <th className="text-end py-3 px-2">
                    {isArabic ? 'الراتب (ريال)' : 'Salary (SAR)'}
                  </th>
                  <th className="text-center py-3 px-2">
                    {isArabic ? 'المرحلة' : 'Phase'}
                  </th>
                  <th className="text-center py-3 px-2">
                    {isArabic ? 'الحالة' : 'Status'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {positions.map((position, index) => {
                  const isFilled = !!position.filledBy;
                  return (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2 font-medium">
                        {isArabic ? position.title : position.titleEn}
                      </td>
                      <td className="text-center py-3 px-2">{position.count}</td>
                      <td className="text-end py-3 px-2 font-mono">
                        {position.salaryMin.toLocaleString()} - {position.salaryMax.toLocaleString()}
                      </td>
                      <td className="text-center py-3 px-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                          {position.phase}
                        </span>
                      </td>
                      <td className="text-center py-3 px-2">
                        {isFilled ? (
                          <div className="flex flex-col gap-1 items-center">
                            <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
                              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                              {isArabic ? 'مشغولة' : 'Filled'}
                            </Badge>
                            {position.filledBy && (
                              <Badge variant="outline" className="bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20 text-xs">
                                {position.filledBy}
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20">
                            <XCircle className="h-3.5 w-3.5 mr-1" />
                            {isArabic ? 'شاغرة' : 'Vacant'}
                          </Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 font-bold">
                  <td className="py-3 px-2" colSpan={2}>
                    {isArabic ? 'الإجمالي الشهري' : 'Monthly Total'}
                  </td>
                  <td className="text-end py-3 px-2 font-mono">
                    {totalMin.toLocaleString()} - {totalMax.toLocaleString()}
                  </td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

