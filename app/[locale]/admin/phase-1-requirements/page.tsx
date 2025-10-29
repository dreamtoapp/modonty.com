/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, AlertCircle, Clock, DollarSign, Users, Server, Globe, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CollapsibleCard } from '@/components/CollapsibleCard';
import { InteractiveStatusBadge } from '@/components/InteractiveStatusBadge';
import { prisma } from '@/lib/prisma';

export default async function Phase1RequirementsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  // Fetch requirements from database
  const dbRequirements = await prisma.phase1Requirement.findMany({
    orderBy: { createdAt: 'asc' },
  });

  // Create a map for quick lookup using English titles as keys
  const requirementStatusMap = new Map(
    dbRequirements.map((req) => [req.title, { id: req.id, status: req.status, priority: req.priority }])
  );

  const requirements = [
    {
      category: isArabic ? 'البنية التحتية التقنية' : 'Technical Infrastructure',
      icon: Server,
      color: 'text-blue-600',
      bgColor: 'bg-blue-500/10',
      categoryNote: isArabic
        ? '🚨 مطلوبة من اليوم الأول - لا يمكن بدء التطوير بدونها'
        : '🚨 Required from Day 1 - Cannot start development without these',
      items: [
        {
          key: 'modonaty.com',
          title: 'modonaty.com',
          description: isArabic ? 'اسم النطاق الرئيسي للمنصة' : 'Primary domain name for the platform',
          price: '$15',
          billing: isArabic ? 'سنوياً' : 'per year',
          plan: '.com',
          freeTierDetails: isArabic
            ? 'تم الشراء: $15/سنة (C$20.19) عبر Namecheap - تسجيل 5 سنوات بسعر C$100.96 - يشمل رسوم ICANN'
            : 'Purchased: $15/year (C$20.19) via Namecheap - 5-year registration at C$100.96 - includes ICANN fees',
          url: 'https://www.namecheap.com',
          when: isArabic ? 'الآن' : 'Now',
          whenColor: 'text-red-600 dark:text-red-400' as const,
          status: 'completed' as const,
          priority: 'high' as const,
        },
        {
          key: 'Professional Email',
          title: isArabic ? 'بريد إلكتروني احترافي' : 'Professional Email',
          description: isArabic
            ? 'بريد احترافي بنطاق الشركة (@modonaty.com)'
            : 'Professional email with company domain (@modonaty.com)',
          price: '$102',
          billing: isArabic ? 'سنوياً (لحسابين)' : 'per year (2 accounts)',
          plan: isArabic ? 'Google Workspace (1) + Namecheap Pro (1)' : 'Google Workspace (1) + Namecheap Pro (1)',
          freeTierDetails: isArabic
            ? 'Google: $72/سنة (30GB، Drive، Meet، Calendar، Docs) | Namecheap Pro: $30/سنة (30GB، mobile sync، anti-spam) - مزيج مثالي'
            : 'Google: $72/year (30GB, Drive, Meet, Calendar, Docs) | Namecheap Pro: $30/year (30GB, mobile sync, anti-spam) - Perfect mix',
          url: 'https://workspace.google.com/pricing',
          when: isArabic ? 'الآن' : 'Now',
          whenColor: 'text-red-600 dark:text-red-400' as const,
          status: 'pending' as const,
          priority: 'high' as const,
        },
        {
          key: 'Vercel',
          title: 'Vercel',
          description: isArabic
            ? 'استضافة Next.js مع CDN عالمي'
            : 'Next.js hosting with global CDN',
          price: '$20',
          billing: isArabic ? 'شهرياً' : 'per month',
          plan: 'Pro',
          freeTierDetails: isArabic
            ? '💡 نوصي بالبدء بـ Pro مباشرة: Advanced analytics، Team collaboration، Priority support، Commercial use - ضروري من اليوم الأول'
            : '💡 Recommend starting with Pro immediately: Advanced analytics, Team collaboration, Priority support, Commercial use - essential from day one',
          url: 'https://vercel.com/pricing',
          when: isArabic ? 'الآن (Pro مباشرة)' : 'Now (Pro directly)',
          whenColor: 'text-red-600 dark:text-red-400' as const,
          status: 'pending' as const,
          priority: 'high' as const,
        },
        {
          key: 'MongoDB Atlas',
          title: 'MongoDB Atlas',
          description: isArabic ? 'قاعدة بيانات سحابية NoSQL' : 'Cloud NoSQL database',
          price: '$0 → $57',
          billing: isArabic ? 'تطوير مجاني / إنتاج مدفوع' : 'Free Dev / Paid Prod',
          plan: 'M0 → M10',
          freeTierDetails: isArabic
            ? 'مجاني للأبد: 512MB تخزين - مناسب للتطوير والاختبار فقط | عند النشر: يجب الترقية لـ M10 ($57/شهر) لـ 10GB + Dedicated RAM'
            : 'Forever Free: 512MB storage - suitable for dev/testing only | On launch: Must upgrade to M10 ($57/month) for 10GB + Dedicated RAM',
          url: 'https://www.mongodb.com/pricing',
          when: isArabic ? 'الآن (مجاني) / عند النشر (مدفوع)' : 'Now (Free) / On Launch (Paid)',
          whenColor: 'text-amber-600 dark:text-amber-400' as const,
          status: 'pending' as const,
          priority: 'high' as const,
        },
        {
          key: 'ChatGPT Plus/API',
          title: 'ChatGPT Business',
          description: isArabic
            ? 'اشتراك ChatGPT للفريق - توليد وتحسين المحتوى'
            : 'ChatGPT Business for team - content generation and enhancement',
          price: '$300',
          billing: isArabic ? 'سنوياً' : 'per year',
          plan: 'Business (1 user)',
          freeTierDetails: isArabic
            ? 'ChatGPT Business: $25/شهر ($300/سنة بالدفع السنوي) - يشمل GPT-5 بدون حدود + أدوات تعاون الفريق + لوحة تحكم إدارية'
            : 'ChatGPT Business: $25/month ($300/year with annual billing) - includes unlimited GPT-5 + team collaboration + admin controls',
          url: 'https://openai.com/chatgpt/pricing',
          when: isArabic ? 'الآن' : 'Now',
          whenColor: 'text-red-600 dark:text-red-400' as const,
          status: 'pending' as const,
          priority: 'high' as const,
        },
        {
          key: 'SIM Card for WhatsApp',
          title: isArabic ? 'شريحة جوال للواتساب' : 'SIM Card for WhatsApp',
          description: isArabic
            ? 'رقم جوال مخصص لـ WhatsApp Business API'
            : 'Dedicated mobile number for WhatsApp Business API',
          price: '$8',
          billing: isArabic ? 'شهرياً' : 'per month',
          plan: isArabic ? 'خطة بيانات أساسية' : 'Basic Data Plan',
          freeTierDetails: isArabic
            ? 'رقم سعودي مخصص للأعمال - ضروري لتفعيل WhatsApp Business API والتواصل مع العملاء والمتقدمين'
            : 'Saudi business number - essential for WhatsApp Business API activation and customer/applicant communication',
          url: 'https://business.whatsapp.com',
          when: isArabic ? 'الآن' : 'Now',
          whenColor: 'text-red-600 dark:text-red-400' as const,
          status: 'pending' as const,
          priority: 'high' as const,
        },
        {
          key: 'Social Media Accounts',
          title: isArabic ? 'حسابات التواصل الاجتماعي' : 'Social Media Accounts',
          description: isArabic
            ? 'إنشاء حسابات رسمية وربطها بالدومين (X، Instagram، LinkedIn، Facebook)'
            : 'Create official accounts and link with domain (X, Instagram, LinkedIn, Facebook)',
          price: '$0',
          billing: isArabic ? 'مجاني' : 'Free',
          plan: isArabic ? 'حسابات رسمية موثقة' : 'Official Verified Accounts',
          freeTierDetails: isArabic
            ? 'إنشاء الحسابات مجاني - التوثيق قد يتطلب رسوم لاحقاً - ربط النطاق في البايو والإعدادات للمصداقية'
            : 'Account creation is free - Verification may require fees later - Link domain in bio and settings for credibility',
          url: 'https://business.facebook.com',
          when: isArabic ? 'الآن' : 'Now',
          whenColor: 'text-red-600 dark:text-red-400' as const,
          status: 'pending' as const,
          priority: 'high' as const,
        },
        {
          key: 'Facebook Ads Budget',
          title: isArabic ? 'ميزانية إعلانات فيسبوك' : 'Facebook Ads Budget',
          description: isArabic
            ? 'ميزانية إعلانات التوظيف على Meta (Facebook/Instagram)'
            : 'Job advertising budget on Meta (Facebook/Instagram)',
          price: '$150',
          billing: isArabic ? 'شهرياً' : 'per month',
          plan: isArabic ? 'حملات توظيف مستهدفة' : 'Targeted Recruitment Campaigns',
          freeTierDetails: isArabic
            ? 'ميزانية شهرية للإعلان عن الوظائف المتاحة واستقطاب المواهب المناسبة - استهداف دقيق للمهارات المطلوبة'
            : 'Monthly budget for job posting ads and talent acquisition - precise targeting for required skills',
          url: 'https://business.facebook.com/adsmanager',
          when: isArabic ? 'الآن' : 'Now',
          whenColor: 'text-red-600 dark:text-red-400' as const,
          status: 'pending' as const,
          priority: 'high' as const,
        },
        {
          key: 'Cloudinary',
          title: 'Cloudinary',
          description: isArabic ? 'تخزين ومعالجة الصور والملفات' : 'Image & file storage and processing',
          price: '$0 → $89',
          billing: isArabic ? 'تطوير مجاني / إنتاج مدفوع' : 'Free Dev / Paid Prod',
          plan: 'Free → Plus',
          freeTierDetails: isArabic
            ? 'مجاني للأبد: 25 Credits/شهر - مناسب للتطوير والاختبار فقط | عند النشر: يجب الترقية لـ Plus ($89/شهر) لـ 170 Credits'
            : 'Forever Free: 25 Credits/month - suitable for dev/testing only | On launch: Must upgrade to Plus ($89/month) for 170 Credits',
          url: 'https://cloudinary.com/pricing',
          when: isArabic ? 'الآن (مجاني) / عند النشر (مدفوع)' : 'Now (Free) / On Launch (Paid)',
          whenColor: 'text-amber-600 dark:text-amber-400' as const,
          status: 'completed' as const,
          priority: 'medium' as const,
        },
        {
          key: 'Resend',
          title: 'Resend',
          description: isArabic ? 'خدمة إرسال الإشعارات والبريد' : 'Email notifications service',
          price: '$0 → $20',
          billing: isArabic ? 'مجاني / مدفوع حسب الحاجة' : 'Free / Paid as needed',
          plan: 'Free → Pro',
          freeTierDetails: isArabic
            ? 'مجاني للأبد: 3,000 بريد/شهر - كافي للبداية | عند الحاجة: الترقية لـ Pro ($20/شهر) لـ 50,000 بريد'
            : 'Forever Free: 3,000 emails/month - sufficient for start | When needed: Upgrade to Pro ($20/month) for 50,000 emails',
          url: 'https://resend.com/pricing',
          when: isArabic ? 'هذا الشهر (مجاني) / حسب النمو (مدفوع)' : 'This Month (Free) / As Grow (Paid)',
          whenColor: 'text-green-600 dark:text-green-400' as const,
          status: 'pending' as const,
          priority: 'medium' as const,
        },
      ],
    },
    {
      category: isArabic ? 'الدومين والهوية' : 'Domain & Identity',
      icon: Globe,
      color: 'text-green-600',
      bgColor: 'bg-green-500/10',
      items: [
        {
          key: 'SSL Certificate',
          title: isArabic ? 'شهادة SSL' : 'SSL Certificate',
          description: isArabic ? 'Let\'s Encrypt أو شهادة مدفوعة' : 'Let\'s Encrypt or paid certificate',
          status: 'pending' as const,
          priority: 'high' as const,
        },
        {
          key: 'Logo & Visual Identity',
          title: isArabic ? 'الشعار والهوية البصرية' : 'Logo & Visual Identity',
          description: isArabic ? 'تصميم الشعار ودليل الهوية البصرية' : 'Logo design and brand identity guide',
          status: 'in-progress' as const,
          priority: 'medium' as const,
        },
      ],
    },
    {
      category: isArabic ? 'المتطلبات القانونية' : 'Legal Requirements',
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-500/10',
      items: [
        {
          key: 'Terms of Service',
          title: isArabic ? 'شروط الاستخدام' : 'Terms of Service',
          description: isArabic ? 'إعداد شروط الاستخدام وسياسة الخصوصية' : 'Prepare terms of service and privacy policy',
          status: 'pending' as const,
          priority: 'high' as const,
        },
        {
          key: 'Employment Contracts',
          title: isArabic ? 'عقود العمل' : 'Employment Contracts',
          description: isArabic ? 'إعداد عقود موحدة للموظفين' : 'Prepare standard employee contracts',
          status: 'in-progress' as const,
          priority: 'medium' as const,
        },
      ],
    },
    {
      category: isArabic ? 'الفريق الأساسي' : 'Core Team',
      icon: Users,
      color: 'text-pink-600',
      bgColor: 'bg-pink-500/10',
      items: [
        {
          key: 'CTO / Technical Lead',
          title: isArabic ? 'CTO / المدير التقني' : 'CTO / Technical Lead',
          description: isArabic ? 'المهندس خالد' : 'Eng. Khalid',
          status: 'completed' as const,
          priority: 'high' as const,
        },
        {
          key: 'Frontend Developer',
          title: isArabic ? 'مطور Frontend' : 'Frontend Developer',
          description: isArabic ? 'خالد' : 'Khalid',
          status: 'completed' as const,
          priority: 'high' as const,
        },
        {
          key: 'Backend Developer',
          title: isArabic ? 'مطور Backend' : 'Backend Developer',
          description: isArabic ? 'خالد' : 'Khalid',
          status: 'completed' as const,
          priority: 'high' as const,
        },
        {
          key: 'Operations Manager',
          title: isArabic ? 'مدير العمليات' : 'Operations Manager',
          description: isArabic ? 'المهندس عبدالعزيز' : 'Eng. Abdulaziz',
          status: 'completed' as const,
          priority: 'high' as const,
        },
        {
          key: 'Designer',
          title: isArabic ? 'مصمم' : 'Designer',
          description: isArabic ? 'عبدالعزيز' : 'Abdulaziz',
          status: 'completed' as const,
          priority: 'high' as const,
        },
        {
          key: 'React Native Developer',
          title: isArabic ? 'مطور React Native' : 'React Native Developer',
          description: isArabic ? 'قيد التوظيف' : 'Hiring in progress',
          status: 'in-progress' as const,
          priority: 'high' as const,
        },
        {
          key: 'Head of Content',
          title: isArabic ? 'مدير المحتوى' : 'Head of Content',
          description: isArabic ? 'قيد التوظيف' : 'Hiring in progress',
          status: 'pending' as const,
          priority: 'medium' as const,
        },
        {
          key: 'Lawyer / Legal Advisor',
          title: isArabic ? 'محامي / مستشار قانوني' : 'Lawyer / Legal Advisor',
          description: isArabic ? 'للمتطلبات القانونية وتأسيس الشركة' : 'For legal requirements and company formation',
          status: 'pending' as const,
          priority: 'high' as const,
        },
      ],
    },
  ];

  const getStatusBadge = (status: 'completed' | 'in-progress' | 'pending') => {
    const statusConfig = {
      completed: {
        label: isArabic ? 'مكتمل' : 'Completed',
        variant: 'default' as const,
        className: 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30',
      },
      'in-progress': {
        label: isArabic ? 'قيد التنفيذ' : 'In Progress',
        variant: 'secondary' as const,
        className: 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30',
      },
      pending: {
        label: isArabic ? 'معلق' : 'Pending',
        variant: 'outline' as const,
        className: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/30',
      },
    };

    const config = statusConfig[status];
    return (
      <Badge variant={config.variant} className={`text-xs ${config.className}`}>
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: 'high' | 'medium' | 'low') => {
    const priorityConfig = {
      high: {
        label: isArabic ? 'عالي' : 'High',
        className: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30',
      },
      medium: {
        label: isArabic ? 'متوسط' : 'Medium',
        className: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/30',
      },
      low: {
        label: isArabic ? 'منخفض' : 'Low',
        className: 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/30',
      },
    };

    const config = priorityConfig[priority];
    return (
      <Badge variant="outline" className={`text-[10px] ${config.className}`}>
        {config.label}
      </Badge>
    );
  };

  // Calculate progress from database
  const totalItems = dbRequirements.length;
  const completedItems = dbRequirements.filter((req) => req.status === 'COMPLETED').length;
  const inProgressItems = dbRequirements.filter((req) => req.status === 'IN_PROGRESS').length;
  const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm">
            <CheckSquare className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              {isArabic ? 'المتطلبات التأسيسية' : 'Foundation Requirements'}
            </h1>
          </div>
        </div>
        <p className="text-muted-foreground text-base leading-relaxed">
          {isArabic
            ? 'جميع المتطلبات الأساسية اللازمة لإطلاق المشروع في مرحلته الأولى'
            : 'All essential requirements needed to launch the project in its first phase'}
        </p>

        {/* Progress Bar */}
        <div className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">
                  {isArabic ? 'التقدم الإجمالي' : 'Overall Progress'}
                </h3>
                <span className="text-2xl font-bold text-primary">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-primary/80 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">
                    {isArabic ? 'مكتمل:' : 'Completed:'} <strong>{completedItems}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-muted-foreground">
                    {isArabic ? 'قيد التنفيذ:' : 'In Progress:'} <strong>{inProgressItems}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-muted-foreground">
                    {isArabic ? 'معلق:' : 'Pending:'} <strong>{totalItems - completedItems - inProgressItems}</strong>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Critical Priority: Prepaid Card */}
        <div className="mt-6">
          <Card className="border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-background relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-orange-500/10 to-amber-500/5 animate-pulse" />

            <CardContent className="p-6 relative">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                  <DollarSign className="h-7 w-7 text-amber-600 dark:text-amber-400" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">
                      {isArabic ? '🔑 الأولوية #1: بطاقة بنكية مسبقة الدفع' : '🔑 Priority #1: Prepaid Bank Card'}
                    </h3>
                    <Badge className="bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30 animate-pulse">
                      {isArabic ? 'عاجل' : 'URGENT'}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {isArabic
                      ? '⚠️ المتطلب الأساسي لتنفيذ جميع البنود أدناه. بدون هذه البطاقة، لن نستطيع شراء أي من الخدمات الضرورية لبدء المشروع.'
                      : '⚠️ The foundational requirement for executing all items below. Without this card, we cannot purchase any of the essential services needed to start the project.'}
                  </p>

                  {/* Action needed */}
                  <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                      {isArabic
                        ? '✅ الإجراء المطلوب: الحصول على بطاقة مسبقة الدفع (Visa/Mastercard) لشراء جميع الخدمات التقنية (استضافة، قواعد بيانات، أدوات)'
                        : '✅ Action Required: Obtain a prepaid card (Visa/Mastercard) to purchase all technical services (hosting, databases, tools)'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cost Summary Card */}
        <div className="mt-6">
          <Card className="border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-background">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-emerald-500/30">
                  <DollarSign className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100 mb-3">
                    {isArabic ? '💰 التكلفة الإجمالية - البنية التحتية' : '💰 Total Cost - Infrastructure'}
                  </h3>

                  <div className="p-4 rounded-lg bg-background/50 border border-border max-w-md">
                    <p className="text-xs text-muted-foreground mb-2">
                      {isArabic ? '🚀 اليوم الأول (التطوير)' : '🚀 Day 1 (Development)'}
                    </p>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span>{isArabic ? 'الدومين (5 سنوات):' : 'Domain (5 years):'}</span>
                        <span className="font-bold text-amber-600">$101</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Vercel Pro:</span>
                        <span className="font-bold">$240/سنة</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{isArabic ? 'بريد احترافي (2 حسابات):' : 'Business Email (2 accounts):'}</span>
                        <span className="font-bold">$102/سنة</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>ChatGPT Business:</span>
                        <span className="font-bold">$300/سنة</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{isArabic ? 'شريحة واتساب:' : 'WhatsApp SIM:'}</span>
                        <span className="font-bold text-amber-600">$8</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{isArabic ? 'إعلانات فيسبوك (شهرين):' : 'Facebook Ads (2 months):'}</span>
                        <span className="font-bold">$300</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{isArabic ? 'خدمات أخرى:' : 'Other services:'}</span>
                        <span className="font-bold text-green-600">$0</span>
                      </div>
                      <div className="pt-2 mt-2 border-t">
                        <div className="flex justify-between font-bold text-base">
                          <span>{isArabic ? 'السنة الأولى:' : 'Year 1 Total:'}</span>
                          <span className="text-emerald-600 dark:text-emerald-400">$1,051</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {isArabic ? '$53.50/شهر (متكرر) + $300 (إعلانات) + $109 (رسوم لمرة واحدة)' : '$53.50/month (recurring) + $300 (ads) + $109 (one-time)'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Requirements Categories */}
      <div className="space-y-6">
        {requirements.map((category, idx) => {
          const Icon = category.icon;
          // Calculate category progress from database
          const categoryCompleted = category.items.filter((item) => {
            const dbData = requirementStatusMap.get((item as any).key || item.title);
            return dbData?.status === 'COMPLETED';
          }).length;
          const categoryTotal = category.items.length;
          const categoryProgress = categoryTotal > 0 ? Math.round((categoryCompleted / categoryTotal) * 100) : 0;

          return (
            <CollapsibleCard
              key={idx}
              defaultOpen={idx === 0}
              header={
                <div className="space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${category.bgColor}`}>
                        <Icon className={`h-5 w-5 ${category.color}`} />
                      </div>
                      <CardTitle className="text-xl">{category.category}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium" dir="ltr">
                        {categoryCompleted} / {categoryTotal}
                      </span>
                      <div className="relative w-24 bg-muted/30 dark:bg-muted/20 border border-border rounded-full h-2.5 overflow-hidden" dir="ltr">
                        <div
                          className="absolute inset-y-0 left-0 rounded-full transition-all duration-300 bg-green-500 dark:bg-green-600"
                          style={{ width: `${categoryProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Category Note/Hint */}
                  {(category as any).categoryNote && (
                    <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30">
                      <p className="text-xs font-bold text-red-700 dark:text-red-400">
                        {(category as any).categoryNote}
                      </p>
                    </div>
                  )}
                </div>
              }
            >
              <div className="divide-y">
                {category.items.map((item, itemIdx) => {
                  const dbData = requirementStatusMap.get((item as any).key || item.title);
                  const isCompleted = dbData?.status === 'COMPLETED';

                  return (
                    <div
                      key={itemIdx}
                      className={`group p-4 transition-all duration-300 flex items-start justify-between gap-4 border-l-4 ${isCompleted
                        ? 'bg-green-500/10 border-green-500 hover:bg-green-500/15'
                        : 'border-transparent hover:bg-muted/50 hover:border-primary/30 active:bg-primary/10 active:border-primary'
                        } cursor-default`}
                    >
                      <div className="flex-1 min-w-0">
                        {/* Service Name & Priority */}
                        <div className="flex items-center gap-2 mb-2">
                          {isCompleted && (
                            <CheckSquare className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                          )}
                          <h4 className={`font-bold text-base ${isCompleted ? 'text-green-700 dark:text-green-300' : ''}`}>{item.title}</h4>
                          {getPriorityBadge(item.priority)}
                        </div>

                        {/* Brief Description */}
                        <p className="text-xs text-muted-foreground mb-2">{item.description}</p>

                        {/* Price & Billing */}
                        {(item as any).price && (
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-bold text-green-600 dark:text-green-400">
                              {(item as any).price}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {(item as any).billing}
                            </span>
                            {(item as any).plan && (
                              <Badge variant="outline" className="text-[10px] h-4">
                                {(item as any).plan}
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Free Tier Details */}
                        {(item as any).freeTierDetails && (
                          <div className="p-2 mb-2 rounded bg-green-500/5 border border-green-500/20">
                            <p className="text-xs text-green-700 dark:text-green-400">
                              ✓ {(item as any).freeTierDetails}
                            </p>
                          </div>
                        )}

                        {/* When Needed */}
                        {(item as any).when && (
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-muted-foreground">
                              {isArabic ? '⏰ متى:' : '⏰ When:'}
                            </span>
                            <span className={`text-xs font-bold ${(item as any).whenColor}`}>
                              {(item as any).when}
                            </span>
                          </div>
                        )}

                        {/* Source Link */}
                        {(item as any).url && (
                          <a
                            href={(item as any).url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            <span>{isArabic ? 'المصدر الرسمي' : 'Official Source'}</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        {(() => {
                          const dbData = requirementStatusMap.get((item as any).key || item.title);
                          if (dbData) {
                            return (
                              <InteractiveStatusBadge
                                id={dbData.id}
                                status={dbData.status as any}
                                isArabic={isArabic}
                              />
                            );
                          }
                          return getStatusBadge(item.status);
                        })()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CollapsibleCard>
          );
        })}
      </div>

      {/* Timeline Estimate */}
      <Card className="mt-8 border-dashed">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <CardTitle>{isArabic ? 'الجدول الزمني المتوقع (مرن)' : 'Expected Timeline (Flexible)'}</CardTitle>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {isArabic
              ? '⚡ المهام يمكن تنفيذها بشكل متوازٍ - الجدول قابل للتعديل حسب الظروف والأولويات'
              : '⚡ Tasks can be executed in parallel - Timeline adjustable based on circumstances and priorities'}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                <p className="text-xs text-blue-700 dark:text-blue-400 font-bold">
                  {isArabic ? '1-2 أسبوع' : '1-2 Weeks'}
                </p>
              </div>
              <p className="font-semibold text-sm mb-1">
                {isArabic ? 'البنية التحتية التقنية' : 'Technical Infrastructure'}
              </p>
              <p className="text-xs text-muted-foreground">
                {isArabic ? 'يمكن البدء فوراً' : 'Can start immediately'}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                <p className="text-xs text-amber-700 dark:text-amber-400 font-bold">
                  {isArabic ? '2-4 أسابيع' : '2-4 Weeks'}
                </p>
              </div>
              <p className="font-semibold text-sm mb-1">
                {isArabic ? 'الهوية والمتطلبات القانونية' : 'Identity & Legal Requirements'}
              </p>
              <p className="text-xs text-muted-foreground">
                {isArabic ? 'يعتمد على الجهات الحكومية' : 'Depends on government entities'}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <p className="text-xs text-green-700 dark:text-green-400 font-bold">
                  {isArabic ? '2-6 أسابيع' : '2-6 Weeks'}
                </p>
              </div>
              <p className="font-semibold text-sm mb-1">
                {isArabic ? 'بناء الفريق والتوظيف' : 'Team Building & Hiring'}
              </p>
              <p className="text-xs text-muted-foreground">
                {isArabic ? 'حسب توفر المواهب المناسبة' : 'Based on talent availability'}
              </p>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-muted/50 border">
            <p className="text-xs text-muted-foreground">
              {isArabic
                ? '💡 ملاحظة: يمكن تسريع الجدول الزمني بالعمل على المراحل بشكل متوازٍ. الإطار الزمني الإجمالي المقترح: 4-8 أسابيع للمتطلبات الأساسية.'
                : '💡 Note: Timeline can be accelerated by working on phases in parallel. Overall suggested timeframe: 4-8 weeks for foundational requirements.'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

