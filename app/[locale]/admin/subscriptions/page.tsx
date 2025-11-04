import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, TrendingUp, Users, DollarSign, Calendar, FileText } from 'lucide-react';

export default async function SubscriptionsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('admin');

  const features = [
    {
      icon: Calendar,
      title: locale === 'ar' ? 'التجديد التلقائي' : 'Auto Renewal',
      description: locale === 'ar'
        ? 'تجديد الاشتراكات تلقائياً بدون تدخل'
        : 'Automatic subscription renewal without intervention'
    },
    {
      icon: Users,
      title: locale === 'ar' ? 'إدارة المشتركين' : 'Subscriber Management',
      description: locale === 'ar'
        ? 'تتبع المشتركين والاشتراكات النشطة'
        : 'Track subscribers and active subscriptions'
    },
    {
      icon: FileText,
      title: locale === 'ar' ? 'الفواتير التلقائية' : 'Auto Invoicing',
      description: locale === 'ar'
        ? 'إنشاء وإرسال الفواتير تلقائياً'
        : 'Create and send invoices automatically'
    },
    {
      icon: DollarSign,
      title: locale === 'ar' ? 'تتبع الإيرادات' : 'Revenue Tracking',
      description: locale === 'ar'
        ? 'متابعة الإيرادات المتكررة الشهرية'
        : 'Monitor monthly recurring revenue'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5">
            <CreditCard className="h-10 w-10 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {t('subscriptions')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {locale === 'ar'
                ? 'نظام آلي لإدارة الاشتراكات والدفعات المتكررة تلقائياً - ينمو مع احتياجات جبرسيو'
                : 'Automated system for subscriptions and automatic recurring payments - grows with JBRtechno\'s needs'}
            </p>
          </div>
        </div>
      </div>

      {/* Coming Soon Hero Section */}
      <div className="mb-8 relative overflow-hidden">
        <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50 dark:from-purple-950/50 dark:via-violet-950/30 dark:to-fuchsia-950/20 shadow-lg">
          <CardContent className="py-12 px-6 text-center relative">
            {/* Animated background circles */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>

            <div className="relative z-10 flex flex-col items-center gap-6">
              {/* Large animated icon */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-400 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                <div className="relative p-6 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
                  <CreditCard className="h-16 w-16 text-white" />
                </div>
              </div>

              {/* Large Coming Soon Badge */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative inline-flex">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 rounded-full blur-md opacity-75 animate-pulse"></div>
                  <Badge className="relative text-2xl md:text-3xl px-8 py-3 font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 text-white border-0 shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <span className="flex items-center gap-3">
                      <span className="animate-bounce">✨</span>
                      {t('comingSoon')}
                      <span className="animate-bounce-delay-100">✨</span>
                    </span>
                  </Badge>
                </div>

                {/* Subtitle */}
                <p className="text-lg md:text-xl font-semibold text-purple-900 dark:text-purple-100 max-w-2xl">
                  {locale === 'ar'
                    ? '🚀 نبني هذا النظام داخلياً لدعم جبرسيو في المرحلة الأولى'
                    : '🚀 Building this system internally to support JBRtechno in Phase 1'}
                </p>

                {/* Progress indicator */}
                <div className="flex items-center gap-2 text-sm text-purple-700 dark:text-purple-300">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce-delay-100"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce-delay-200"></div>
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
      <Card className="mb-8 border-purple-200 dark:border-purple-900/30 bg-gradient-to-br from-purple-50/50 to-transparent dark:from-purple-950/20">
        <CardHeader>
          <CardTitle className="text-2xl">
            {locale === 'ar' ? 'نظرة عامة' : 'Overview'}
          </CardTitle>
          <CardDescription className="text-base">
            {locale === 'ar'
              ? 'نبدأ بنظام آلي للاشتراكات مع تجديد وخصم تلقائي. مع نمو نظام جبرسيو، سنضيف ميزات متقدمة مثل خطط متعددة، إشعارات ذكية، وتحليلات متقدمة.'
              : 'We\'re starting with an automated subscription system with auto-renewal and automatic charging. As JBRtechno system grows, we\'ll add advanced features like multiple tiers, smart notifications, and advanced analytics.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-purple-200 dark:border-purple-900/30">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">
                {locale === 'ar' ? 'البداية البسيطة' : 'Starting Simple'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {locale === 'ar'
                  ? 'نبدأ بنظام آلي بالكامل: تجديد الاشتراكات، خصم المبالغ، وإرسال الفواتير تلقائياً. مع الوقت، سنضيف ذكاء اصطناعي للتنبؤ، إشعارات ذكية، وخطط مرنة. النظام ينمو مع احتياجات نظام جبرسيو.'
                  : 'We start with a fully automated system: auto-renewal, automatic charging, and invoice sending. Over time, we\'ll add AI for predictions, smart notifications, and flexible plans. The system grows with JBRtechno system\'s needs.'}
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
              <Card key={index} className="hover:shadow-md transition-all duration-200 hover:border-purple-200 dark:hover:border-purple-900/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                      <Icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
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
            {locale === 'ar' ? 'مع نمو نظام جبرسيو سنضيف' : 'As JBRtechno System Grows, We\'ll Add'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
              {locale === 'ar' ? 'الدفع الآلي المتكامل' : 'Integrated automated billing'}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
              {locale === 'ar' ? 'إعادة المحاولة التلقائية للدفعات الفاشلة' : 'Auto-retry failed payments'}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
              {locale === 'ar' ? 'تكامل مع منصات الدفع العالمية' : 'Global payment platform integration'}
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

