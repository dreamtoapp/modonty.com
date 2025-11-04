import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StickyNote, FileText, MessageSquare, Search, History } from 'lucide-react';

export default async function AdministrativeNotesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('admin');

  const features = [
    {
      icon: StickyNote,
      title: locale === 'ar' ? 'ملاحظات سريعة' : 'Quick Notes',
      description: locale === 'ar'
        ? 'كتابة ملاحظات بسيطة وسريعة'
        : 'Write simple and quick notes'
    },
    {
      icon: FileText,
      title: locale === 'ar' ? 'محاضر الاجتماعات' : 'Meeting Minutes',
      description: locale === 'ar'
        ? 'تسجيل نقاط الاجتماعات الأساسية'
        : 'Record basic meeting points'
    },
    {
      icon: MessageSquare,
      title: locale === 'ar' ? 'القرارات المهمة' : 'Important Decisions',
      description: locale === 'ar'
        ? 'توثيق القرارات الإدارية الرئيسية'
        : 'Document key administrative decisions'
    },
    {
      icon: Search,
      title: locale === 'ar' ? 'بحث بسيط' : 'Simple Search',
      description: locale === 'ar'
        ? 'إيجاد الملاحظات بسهولة'
        : 'Find notes easily'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/5">
            <StickyNote className="h-10 w-10 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {t('administrativeNotes')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {locale === 'ar'
                ? 'نظام بسيط لحفظ الملاحظات والقرارات - ينمو مع احتياجات جبرسيو'
                : 'Simple system to save notes and decisions - grows with JBRtechno\'s needs'}
            </p>
          </div>
        </div>
      </div>

      {/* Coming Soon Hero Section */}
      <div className="mb-8 relative overflow-hidden">
        <Card className="border-2 border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950/50 dark:via-yellow-950/30 dark:to-orange-950/20 shadow-lg">
          <CardContent className="py-12 px-6 text-center relative">
            {/* Animated background circles */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>

            <div className="relative z-10 flex flex-col items-center gap-6">
              {/* Large animated icon */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                <div className="relative p-6 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
                  <StickyNote className="h-16 w-16 text-white" />
                </div>
              </div>

              {/* Large Coming Soon Badge */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative inline-flex">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 rounded-full blur-md opacity-75 animate-pulse"></div>
                  <Badge className="relative text-2xl md:text-3xl px-8 py-3 font-bold bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white border-0 shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <span className="flex items-center gap-3">
                      <span className="animate-bounce">✨</span>
                      {t('comingSoon')}
                      <span className="animate-bounce-delay-100">✨</span>
                    </span>
                  </Badge>
                </div>

                {/* Subtitle */}
                <p className="text-lg md:text-xl font-semibold text-amber-900 dark:text-amber-100 max-w-2xl">
                  {locale === 'ar'
                    ? '🚀 نبني هذا النظام داخلياً لدعم جبرسيو في المرحلة الأولى'
                    : '🚀 Building this system internally to support JBRtechno in Phase 1'}
                </p>

                {/* Progress indicator */}
                <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-300">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce-delay-100"></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce-delay-200"></div>
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
      <Card className="mb-8 border-amber-200 dark:border-amber-900/30 bg-gradient-to-br from-amber-50/50 to-transparent dark:from-amber-950/20">
        <CardHeader>
          <CardTitle className="text-2xl">
            {locale === 'ar' ? 'نظرة عامة' : 'Overview'}
          </CardTitle>
          <CardDescription className="text-base">
            {locale === 'ar'
              ? 'نبدأ بنظام بسيط لكتابة الملاحظات وحفظ القرارات المهمة. مع نمو نظام جبرسيو، سنضيف ميزات متقدمة مثل التصنيفات والبحث المتقدم والمشاركة بين الفرق.'
              : 'We\'re starting with a simple system to write notes and save important decisions. As JBRtechno system grows, we\'ll add advanced features like categories, advanced search, and team sharing.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-amber-200 dark:border-amber-900/30">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
              <History className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">
                {locale === 'ar' ? 'البداية البسيطة' : 'Starting Simple'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {locale === 'ar'
                  ? 'نبدأ بكتابة الملاحظات وحفظ القرارات المهمة بشكل بسيط. مع الوقت، سنضيف ميزات مثل التصنيفات، البحث المتقدم، والمشاركة. النظام ينمو مع احتياجات نظام جبرسيو.'
                  : 'We start by writing notes and saving important decisions simply. Over time, we\'ll add features like categories, advanced search, and sharing. The system grows with JBRtechno system\'s needs.'}
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
              <Card key={index} className="hover:shadow-md transition-all duration-200 hover:border-amber-200 dark:hover:border-amber-900/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                      <Icon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
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
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
              {locale === 'ar' ? 'التصنيفات والوسوم' : 'Categories and tags'}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
              {locale === 'ar' ? 'إرفاق الملفات والصور' : 'Attach files and images'}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
              {locale === 'ar' ? 'بحث متقدم وفلاتر' : 'Advanced search and filters'}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
              {locale === 'ar' ? 'المشاركة بين الفريق' : 'Team sharing'}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
              {locale === 'ar' ? 'التعليقات والنقاش' : 'Comments and discussions'}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
              {locale === 'ar' ? 'سجل التعديلات' : 'Edit history'}
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

