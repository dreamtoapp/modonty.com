import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Translation dictionary
const translations = {
  // BMC Canvas arrays
  'E-commerce Platforms (Salla, Zid, Shopify)': 'منصات التجارة الإلكترونية (سلة، زيد، Shopify)',
  'Marketing Agencies': 'وكالات التسويق',
  'Guest Posting Sites': 'مواقع النشر الضيفي',
  'Web Development Firms': 'شركات تطوير المواقع',
  'Business Consultants': 'استشاريو الأعمال',
  'Influencers/Creators': 'المؤثرون/المبدعون',
  'Content Creation': 'إنشاء المحتوى',
  'SEO Optimization': 'تحسين محركات البحث',
  'Platform Development': 'تطوير المنصة',
  'Client Onboarding': 'إدماج العملاء',
  'Quality Assurance': 'ضمان الجودة',
  'Performance Analytics': 'تحليلات الأداء',
  'Customer Support': 'دعم العملاء',
  'Team (20-25 people)': 'الفريق (20-25 شخصاً)',
  'Authority Blog': 'مدونة السلطة',
  'SaaS Platform': 'منصة SaaS',
  'Content Library': 'مكتبة المحتوى',
  'Brand Assets': 'أصول العلامة التجارية',
  'Technology Stack': 'مجموعة التقنيات',
  'Domain Authority': 'سلطة النطاق',
  'Authority Blog System (DA building)': 'نظام مدونة السلطة (بناء DA)',
  '18 Months Content (Pay 12, Get 18)': 'محتوى 18 شهراً (ادفع 12، احصل على 18)',
  '90% Cost Savings vs Agencies': 'توفير 90% في التكلفة مقارنة بالوكالات',
  'Transparency (GTM/Analytics Integration)': 'الشفافية (تكامل GTM/Analytics)',
  'No SEO Knowledge Required': 'لا حاجة لمعرفة SEO',
  'Arabic Content Excellence': 'تميز المحتوى العربي',
  'Authority Backlinks': 'روابط خلفية من مواقع موثوقة',
  'Predictive ROI Calculator': 'حاسبة عائد الاستثمار التنبؤية',
  'Self-Service SaaS (80%)': 'SaaS ذاتي الخدمة (80%)',
  'Managed Service (15%)': 'خدمة مدعومة (15%)',
  'White-Label (5%)': 'العلامة البيضاء (5%)',
  'Automated Onboarding': 'إدماج تلقائي',
  'Dedicated Account Mgrs': 'مديرو حسابات مخصصون',
  'Email/Phone Support': 'دعم البريد الإلكتروني/الهاتف',
  'Monthly Strategy Calls': 'مكالمات استراتيجية شهرية',
  'Customer Success Program': 'برنامج نجاح العملاء',
  'Website (Self-Service Signup)': 'الموقع (تسجيل ذاتي)',
  'Partnerships (Platform Integrations)': 'الشراكات (تكاملات المنصة)',
  'Paid Advertising (Google, LinkedIn, FB)': 'الإعلانات المدفوعة (Google، LinkedIn، FB)',
  'Content Marketing (Blog, LinkedIn, YouTube)': 'تسويق المحتوى (المدونة، LinkedIn، YouTube)',
  'Referral Program (20% recurring commission)': 'برنامج الإحالة (20% عمولة متكررة)',
  'Events & Webinars': 'الفعاليات والندوات',
  'Sales Team (Outbound Prospecting)': 'فريق المبيعات (استكشاف خارجي)',
  'Social Media (Organic Growth)': 'وسائل التواصل الاجتماعي (نمو عضوي)',
  'Small E-commerce Stores (50-500K SAR revenue)': 'متاجر تجارة إلكترونية صغيرة (إيرادات 50-500 ألف ريال)',
  'Medium E-commerce Stores (500K-5M SAR revenue)': 'متاجر تجارة إلكترونية متوسطة (إيرادات 500 ألف - 5 مليون ريال)',
  'Enterprise Retailers': 'تجار المؤسسات',
  'Medical/Beauty Clinics': 'عيادات طبية/تجمالية',
  'Law Firms/Consultants': 'مكاتب محاماة/استشاريون',
  
  // Section titles
  'KEY PARTNERS': 'الشركاء الرئيسيون',
  'KEY ACTIVITIES': 'الأنشطة الرئيسية',
  'KEY RESOURCES': 'الموارد الرئيسية',
  'VALUE PROPOSITIONS': 'العروض القيمة',
  'CUSTOMER RELATIONSHIPS': 'علاقات العملاء',
  'CHANNELS': 'القنوات',
  'CUSTOMER SEGMENTS': 'شرائح العملاء',
  'COST STRUCTURE': 'هيكل التكلفة',
  'REVENUE STREAMS': 'تدفقات الإيرادات',
  
  // Partner sections
  'E-commerce Platform Partners': 'شركاء منصات التجارة الإلكترونية',
  'Saudi e-commerce platform integration': 'تكامل منصة التجارة الإلكترونية السعودية',
  'Regional e-commerce platform partnership': 'شراكة منصة التجارة الإلكترونية الإقليمية',
  'International e-commerce platform API access': 'الوصول إلى API منصة التجارة الإلكترونية الدولية',
  'WordPress e-commerce integration': 'تكامل WordPress للتجارة الإلكترونية',
  'Provide direct access to store owners, referral channels, API integrations for automated onboarding': 'توفير وصول مباشر لأصحاب المتاجر، قنوات الإحالة، تكاملات API للإدماج التلقائي',
  'Marketing & Agency Partners': 'شركاء التسويق والوكالات',
  'Web development agencies (referral program - 20% recurring commission)': 'وكالات تطوير المواقع (برنامج إحالة - 20% عمولة متكررة)',
  'Business consultants serving e-commerce clients': 'استشاريو أعمال يخدمون عملاء التجارة الإلكترونية',
  'Marketing agencies (white-label solution customers)': 'وكالات التسويق (عملاء حل العلامة البيضاء)',
  'Content & Authority Building Partners': 'شركاء بناء المحتوى والسلطة',
  'High Domain Authority (DA 50+) websites for guest posting': 'مواقع ذات سلطة نطاق عالية (DA 50+) للنشر الضيفي',
  'Industry blogs and publications for backlinks': 'مدونات ومنشورات الصناعة للحصول على روابط خلفية',
  'Influencers and content creators for brand awareness': 'المؤثرون ومنشئو المحتوى للوعي بالعلامة التجارية',
  'Technology Partners': 'الشركاء التقنيون',
  'Cloud hosting providers (Vercel, AWS, etc.)': 'مزودو الاستضافة السحابية (Vercel، AWS، إلخ)',
  'Payment processors (Stripe)': 'معالجات الدفع (Stripe)',
  'Analytics platforms (Google Analytics, Search Console)': 'منصات التحليلات (Google Analytics، Search Console)',
  'SEO tools (Ahrefs, SEMrush APIs)': 'أدوات SEO (Ahrefs، SEMrush APIs)',
  'Direct access to target customers': 'وصول مباشر للعملاء المستهدفين',
  'Credibility and trust building': 'بناء المصداقية والثقة',
  'Content distribution channels': 'قنوات توزيع المحتوى',
  'Referral revenue opportunities': 'فرص إيرادات الإحالة',
};

