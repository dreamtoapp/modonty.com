export interface ProjectMetrics {
  teamSize: number;
  launchMonths: number;
  budgetMin: string;
  budgetMax: string;
  targetClients: string;
  totalArticles: string;
  mrr: string;
}

export function extractMetricsFromDocs(): ProjectMetrics {
  return {
    teamSize: 10,
    launchMonths: 4,
    budgetMin: '390,000',
    budgetMax: '504,000',
    targetClients: '30-40',
    totalArticles: '100+',
    mrr: '45,000-80,000',
  };
}

export interface TimelinePhase {
  month: number;
  title: string;
  focus: string;
  teamSize: number;
  articles: number;
  clients: number;
  mrr: string;
}

export function getTimelinePhases(): TimelinePhase[] {
  return [
    {
      month: 1,
      title: 'التأسيس',
      focus: 'Foundation',
      teamSize: 4,
      articles: 10,
      clients: 0,
      mrr: '0',
    },
    {
      month: 2,
      title: 'التطوير',
      focus: 'Development',
      teamSize: 7,
      articles: 30,
      clients: 0,
      mrr: '0',
    },
    {
      month: 3,
      title: 'البيتا',
      focus: 'Beta',
      teamSize: 10,
      articles: 70,
      clients: 7,
      mrr: '10-15K',
    },
    {
      month: 4,
      title: 'الإطلاق',
      focus: 'Launch',
      teamSize: 10,
      articles: 100,
      clients: 35,
      mrr: '50-80K',
    },
  ];
}

export interface Position {
  title: string;
  titleEn: string;
  count: number;
  salaryMin: number;
  salaryMax: number;
  phase: number;
  requirements: string[];
  requirementsEn: string[];
  employmentType?: 'full-time' | 'project-based';
  filledBy?: string;
}

