'use client';

import { Card } from '@/components/ui/card';
import { Users, Briefcase, Code, FileText, ShoppingCart } from 'lucide-react';

interface PositionCardProps {
  title: string;
  count: number;
  icon: React.ElementType;
  filled?: boolean;
  filledBy?: string;
  color?: string;
  locale: string;
  temporary?: boolean;
}

function PositionCard({ title, count, icon: Icon, filled, filledBy, color = 'bg-primary', locale, temporary }: PositionCardProps) {
  const isArabic = locale === 'ar';

  return (
    <Card
      className={`
        flex-1 min-w-0 group relative overflow-hidden
        transition-all duration-300 hover:shadow-xl hover:-translate-y-1
        ${filled
          ? 'border-green-500/40 bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent'
          : 'border-border/50 bg-gradient-to-br from-muted/50 to-background hover:border-primary/30'
        }
      `}
    >
      <div className="p-5">
        {temporary && (
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-medium rounded-full border border-orange-500/30">
            {isArabic ? 'مؤقت' : 'Temp'}
          </div>
        )}
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm leading-tight mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>

            {filled && filledBy && (
              <div className="flex items-center gap-1.5 text-xs mt-2">
                <Users className="h-3 w-3 text-green-600 dark:text-green-400" />
                <span className="text-green-600 dark:text-green-400 font-semibold">
                  {filledBy}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Card>
  );
}

interface OrganizationalStructureProps {
  locale: string;
}

export function OrganizationalStructure({ locale }: OrganizationalStructureProps) {
  const isArabic = locale === 'ar';

  return (
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

      {/* Connecting Lines from CEO to Leadership */}
      <div className="relative flex justify-center h-16">
        <div className="absolute top-0 w-1 h-8 bg-gradient-to-b from-purple-500/60 via-primary/40 to-transparent rounded-full shadow-sm" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full" />
        <div className="absolute top-9 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-7 grid grid-cols-3 gap-4">
          <div className="flex justify-center">
            <div className="w-1 h-full bg-gradient-to-b from-primary/40 to-blue-500/50 rounded-full shadow-sm" />
          </div>
          <div className="flex justify-center">
            <div className="w-1 h-full bg-gradient-to-b from-primary/40 to-orange-500/50 rounded-full shadow-sm" />
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

        <div className="flex gap-4">
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
            title={isArabic ? 'مدير التسويق' : 'Head of Marketing'}
            count={1}
            icon={ShoppingCart}
            filled
            filledBy="Mohab"
            color="bg-pink-500"
            locale={locale}
          />
          <PositionCard
            title={isArabic ? 'مدير التسويق' : 'Head of Marketing'}
            count={1}
            icon={ShoppingCart}
            filled
            filledBy="Nada"
            color="bg-rose-500"
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
        <div className="relative h-16 mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-7xl mx-auto px-4">
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

        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
              <Code className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                {isArabic ? 'الفريق التقني' : 'Technical Team'}
              </h3>
            </div>
          </div>

          <div className="flex gap-4">
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
              filledBy="عبدالعزيز"
              color="bg-purple-500"
              locale={locale}
              temporary
            />
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="my-12 flex justify-center">
        <div className="w-48 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Head of Marketing → Sales & Marketing Team Section */}
      <div className="space-y-4">
        <div className="relative h-16 mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-4xl mx-auto px-4">
              <div className="flex items-center gap-2 text-sm text-pink-600 dark:text-pink-400 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                  <span className="font-medium">{isArabic ? 'تحت إشراف مديري التسويق' : 'Under Heads of Marketing'}</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-pink-500/30 to-transparent max-w-xs" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20">
              <ShoppingCart className="h-3.5 w-3.5 text-pink-600 dark:text-pink-400" />
              <h3 className="text-sm font-bold text-pink-600 dark:text-pink-400">
                {isArabic ? 'المبيعات والتسويق والمحتوى' : 'Sales, Marketing & Content'}
              </h3>
            </div>
          </div>

          <div className="flex gap-4">
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
      </div>
    </div>
  );
}















