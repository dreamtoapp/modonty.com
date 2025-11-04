import { Card, CardContent } from '@/components/ui/card';
import { Users, Briefcase, Code, FileText, ShoppingCart, Network } from 'lucide-react';

interface PositionCardProps {
  title: string;
  count: number;
  icon: React.ElementType;
  filled?: boolean;
  filledBy?: string;
  color?: string;
}

function PositionCard({ title, count, icon: Icon, filled, filledBy, color = 'bg-primary', locale }: PositionCardProps & { locale: string }) {
  const isArabic = locale === 'ar';

  return (
    <Card
      className={`
        min-w-[220px] group relative overflow-hidden
        transition-all duration-300 hover:shadow-xl hover:-translate-y-1
        ${filled
          ? 'border-green-500/40 bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent'
          : 'border-border/50 bg-gradient-to-br from-muted/50 to-background hover:border-primary/30'
        }
      `}
    >
      <CardContent className="p-5">
        {/* Status Badge */}
        {filled && (
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-medium rounded-full border border-green-500/30">
            {isArabic ? 'مشغول' : 'Filled'}
          </div>
        )}

        <div className="flex items-start gap-3">
          {/* Icon with gradient background */}
          <div className={`
            relative rounded-xl ${color}/10 p-3 
            transition-transform duration-300 group-hover:scale-110
            before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br 
            ${color.replace('bg-', 'before:from-')} before:to-transparent before:opacity-0 
            group-hover:before:opacity-20 before:transition-opacity
          `}>
            <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')} transition-all duration-300`} />
          </div>

          <div className="flex-1 min-w-0 pt-1">
            {/* Title */}
            <h3 className="font-bold text-sm leading-tight mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>

            {/* Info */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs">
                <div className={`w-1.5 h-1.5 rounded-full ${filled ? 'bg-green-500' : 'bg-muted-foreground/50'}`} />
                <span className="text-muted-foreground font-medium">
                  {count} {isArabic ? 'وظيفة' : 'position'}{count > 1 && !isArabic ? 's' : ''}
                </span>
              </div>

              {filled && filledBy && (
                <div className="flex items-center gap-1.5 text-xs">
                  <Users className="h-3 w-3 text-green-600 dark:text-green-400" />
                  <span className="text-green-600 dark:text-green-400 font-semibold">
                    {filledBy}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hover indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </CardContent>
    </Card>
  );
}

export default async function AdminDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Enhanced Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm">
            <Network className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              {isArabic ? 'الهيكل الإداري' : 'Organizational Structure'}
            </h1>
          </div>
        </div>
        <p className="text-muted-foreground text-base leading-relaxed">
          {isArabic
            ? 'الهيكل التنظيمي الكامل للفريق والأقسام - عرض شامل لجميع المناصب والمسؤوليات'
            : 'Complete organizational structure of the team and departments - Comprehensive view of all positions and responsibilities'}
        </p>

        {/* Stats Bar */}
        <div className="mt-6 flex gap-4 flex-wrap">
          <div className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
            <span className="text-xs text-muted-foreground">{isArabic ? 'إجمالي الوظائف' : 'Total Positions'}</span>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">13</p>
          </div>
          <div className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 backdrop-blur-sm">
            <span className="text-xs text-muted-foreground">{isArabic ? 'مشغولة' : 'Filled'}</span>
            <p className="text-lg font-bold text-green-600 dark:text-green-400">5</p>
          </div>
          <div className="px-4 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm">
            <span className="text-xs text-muted-foreground">{isArabic ? 'شاغرة' : 'Vacant'}</span>
            <p className="text-lg font-bold text-orange-600 dark:text-orange-400">8</p>
          </div>
        </div>
      </div>

      {/* Organizational Chart - Custom Design */}
      <div className="space-y-8">
        {/* CEO Level */}
        <div className="flex justify-center">
          <PositionCard
            title={isArabic ? 'الرئيس التنفيذي' : 'CEO'}
            count={1}
            icon={Briefcase}
            color="bg-purple-500"
            locale={locale}
          />
        </div>

        {/* Enhanced Connecting Lines from CEO to Leadership */}
        <div className="relative flex justify-center h-16">
          {/* Vertical line down from CEO */}
          <div className="absolute top-0 w-1 h-8 bg-gradient-to-b from-purple-500/60 via-primary/40 to-transparent rounded-full shadow-sm" />

          {/* Horizontal distribution line */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full" />

          {/* Vertical lines down to each leadership card */}
          <div className="absolute top-9 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-7 grid grid-cols-4 gap-4">
            <div className="flex justify-center">
              <div className="w-1 h-full bg-gradient-to-b from-primary/40 to-blue-500/50 rounded-full shadow-sm" />
            </div>
            <div className="flex justify-center">
              <div className="w-1 h-full bg-gradient-to-b from-primary/40 to-orange-500/50 rounded-full shadow-sm" />
            </div>
            <div className="flex justify-center">
              <div className="w-1 h-full bg-gradient-to-b from-primary/40 to-green-500/50 rounded-full shadow-sm" />
            </div>
            <div className="flex justify-center">
              <div className="w-1 h-full bg-gradient-to-b from-primary/40 to-pink-500/50 rounded-full shadow-sm" />
            </div>
          </div>
        </div>

        {/* Leadership Level */}
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <h2 className="text-base font-bold text-primary">
                {isArabic ? 'القيادة والإدارة' : 'Leadership & Management'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="leadership-grid">
            <PositionCard
              title={isArabic ? 'CTO / المدير التقني' : 'CTO / Technical Lead'}
              count={1}
              icon={Code}
              filled
              filledBy={isArabic ? 'المهندس خالد' : 'Eng. Khalid'}
              color="bg-blue-500"
              locale={locale}
            />
            <PositionCard
              title={isArabic ? 'مدير العمليات' : 'Operations Manager'}
              count={1}
              icon={Users}
              filled
              filledBy={isArabic ? 'المهندس عبدالعزيز' : 'Eng. Abdulaziz'}
              color="bg-orange-500"
              locale={locale}
            />
            <PositionCard
              title={isArabic ? 'مدير المحتوى' : 'Head of Content'}
              count={1}
              icon={FileText}
              color="bg-green-500"
              locale={locale}
            />
            <PositionCard
              title={isArabic ? 'مدير التسويق' : 'Head of Marketing'}
              count={1}
              icon={ShoppingCart}
              color="bg-pink-500"
              locale={locale}
            />
          </div>
        </div>

        {/* Section Divider */}
        <div className="my-12 flex justify-center">
          <div className="w-48 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* CTO → Technical Team Section */}
        <div className="space-y-4">
          {/* Connection Visualization */}
          <div className="relative h-16 mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-7xl mx-auto px-4">
                {/* Visual connector */}
                <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 justify-start lg:justify-start">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="font-medium">{isArabic ? 'تحت إشراف CTO' : 'Under CTO'}</span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent max-w-xs" />
                </div>
              </div>
            </div>
          </div>

          {/* Technical Team */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                <Code className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {isArabic ? 'الفريق التقني' : 'Technical Team'}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <PositionCard
                title={isArabic ? 'مطور Frontend' : 'Frontend Developer'}
                count={1}
                icon={Code}
                filled
                filledBy={isArabic ? 'محمد' : 'Mohammed'}
                color="bg-cyan-500"
                locale={locale}
              />
              <PositionCard
                title={isArabic ? 'مطور Backend' : 'Backend Developer'}
                count={1}
                icon={Code}
                filled
                filledBy={isArabic ? 'مصطفى' : 'Mustafa'}
                color="bg-indigo-500"
                locale={locale}
              />
              <PositionCard
                title={isArabic ? 'مطور React Native' : 'React Native Developer'}
                count={1}
                icon={Code}
                color="bg-violet-500"
                locale={locale}
              />
              <PositionCard
                title={isArabic ? 'مصمم' : 'Designer'}
                count={1}
                icon={Briefcase}
                filled
                filledBy={isArabic ? 'احمد' : 'Ahmed'}
                color="bg-purple-500"
                locale={locale}
              />
            </div>
          </div>

          {/* Section Divider */}
          <div className="my-12 flex justify-center">
            <div className="w-48 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          {/* Head of Content → Content Team Section */}
          <div className="space-y-4">
            {/* Connection Visualization */}
            <div className="relative h-16 mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-2xl mx-auto px-4">
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 justify-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="font-medium">{isArabic ? 'تحت إشراف مدير المحتوى' : 'Under Head of Content'}</span>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-green-500/30 to-transparent max-w-xs" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Team */}
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                  <FileText className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                  <h3 className="text-sm font-bold text-green-600 dark:text-green-400">
                    {isArabic ? 'فريق المحتوى' : 'Content Team'}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <PositionCard
                  title={isArabic ? 'كاتب محتوى #1' : 'Content Writer #1'}
                  count={1}
                  icon={FileText}
                  color="bg-emerald-500"
                  locale={locale}
                />
                <PositionCard
                  title={isArabic ? 'كاتب محتوى #2' : 'Content Writer #2'}
                  count={1}
                  icon={FileText}
                  color="bg-emerald-500"
                  locale={locale}
                />
              </div>
            </div>

            {/* Section Divider */}
            <div className="my-12 flex justify-center">
              <div className="w-48 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            {/* Head of Marketing → Sales Team Section */}
            <div className="space-y-4">
              {/* Connection Visualization */}
              <div className="relative h-16 mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full max-w-2xl mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm text-pink-600 dark:text-pink-400 justify-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                        <span className="font-medium">{isArabic ? 'تحت إشراف مدير التسويق' : 'Under Head of Marketing'}</span>
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-pink-500/30 to-transparent max-w-xs" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sales & Marketing */}
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20">
                    <ShoppingCart className="h-3.5 w-3.5 text-pink-600 dark:text-pink-400" />
                    <h3 className="text-sm font-bold text-pink-600 dark:text-pink-400">
                      {isArabic ? 'المبيعات والتسويق' : 'Sales & Marketing'}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <PositionCard
                    title={isArabic ? 'ممثل مبيعات #1' : 'Sales Representative #1'}
                    count={1}
                    icon={ShoppingCart}
                    color="bg-rose-500"
                    locale={locale}
                  />
                  <PositionCard
                    title={isArabic ? 'ممثل مبيعات #2' : 'Sales Representative #2'}
                    count={1}
                    icon={ShoppingCart}
                    color="bg-rose-500"
                    locale={locale}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