// Helper function to translate text
function translateText(text) {
  if (typeof text !== 'string') return text;
  
  // Check exact match first
  if (translations[text]) {
    return translations[text];
  }
  
  // Return original if no translation found
  return text;
}

// Main translation function
function translateBMCContent(enContent) {
  const arContent = JSON.parse(JSON.stringify(enContent));
  
  // Translate meta section
  arContent.meta.status = 'نموذج عمل نشط';
  arContent.meta.title = 'Modonty - نموذج العمل التجاري (BMC)';
  
  // Executive summary already translated in the file
  
  // Translate bmcCanvas arrays
  if (arContent.bmcCanvas) {
    if (arContent.bmcCanvas.keyPartners) {
      arContent.bmcCanvas.keyPartners = arContent.bmcCanvas.keyPartners.map(translateText);
    }
    if (arContent.bmcCanvas.keyActivities) {
      arContent.bmcCanvas.keyActivities = arContent.bmcCanvas.keyActivities.map(translateText);
    }
    if (arContent.bmcCanvas.keyResources) {
      arContent.bmcCanvas.keyResources = arContent.bmcCanvas.keyResources.map(translateText);
    }
    if (arContent.bmcCanvas.valuePropositions) {
      arContent.bmcCanvas.valuePropositions = arContent.bmcCanvas.valuePropositions.map(translateText);
    }
    if (arContent.bmcCanvas.customerRelationships) {
      arContent.bmcCanvas.customerRelationships = arContent.bmcCanvas.customerRelationships.map(translateText);
    }
    if (arContent.bmcCanvas.channels) {
      arContent.bmcCanvas.channels = arContent.bmcCanvas.channels.map(translateText);
    }
    if (arContent.bmcCanvas.customerSegments) {
      arContent.bmcCanvas.customerSegments = arContent.bmcCanvas.customerSegments.map(translateText);
    }
  }
  
  // Translate section titles
  if (arContent.keyPartners) {
    arContent.keyPartners.title = 'الشركاء الرئيسيون';
  }
  if (arContent.keyActivities) {
    arContent.keyActivities.title = 'الأنشطة الرئيسية';
  }
  if (arContent.keyResources) {
    arContent.keyResources.title = 'الموارد الرئيسية';
  }
  if (arContent.valuePropositions) {
    arContent.valuePropositions.title = 'العروض القيمة';
  }
  if (arContent.customerRelationships) {
    arContent.customerRelationships.title = 'علاقات العملاء';
  }
  if (arContent.channels) {
    arContent.channels.title = 'القنوات';
  }
  if (arContent.customerSegments) {
    arContent.customerSegments.title = 'شرائح العملاء';
  }
  if (arContent.costStructure) {
    arContent.costStructure.title = 'هيكل التكلفة';
  }
  if (arContent.revenueStreams) {
    arContent.revenueStreams.title = 'تدفقات الإيرادات';
  }
  if (arContent.financialSummary) {
    arContent.financialSummary.title = 'الملخص المالي';
  }
  if (arContent.keyMetrics) {
    arContent.keyMetrics.title = 'المقاييس والمؤشرات الرئيسية';
  }
  if (arContent.competitiveAdvantages) {
    arContent.competitiveAdvantages.title = 'المزايا التنافسية';
  }
  if (arContent.growthStrategy) {
    arContent.growthStrategy.title = 'استراتيجية النمو';
  }
  if (arContent.risks) {
    arContent.risks.title = 'المخاطر والتخفيف';
  }
  if (arContent.conclusion) {
    arContent.conclusion.title = 'الخلاصة';
  }
  
  return arContent;
}

// Read English file
const enFilePath = path.join(__dirname, '../lib/bmc-content.json');
const enContent = JSON.parse(fs.readFileSync(enFilePath, 'utf8'));

// Translate
const arContent = translateBMCContent(enContent);

// Write Arabic file
const arFilePath = path.join(__dirname, '../lib/bmc-content-ar.json');
fs.writeFileSync(arFilePath, JSON.stringify(arContent, null, 2), 'utf8');

console.log('Arabic translation created successfully!');
console.log('Note: This is a basic translation. Full comprehensive translation needs manual review.');





















