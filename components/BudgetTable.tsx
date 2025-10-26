import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { getTeamPositions } from '@/helpers/extractMetrics';

interface BudgetTableProps {
  locale: string;
}

export function BudgetTable({ locale }: BudgetTableProps) {
  const positions = getTeamPositions();
  const isArabic = locale === 'ar';

  const totalMin = positions.reduce((sum, pos) => sum + pos.salaryMin * pos.count, 0);
  const totalMax = positions.reduce((sum, pos) => sum + pos.salaryMax * pos.count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isArabic ? 'هيكل الرواتب' : 'Salary Structure'}
        </CardTitle>
      </CardHeader>
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
              </tr>
            </thead>
            <tbody>
              {positions.map((position, index) => (
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
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 font-bold">
                <td className="py-3 px-2" colSpan={2}>
                  {isArabic ? 'الإجمالي الشهري' : 'Monthly Total'}
                </td>
                <td className="text-end py-3 px-2 font-mono">
                  {totalMin.toLocaleString()} - {totalMax.toLocaleString()}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