export function getTeamPositions(): Position[] {
  return [
    // ========== LEADERSHIP & EXECUTIVE (Phase 0) ==========
    {
      title: 'CTO / Technical Lead',
      titleEn: 'CTO / Technical Lead',
      count: 1,
      salaryMin: 20000,
      salaryMax: 28000,
      phase: 0,
      filledBy: 'المهندس خالد',
      requirements: [
        '8-10 سنوات خبرة في هندسة البرمجيات',
        'خبرة مؤكدة في بناء وإطلاق منتجات SaaS',
        'معماري Full-stack: React/Next.js، Node.js',
        'إتقان متقدم: TypeScript، shadcn/ui، Tailwind CSS، CSS، JavaScript، JSON',
        'إدارة الحالة: Redux، Zustand، Context API',
        'Server-Side Rendering (SSR/SSG) مع Next.js',
        'Responsive Design و Mobile-First approach',
        'تحسين أداء الويب و Progressive Web Apps (PWA)',
        'تصميم وتنفيذ RESTful APIs و GraphQL',
        'المصادقة والتفويض: JWT، OAuth، Session Management',
        'أمان APIs وأفضل الممارسات الأمنية',
        'Serverless Architecture و WebSockets',
        'Git و CI/CD: GitHub Actions، GitLab CI',
        'تكامل APIs الطرف الثالث',
        'إدارة الوسائط السحابية: Cloudinary',
        'تحسين محركات البحث (SEO) وإمكانية الوصول (WCAG)',
        'System Design، Microservices، Scalability',
        'خبرة عملية في AI/ML APIs (OpenAI، Anthropic)',
        'قواعد البيانات SQL و NoSQL - مستوى متقدم',
        'مهارات متقدمة في حل المشكلات والتصحيح (Problem Solving & Debugging)',
        'قيادة وإدارة فرق التطوير التقنية',
        'Product mindset، Agile Leadership',
        'رؤية استراتيجية تقنية وقدرة على اتخاذ القرارات',
        'فهم عميق للسوق السعودي والعربي'
      ],
      requirementsEn: [
        '8-10 years software engineering experience',
        'Proven track record building and launching SaaS products',
        'Full-stack architect: React/Next.js, Node.js',
        'Expert proficiency: TypeScript, shadcn/ui, Tailwind CSS, CSS, JavaScript, JSON',
        'State Management: Redux, Zustand, Context API',
        'Server-Side Rendering (SSR/SSG) with Next.js',
        'Responsive Design & Mobile-First approach',
        'Web Performance Optimization & Progressive Web Apps (PWA)',
        'RESTful APIs & GraphQL design and implementation',
        'Authentication & Authorization: JWT, OAuth, Session Management',
        'API Security & Best Practices',
        'Serverless Architecture & WebSockets',
        'Git & CI/CD: GitHub Actions, GitLab CI',
        'Third-party API integrations',
        'Cloud media management: Cloudinary',
        'SEO optimization & Accessibility (WCAG standards)',
        'System Design, Microservices, Scalability',
        'Hands-on AI/ML APIs (OpenAI, Anthropic)',
        'SQL and NoSQL databases - Advanced level',
        'Advanced problem solving and debugging skills',
        'Leading and managing technical development teams',
        'Product mindset, Agile Leadership',
        'Strategic technical vision and decision-making ability',
        'Deep understanding of Saudi/Arab market'
      ]
    },
    {
      title: 'Operations',
      titleEn: 'Operations',
      count: 1,
      salaryMin: 10000,
      salaryMax: 15000,
      phase: 0,
      filledBy: 'المهندس عبدالعزيز',
      requirements: [
        '5+ سنوات خبرة في إدارة العمليات التقنية',
        'خبرة في تنسيق فرق متعددة (تسويق، محتوى، مبيعات)',
        'إدارة وتدريب فرق مبيعات 3-5 أشخاص',
        'فهم عميق لدورة مبيعات SaaS',
        'خبرة في السوق السعودي وأصحاب المتاجر',
        'إدارة العمليات اليومية والـ workflows',
        'خبرة في project management tools',
        'مهارات تحليلية لتحسين الكفاءة',
        'معرفة بـ Process Optimization',
        'مهارات تفاوض وإغلاق صفقات',
        'القدرة على حل المشاكل بسرعة',
        'مهارات تواصل وتنظيم ممتازة',
        'خبرة في إدارة الدعم الفني والعملاء',
        'إدارة فريق الدعم وتذاكر العملاء',
        'مهارات تحليل البيانات والتقارير',
        'معرفة بـ Google Analytics، Excel متقدم',
        'تحليل سلوك المستخدمين و Conversion Funnels',
        'معرفة بـ Data Visualization',
        'إتقان العربية والإنجليزية'
      ],
      requirementsEn: [
        '5+ years operations management in tech',
        'Experience coordinating multi-teams (marketing, content, sales)',
        'Managed and trained sales teams of 3-5',
        'Deep understanding of SaaS sales cycle',
        'Experience in Saudi market with e-commerce owners',
        'Daily operations and workflow management',
        'Project management tools experience',
        'Analytical skills for efficiency optimization',
        'Process Optimization knowledge',
        'Negotiation and deal closing skills',
        'Quick problem-solving ability',
        'Excellent communication and organization',
        'Customer support and service management experience',
        'Support team and ticket management',
        'Data analysis and reporting skills',
        'Knowledge of Google Analytics, Advanced Excel',
        'User behavior analysis & Conversion Funnels',
        'Data Visualization knowledge',
        'Fluent in Arabic and English'
      ]
    },
    {
      title: 'Head of Content',
      titleEn: 'Head of Content',
      count: 1,
      salaryMin: 12000,
      salaryMax: 18000,
      phase: 0,
      employmentType: 'full-time',
      requirements: [
        '3+ سنوات خبرة في إدارة المحتوى والـ SEO',
        'قيادة فرق محتوى 5-10 أشخاص',
        'خبرة في content strategy للمنصات الرقمية',
        'فهم عميق لـ SEO وخوارزميات Google',
        'إتقان Google Analytics و Google Search Console',
        'معرفة متقدمة بـ Technical SEO',
        'خبرة في Link Building واستراتيجيات الروابط',
        'تحليل المنافسين والكلمات المفتاحية',
        'إنشاء محتوى متعدد الأشكال: مقالات، فيديو، بودكاست، ويبينارز',
        'مهارات Copywriting و Storytelling متقدمة',
        'إتقان WordPress ومنصات التجارة الإلكترونية (Salla، Zid، Shopify)',
        'إدارة التقويم التحريري وسير عمل المحتوى',
        'إتقان أدوات SEO (SEMrush، Ahrefs أو مشابهة)',
        'خبرة في Google Keyword Planner و Google Trends',
        'قدرة على تحليل المحتوى المنافس وأدائه',
        'استراتيجيات توزيع وترويج المحتوى',
        'التعاون متعدد الوظائف مع فرق المنتج والمبيعات',
        'إدارة ميزانية المحتوى والمستقلين',
        'خبرة في بناء Domain Authority',
        'إعادة توظيف المحتوى عبر القنوات المتعددة',
        'إتقان استثنائي للغة العربية والإنجليزية',
        'فهم عميق للسوق السعودي والخليجي',
        'خبرة في تحسين المحتوى العربي لمحركات البحث',
        'القدرة على قياس ROI للمحتوى'
      ],
      requirementsEn: [
        '3+ years content management and SEO',
        'Led content teams of 5-10 people',
        'Content strategy experience for digital platforms',
        'Deep understanding of SEO and Google algorithms',
        'Google Analytics & Google Search Console mastery',
        'Advanced Technical SEO knowledge',
        'Link Building experience and backlink strategies',
        'Competitor and keyword analysis',
        'Multi-format content creation: articles, video, podcasts, webinars',
        'Advanced copywriting and storytelling skills',
        'WordPress and e-commerce platforms expertise (Salla, Zid, Shopify)',
        'Editorial calendar planning and content workflow management',
        'SEO tools proficiency (SEMrush, Ahrefs or similar)',
        'Experience with Google Keyword Planner & Google Trends',
        'Ability to analyze competitor content and performance',
        'Content distribution and promotion strategies',
        'Cross-functional collaboration with product and sales teams',
        'Content budget and freelancer management',
        'Experience building Domain Authority',
        'Content repurposing and multi-channel strategies',
        'Exceptional Arabic and English proficiency',
        'Deep understanding of Saudi and GCC markets',
        'Experience optimizing Arabic content for search engines',
        'Ability to measure content ROI'
      ]
    },
    {
      title: 'Head of Marketing',
      titleEn: 'Head of Marketing',
      count: 1,
      salaryMin: 12000,
      salaryMax: 18000,
      phase: 0,
      employmentType: 'full-time',
      requirements: [
        '3+ سنوات خبرة في التسويق الرقمي',
        'خبرة مؤكدة في تسويق منتجات SaaS/B2B',
        'قيادة استراتيجيات Growth Marketing',
        'خبرة في: Google Ads, Facebook Ads, LinkedIn',
        'فهم عميق للـ Customer Acquisition Cost (CAC)',
        'إتقان منصات التسويق الآلي: HubSpot، Marketo، ActiveCampaign',
        'خبرة متقدمة في SEO/SEM وتحسين محركات البحث',
        'استراتيجيات Email Marketing وحملات Drip',
        'خبرة في Product Marketing و Content Marketing',
        'إدارة وتطوير العلامة التجارية والرسائل التسويقية',
        'قيادة وإدارة الفرق التسويقية',
        'إدارة الميزانيات التسويقية وتخطيط الحملات',
        'أدوات التحليل: Google Analytics، Mixpanel، Amplitude، SEMrush',
        'A/B Testing وتحسين معدلات التحويل (CRO)',
        'إدارة استراتيجيات Social Media (مدفوع وعضوي)',
        'خبرة في إدارة منصات: Twitter/X، LinkedIn، Instagram، TikTok',
        'إنشاء محتوى engaging عبر القنوات (نصوص، صور، فيديو)',
        'مهارات تصميم أساسية (Canva، Adobe)',
        'فهم عميق للسوق السعودي وثقافة المحتوى العربي',
        'التعاون متعدد الوظائف مع فرق المبيعات والمنتج',
        'تحليل بيانات وقياس ROI للحملات',
        'إتقان العربية والإنجليزية',
        'شبكة علاقات في السوق السعودي'
      ],
      requirementsEn: [
        '3+ years digital marketing experience',
        'Proven track record marketing SaaS/B2B products',
        'Led Growth Marketing strategies',
        'Experience: Google Ads, Facebook Ads, LinkedIn',
        'Deep understanding of Customer Acquisition Cost',
        'Expert in marketing automation platforms: HubSpot, Marketo, ActiveCampaign',
        'Advanced SEO/SEM and search engine optimization',
        'Email marketing strategies and drip campaigns',
        'Product Marketing and Content Marketing experience',
        'Brand development and messaging management',
        'Team leadership and marketing team management',
        'Budget planning and campaign management',
        'Analytics tools: Google Analytics, Mixpanel, Amplitude, SEMrush',
        'A/B Testing and Conversion Rate Optimization (CRO)',
        'Social media strategy management (paid & organic)',
        'Platform management experience: Twitter/X, LinkedIn, Instagram, TikTok',
        'Create engaging cross-channel content (text, images, video)',
        'Basic design skills (Canva, Adobe)',
        'Deep understanding of Saudi market & Arabic content culture',
        'Cross-functional collaboration with sales and product teams',
        'Data analysis and campaign ROI measurement',
        'Fluent in Arabic & English',
        'Strong network in Saudi market'
      ]
    },

    // ========== TECHNICAL TEAM (Phase 1) ==========
    {
      title: 'Full-stack Developer',
      titleEn: 'Full-stack Developer',
      count: 2,
      salaryMin: 10000,
      salaryMax: 14000,
      phase: 1,
      filledBy: 'المهندس خالد',
      requirements: [
        '3-5 سنوات خبرة عملية في تطوير تطبيقات Full-stack',
        'React.js/Next.js 14+، TypeScript متقدم',
        'Node.js/Express أو Python/Django',
        'قواعد بيانات: PostgreSQL، MongoDB',
        'RESTful APIs، GraphQL، Microservices',
        'Git، CI/CD، Docker أساسيات',
        'AWS/Azure/GCP خبرة عملية',
        'Agile/Scrum، قدرة على العمل الجماعي'
      ],
      requirementsEn: [
        '3-5 years hands-on Full-stack development',
        'React.js/Next.js 14+, Advanced TypeScript',
        'Node.js/Express or Python/Django',
        'Databases: PostgreSQL, MongoDB',
        'RESTful APIs, GraphQL, Microservices',
        'Git, CI/CD, Docker fundamentals',
        'AWS/Azure/GCP practical experience',
        'Agile/Scrum, Strong teamwork skills'
      ]
    },
    {
      title: 'Lead Backend Developer',
      titleEn: 'Lead Backend Developer',
      count: 1,
      salaryMin: 10000,
      salaryMax: 16000,
      phase: 1,
      filledBy: 'المهندس خالد',
      requirements: [
        '5-7 سنوات خبرة في Backend Development',
        'إتقان Node.js + Express/Fastify أو NestJS',
        'خبرة قوية في PostgreSQL/MySQL + ORMs',
        'معرفة عميقة بـ REST APIs و GraphQL',
        'Authentication: JWT, OAuth, Session Management',
        'Payment integrations (Stripe, Paddle)',
        'Caching strategies (Redis, Memcached)',
        'Docker و CI/CD: GitHub Actions أساسيات',
        'AWS/GCP أساسيات: EC2، RDS، S3',
        'إدارة قواعد البيانات، Backups',
        'Security best practices و OWASP',
        'قيادة ومراجعة كود المطورين'
      ],
      requirementsEn: [
        '5-7 years Backend Development experience',
        'Expert Node.js + Express/Fastify or NestJS',
        'Strong PostgreSQL/MySQL + ORMs',
        'Deep knowledge of REST APIs & GraphQL',
        'Authentication: JWT, OAuth, Session Management',
        'Payment integrations (Stripe, Paddle)',
        'Caching strategies (Redis, Memcached)',
        'Docker & CI/CD: GitHub Actions fundamentals',
        'AWS/GCP basics: EC2, RDS, S3',
        'Database management, Backups',
        'Security best practices & OWASP',
        'Code reviews and team leadership'
      ]
    },
    {
      title: 'React Native Developer',
      titleEn: 'React Native Developer',
      count: 1,
      salaryMin: 9000,
      salaryMax: 13000,
      phase: 1,
      employmentType: 'full-time',
      requirements: [
        '3-4 سنوات خبرة في تطوير تطبيقات React Native',
        'React Native 0.70+، TypeScript قوي',
        'نشر تطبيقات على App Store و Google Play',
        '⭐ خبرة Next.js/React.js - ميزة تنافسية كبيرة!',
        'Native Modules (iOS/Android) عند الحاجة',
        'State Management: Redux، Zustand، أو Context API',
        'RESTful APIs، Async Storage، Push Notifications',
        'تحسين الأداء، Memory Management',
        'Git، CI/CD للـ Mobile (Fastlane، CodePush)'
      ],
      requirementsEn: [
        '3-4 years React Native app development',
        'React Native 0.70+, Strong TypeScript',
        'Published apps on App Store & Google Play',
        '⭐ Next.js/React.js experience - Strong competitive advantage!',
        'Native Modules (iOS/Android) when needed',
        'State Management: Redux, Zustand, or Context API',
        'RESTful APIs, Async Storage, Push Notifications',
        'Performance optimization, Memory Management',
        'Git, CI/CD for Mobile (Fastlane, CodePush)'
      ]
    },
    {
      title: 'Designer',
      titleEn: 'Designer',
      count: 1,
      salaryMin: 8000,
      salaryMax: 14000,
      phase: 1,
      filledBy: 'المهندس عبدالعزيز',
      requirements: [
        '4+ سنوات خبرة في التصميم والجرافيك',
        'إتقان Figma و Adobe Creative Suite',
        'خبرة في تصميم هويات بصرية متكاملة',
        'تصميم واجهات المستخدم UI/UX',
        'تصميم محتوى تسويقي ومنشورات سوشيال ميديا',
        'فهم عميق لمبادئ التصميم والألوان',
        'Portfolio قوي يعرض مشاريع متنوعة',
        'القدرة على العمل ضمن فريق',
        'إبداع وسرعة في التنفيذ'
      ],
      requirementsEn: [
        '4+ years design and graphic experience',
        'Expert in Figma & Adobe Creative Suite',
        'Complete visual identity design experience',
        'UI/UX interface design',
        'Marketing content and social media design',
        'Deep understanding of design principles and colors',
        'Strong portfolio showcasing diverse projects',
        'Ability to work within a team',
        'Creative and fast execution'
      ]
    },
    {
      title: 'UI/UX Designer',
      titleEn: 'UI/UX Designer',
      count: 1,
      salaryMin: 8000,
      salaryMax: 14000,
      phase: 1,
      employmentType: 'project-based',
      requirements: [
        '4+ سنوات خبرة في تصميم UI/UX',
        'إتقان Figma و Adobe XD',
        'خبرة في تصميم SaaS Dashboards',
        'فهم عميق لـ User Experience Principles',
        'خبرة في Design Systems و Component Libraries',
        'معرفة بـ Accessibility (WCAG 2.1)',
        'خبرة في A/B Testing و User Research',
        'Portfolio قوي يعرض مشاريع SaaS',
        'فهم للـ Frontend Development (HTML/CSS)'
      ],
      requirementsEn: [
        '4+ years UI/UX design experience',
        'Expert in Figma & Adobe XD',
        'Experience designing SaaS Dashboards',
        'Deep understanding of UX Principles',
        'Design Systems & Component Libraries',
        'Accessibility knowledge (WCAG 2.1)',
        'A/B Testing & User Research experience',
        'Strong portfolio showcasing SaaS projects',
        'Understanding of Frontend Dev (HTML/CSS)'
      ]
    },
    {
      title: 'Content Writers',
      titleEn: 'Content Writers',
      count: 2,
      salaryMin: 4000,
      salaryMax: 6000,
      phase: 2,
      employmentType: 'full-time',
      requirements: [
        '2+ سنوات في كتابة المحتوى',
        'إتقان الكتابة باللغة العربية',
        'معرفة بأساسيات SEO',
        'القدرة على الإنتاج: 12-20 مقال طويل (1500-2500 كلمة) أسبوعياً',
        'أو 18-22 مقال متوسط (800-1500 كلمة) أسبوعياً',
        'أو 20-25 مقال قصير (500-800 كلمة) أسبوعياً',
        'خبرة في المحتوى التقني أو التجاري',
        'مهارات بحث وتحليل قوية'
      ],
      requirementsEn: [
        '2+ years content writing',
        'Excellent Arabic writing skills',
        'SEO fundamentals knowledge',
        'Production capacity: 12-20 long-form articles (1500-2500 words) weekly',
        'Or 18-22 medium articles (800-1500 words) weekly',
        'Or 20-25 short blog posts (500-800 words) weekly',
        'Technical or business content experience',
        'Strong research & analysis skills'
      ]
    },
    {
      title: 'Editor',
      titleEn: 'Editor',
      count: 1,
      salaryMin: 5000,
      salaryMax: 7000,
      phase: 2,
      employmentType: 'full-time',
      requirements: [
        '3+ سنوات في التحرير والمراجعة',
        'إتقان قواعد اللغة العربية',
        'خبرة في تحرير المحتوى الرقمي',
        'معرفة بمعايير SEO',
        'مراجعة 10-15 مقالة يومياً',
        'مهارات تواصل ممتازة'
      ],
      requirementsEn: [
        '3+ years editing experience',
        'Perfect Arabic grammar mastery',
        'Digital content editing expertise',
        'SEO standards knowledge',
        'Review 10-15 articles daily',
        'Excellent communication skills'
      ]
    },

    // ========== SALES & MARKETING (Phase 4) ==========
    {
      title: 'Sales Representative',
      titleEn: 'Sales Representative',
      count: 2,
      salaryMin: 6000,
      salaryMax: 10000,
      phase: 4,
      employmentType: 'full-time',
      requirements: [
        '3+ سنوات خبرة في مبيعات B2B/SaaS',
        'سجل مؤكد في تحقيق أهداف المبيعات',
        'خبرة في CRM (Salesforce, HubSpot, Pipedrive)',
        'مهارات تواصل وإقناع استثنائية',
        'فهم لدورة مبيعات SaaS والاشتراكات',
        'خبرة في التعامل مع أصحاب المتاجر',
        'القدرة على العمل بأهداف شهرية',
        'إتقان العربية والإنجليزية'
      ],
      requirementsEn: [
        '3+ years B2B/SaaS sales experience',
        'Proven track record hitting sales targets',
        'CRM experience (Salesforce, HubSpot, Pipedrive)',
        'Exceptional communication & persuasion skills',
        'Understanding of SaaS sales cycle & subscriptions',
        'Experience dealing with e-commerce owners',
        'Ability to work with monthly quotas',
        'Fluent in Arabic & English'
      ]
    },
    {
      title: 'Customer Success Manager',
      titleEn: 'Customer Success Manager',
      count: 1,
      salaryMin: 7000,
      salaryMax: 12000,
      phase: 4,
      employmentType: 'full-time',
      requirements: [
        '3+ سنوات خبرة في Customer Success/Account Management',
        'خبرة مؤكدة في تقليل Churn وزيادة Retention',
        'فهم عميق لدورة حياة العميل في SaaS',
        'مهارات تواصل واستشارية ممتازة',
        'خبرة في onboarding العملاء وتدريبهم',
        'القدرة على تحليل بيانات العملاء',
        'معرفة بأدوات CS (Intercom، ChurnZero)',
        'إتقان العربية والإنجليزية'
      ],
      requirementsEn: [
        '3+ years Customer Success/Account Management',
        'Proven track record reducing churn & increasing retention',
        'Deep understanding of SaaS customer lifecycle',
        'Excellent communication & consulting skills',
        'Customer onboarding and training experience',
        'Customer data analysis ability',
        'CS tools knowledge (Intercom, ChurnZero)',
        'Fluent in Arabic & English'
      ]
    },
  ];
}

