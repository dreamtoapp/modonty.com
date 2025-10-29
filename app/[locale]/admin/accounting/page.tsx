import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, Receipt, PieChart, FileText, CreditCard } from 'lucide-react';

export default async function AccountingPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('admin');

  const features = [
    {
      icon: CreditCard,
      title: locale === 'ar' ? 'تسجيل المصروفات' : 'Expense Tracking',
      description: locale === 'ar'
        ? 'تسجيل يدوي للمصاريف اليومية مع الوصف والتاريخ'
        : 'Manual recording of daily expenses with description and date'
    },
    {
      icon: Receipt,
      title: locale === 'ar' ? 'تسجيل الإيرادات' : 'Income Tracking',
      description: locale === 'ar'
        ? 'تتبع المدخولات والمبيعات بشكل بسيط'
        : 'Simple tracking of income and sales'
    },
    {
      icon: PieChart,
      title: locale === 'ar' ? 'تقرير شهري بسيط' : 'Simple Monthly Report',
      description: locale === 'ar'
        ? 'ملخص شهري للمصاريف والإيرادات'
        : 'Monthly summary of expenses and income'
    },
    {
      icon: FileText,
      title: locale === 'ar' ? 'تصنيف المعاملات' : 'Transaction Categories',
      description: locale === 'ar'
        ? 'تصنيف بسيط للمصاريف (رواتب، إعلانات، تشغيل...)'
        : 'Simple categorization (salaries, ads, operations...)'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5">
            <Calculator className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {t('accounting')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {locale === 'ar'
                ? 'نظام محاسبة بسيط لتتبع مصاريف ومدخولات نظام مدونتي - ينمو معنا'
                : 'Simple accounting system to track Modonty system expenses and income - grows with us'}
            </p>
          </div>
        </div>
      </div>

      {/* Coming Soon Hero Section */}
      <div className="mb-8 relative overflow-hidden">
        <Card className="border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/50 dark:via-teal-950/30 dark:to-cyan-950/20 shadow-lg">
          <CardContent className="py-12 px-6 text-center relative">
            {/* Animated background circles */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>

            <div className="relative z-10 flex flex-col items-center gap-6">
              {/* Large animated icon */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                <div className="relative p-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
                  <Calculator className="h-16 w-16 text-white" />
                </div>
              </div>

              {/* Large Coming Soon Badge */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative inline-flex">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full blur-md opacity-75 animate-pulse"></div>
                  <Badge className="relative text-2xl md:text-3xl px-8 py-3 font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white border-0 shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <span className="flex items-center gap-3">
                      <span className="animate-bounce">✨</span>
                      {t('comingSoon')}
                      <span className="animate-bounce-delay-100">✨</span>
                    </span>
                  </Badge>
                </div>

                {/* Subtitle */}
                <p className="text-lg md:text-xl font-semibold text-emerald-900 dark:text-emerald-100 max-w-2xl">
                  {locale === 'ar'
                    ? '🚀 نبني هذا النظام داخلياً لدعم مدونتي في المرحلة الأولى'
                    : '🚀 Building this system internally to support Modonty in Phase 1'}
                </p>

                {/* Progress indicator */}
                <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce-delay-100"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce-delay-200"></div>
                  </div>
                  <span className="font-medium">
                    {locale === 'ar' ? 'جاري التطوير' : 'In Development'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Description Card */}
      <Card className="mb-8 border-emerald-200 dark:border-emerald-900/30 bg-gradient-to-br from-emerald-50/50 to-transparent dark:from-emerald-950/20">
        <CardHeader>
          <CardTitle className="text-2xl">
            {locale === 'ar' ? 'نظرة عامة' : 'Overview'}
          </CardTitle>
          <CardDescription className="text-base">
            {locale === 'ar'
              ? 'نبدأ بنظام محاسبة بسيط لتتبع المصاريف والإيرادات اليومية. مع نمو نظام مدونتي، سنضيف ميزات متقدمة مثل التقارير المالية التفصيلية والربط مع الأقسام الأخرى.'
              : 'We\'re starting with a simple accounting system to track daily expenses and revenues. As Modonty system grows, we\'ll add advanced features like detailed financial reports and integration with other departments.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-emerald-200 dark:border-emerald-900/30">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
              <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">
                {locale === 'ar' ? 'البداية البسيطة' : 'Starting Simple'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {locale === 'ar'
                  ? 'نبدأ بتسجيل المصاريف والإيرادات يدوياً في النظام. مع الوقت، سنضيف ميزات مثل الفواتير التلقائية، التقارير المالية، والربط مع البنوك. النظام ينمو مع احتياجات نظام مدونتي.'
                  : 'We start by manually recording expenses and revenues in the system. Over time, we\'ll add features like automated invoicing, financial reports, and bank integration. The system grows with Modonty system\'s needs.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">
          {locale === 'ar' ? 'نبدأ بالأساسيات' : 'Starting with Basics'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-all duration-200 hover:border-emerald-200 dark:hover:border-emerald-900/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                      <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1 text-sm">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Future Growth */}
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-lg">
            {locale === 'ar' ? 'مع نمو نظام مدونتي سنضيف' : 'As Modonty System Grows, We\'ll Add'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              {locale === 'ar' ? 'فواتير تلقائية للعملاء' : 'Automated customer invoices'}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              {locale === 'ar' ? 'ربط مع الحسابات البنكية' : 'Bank account integration'}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              {locale === 'ar' ? 'تقارير الأرباح والخسائر' : 'Profit & loss reports'}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              {locale === 'ar' ? 'حسابات ضريبة القيمة المضافة' : 'VAT calculations'}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              {locale === 'ar' ? 'ميزانية الأقسام المختلفة' : 'Department budgets'}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              {locale === 'ar' ? 'تحليل التدفقات النقدية' : 'Cash flow analysis'}
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

