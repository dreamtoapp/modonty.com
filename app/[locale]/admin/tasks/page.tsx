import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ListTodo, TrendingUp, CheckSquare, Calendar, Users, Flag } from 'lucide-react';

export default async function TasksPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('admin');

  const features = [
    {
      icon: CheckSquare,
      title: locale === 'ar' ? 'قائمة المهام' : 'Task List',
      description: locale === 'ar'
        ? 'إنشاء وتتبع المهام اليومية'
        : 'Create and track daily tasks'
    },
    {
      icon: Calendar,
      title: locale === 'ar' ? 'المواعيد النهائية' : 'Deadlines',
      description: locale === 'ar'
        ? 'تحديد تواريخ التسليم للمهام'
        : 'Set delivery dates for tasks'
    },
    {
      icon: Users,
      title: locale === 'ar' ? 'تعيين المهام' : 'Task Assignment',
      description: locale === 'ar'
        ? 'توزيع المهام على أعضاء الفريق'
        : 'Assign tasks to team members'
    },
    {
      icon: Flag,
      title: locale === 'ar' ? 'الأولويات' : 'Priorities',
      description: locale === 'ar'
        ? 'تحديد أولوية كل مهمة'
        : 'Set priority for each task'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/5">
            <ListTodo className="h-10 w-10 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {t('tasks')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {locale === 'ar'
                ? 'نظام بسيط لإدارة مهام الاشتراكات والتطوير - ينمو مع احتياجات مدونتي'
                : 'Simple system to manage subscription and development tasks - grows with Modonty\'s needs'}
            </p>
          </div>
        </div>
      </div>

      {/* Coming Soon Hero Section */}
      <div className="mb-8 relative overflow-hidden">
        <Card className="border-2 border-orange-200 dark:border-orange-800 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/50 dark:via-amber-950/30 dark:to-yellow-950/20 shadow-lg">
          <CardContent className="py-12 px-6 text-center relative">
            {/* Animated background circles */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-300/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>

            <div className="relative z-10 flex flex-col items-center gap-6">
              {/* Large animated icon */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                <div className="relative p-6 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
                  <ListTodo className="h-16 w-16 text-white" />
                </div>
              </div>

              {/* Large Coming Soon Badge */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative inline-flex">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-full blur-md opacity-75 animate-pulse"></div>
                  <Badge className="relative text-2xl md:text-3xl px-8 py-3 font-bold bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white border-0 shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <span className="flex items-center gap-3">
                      <span className="animate-bounce">✨</span>
                      {t('comingSoon')}
                      <span className="animate-bounce-delay-100">✨</span>
                    </span>
                  </Badge>
                </div>

                {/* Subtitle */}
                <p className="text-lg md:text-xl font-semibold text-orange-900 dark:text-orange-100 max-w-2xl">
                  {locale === 'ar'
                    ? '🚀 نبني هذا النظام داخلياً لدعم مدونتي في المرحلة الأولى'
                    : '🚀 Building this system internally to support Modonty in Phase 1'}
                </p>

                {/* Progress indicator */}
                <div className="flex items-center gap-2 text-sm text-orange-700 dark:text-orange-300">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce-delay-100"></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce-delay-200"></div>
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
      <Card className="mb-8 border-orange-200 dark:border-orange-900/30 bg-gradient-to-br from-orange-50/50 to-transparent dark:from-orange-950/20">
        <CardHeader>
          <CardTitle className="text-2xl">
            {locale === 'ar' ? 'نظرة عامة' : 'Overview'}
          </CardTitle>
          <CardDescription className="text-base">
            {locale === 'ar'
              ? 'نبدأ بنظام بسيط لإنشاء المهام وتتبع تقدمها. مع نمو نظام مدونتي، سنضيف ميزات متقدمة مثل إدارة الاشتراكات والتطوير والتقارير التفصيلية.'
              : 'We\'re starting with a simple system to create tasks and track progress. As Modonty system grows, we\'ll add advanced features like subscription and development management and detailed reports.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-orange-200 dark:border-orange-900/30">
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
              <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">
                {locale === 'ar' ? 'البداية البسيطة' : 'Starting Simple'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {locale === 'ar'
                  ? 'نبدأ بقائمة مهام بسيطة مع تواريخ التسليم. مع الوقت، سنضيف ميزات مثل إدارة الاشتراكات والتطوير، التبعيات، والتقارير. النظام ينمو مع احتياجات نظام مدونتي.'
                  : 'We start with a simple task list with deadlines. Over time, we\'ll add features like subscription and development management, dependencies, and reports. The system grows with Modonty system\'s needs.'}
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
              <Card key={index} className="hover:shadow-md transition-all duration-200 hover:border-orange-200 dark:hover:border-orange-900/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                      <Icon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
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
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
              {locale === 'ar' ? 'إدارة الاشتراكات والتطوير الكاملة' : 'Full subscription and development management'}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
              {locale === 'ar' ? 'تبعيات المهام' : 'Task dependencies'}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
              {locale === 'ar' ? 'تقارير الإنتاجية' : 'Productivity reports'}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
              {locale === 'ar' ? 'تنبيهات المواعيد' : 'Deadline notifications'}
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

