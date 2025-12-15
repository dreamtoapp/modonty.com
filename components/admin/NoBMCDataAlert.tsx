import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

interface NoBMCDataAlertProps {
  locale: string;
  missingData: string[];
}

export function NoBMCDataAlert({ locale, missingData }: NoBMCDataAlertProps) {
  const isArabic = locale === 'ar';

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4" dir={isArabic ? "rtl" : "ltr"}>
      <Card className="max-w-2xl w-full border-warning">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-warning" />
            <CardTitle className="text-xl">
              {isArabic ? "بيانات BMC غير مكتملة" : "Incomplete BMC Data"}
            </CardTitle>
          </div>
          <CardDescription>
            {isArabic
              ? "بعض البيانات المطلوبة غير موجودة في قاعدة البيانات"
              : "Some required data is missing from the database"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {isArabic
              ? "يرجى إضافة البيانات التالية لإكمال صفحة BMC:"
              : "Please add the following data to complete the BMC page:"}
          </p>
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <p className="text-sm font-semibold">
              {isArabic ? "البيانات المفقودة:" : "Missing Data:"}
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {missingData.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold">
              {isArabic ? "أين يمكنك إضافة هذه البيانات:" : "Where to add this data:"}
            </p>
            <ul className="space-y-2 text-sm">
              {missingData.some(item => item.includes('Standard plan') || item.includes('باقة Standard')) && (
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  <div>
                    <Link
                      href={`/${locale}/admin/source-of-income`}
                      className="text-primary hover:underline font-medium"
                    >
                      {isArabic ? "مصادر الدخل" : "Sources of Income"}
                    </Link>
                    <span className="text-muted-foreground ml-2">
                      {isArabic
                        ? "- أضف باقة Standard (subscription-standard) مع annualPrice و monthlyRecognizedRevenue و duration"
                        : "- Add Standard plan (subscription-standard) with annualPrice, monthlyRecognizedRevenue, and duration"}
                    </span>
                  </div>
                </li>
              )}
              {missingData.some(item => item.includes('recognition model') || item.includes('نموذج الاعتراف')) && (
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  <div>
                    <Link
                      href={`/${locale}/admin/costs`}
                      className="text-primary hover:underline font-medium"
                    >
                      {isArabic ? "التكاليف" : "Costs"}
                    </Link>
                    <span className="text-muted-foreground ml-2">
                      {isArabic
                        ? "- أضف recognitionModel مع paymentPeriod و recognitionPeriod في FinanceData"
                        : "- Add recognitionModel with paymentPeriod and recognitionPeriod in FinanceData"}
                    </span>
                  </div>
                </li>
              )}
              {missingData.some(item => item.includes('investment') || item.includes('الاستثمار')) && (
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  <div>
                    <Link
                      href={`/${locale}/admin/costs`}
                      className="text-primary hover:underline font-medium"
                    >
                      {isArabic ? "التكاليف" : "Costs"}
                    </Link>
                    <span className="text-muted-foreground ml-2">
                      {isArabic
                        ? "- أضف investment data في FinanceData"
                        : "- Add investment data in FinanceData"}
                    </span>
                  </div>
                </li>
              )}
            </ul>
          </div>
          <p className="text-xs text-muted-foreground pt-2">
            {isArabic
              ? "بعد إضافة البيانات، قم بتحديث هذه الصفحة."
              : "After adding the data, please refresh this page."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}










