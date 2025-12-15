import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Target,
  Clock,
  Users,
  FileText,
  Globe,
  ExternalLink,
  Share2,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import modontyContent from "@/lib/modonty-landing-content.json";
import type { LandingContent } from "@/lib/modonty-landing-types";
import { GoToTop } from "@/components/common/go-to-top";

const content = modontyContent as LandingContent;

export default function Home() {
  return (
    <div className="min-h-screen" dir="rtl">
      <div className="p-4 lg:p-6">
      {/* Section 1: Hero Section */}
      <section id="hero" className="relative overflow-hidden bg-secondary py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg ring-2 ring-primary/30">
                01
              </div>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Hero Section</span>
            </div>

            {/* Main Heading */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {content.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-foreground/80 mb-4 leading-relaxed max-w-4xl mx-auto">
                {content.hero.subtitle}
              </p>
              <div className="mt-6">
                <p className="text-2xl font-bold text-brand-primary">
                  {content.hero.tagline}
                </p>
              </div>
            </div>

            {/* Core Concept: Authority Blog Model */}
            <div className="bg-card rounded-2xl shadow-xl p-8 mb-8 border-2 border-brand-primary/20">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  كيف يعمل نظام Modonty الفريد؟
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  نحن لا نبيع "مقالات" فقط... نحن نبني <span className="font-bold text-brand-primary">منظومة محتوى ذكية</span> تخدمك وتقويك في نفس الوقت
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                {/* Master Article Card */}
                <Card className="bg-primary/5 border-2 border-primary/20 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                        1
                      </div>
                      <CardTitle className="text-xl text-brand-primary">مقال رئيسي في مدونة Modonty</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 mb-4 leading-relaxed">
                      نكتب مقال احترافي طويل وعميق بالعربية، منشور في <span className="font-bold text-brand-primary">مدونة Modonty المركزية القوية</span> التي تتصدر نتائج البحث في Google.
                    </p>
                    <div className="bg-background/60 p-3 rounded-lg">
                      <p className="text-sm text-foreground/80 font-semibold mb-2">ما يحدث:</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                          <span>المقال يذكر شركتك أو متجرك داخل النص</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                          <span>روابط استراتيجية لموقعك من مدونة قوية</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                          <span>المدونة تكبر وتقوى مع كل مقال جديد</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Customized Version Card */}
                <Card className="bg-chart-2/5 border-2 border-chart-2/20 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-success text-primary-foreground flex items-center justify-center text-xl font-bold">
                        2
                      </div>
                      <CardTitle className="text-xl text-success">نسخة مخصصة جاهزة لموقعك</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 mb-4 leading-relaxed">
                      نفس الفكرة، لكن <span className="font-bold text-success">مكتوبة خصيصاً لمشروعك</span> - مذكور فيها اسمك، خدماتك، منتجاتك.
                    </p>
                    <div className="bg-background/60 p-3 rounded-lg">
                      <p className="text-sm text-foreground font-semibold mb-2">ما تحصل عليه:</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                          <span>مقال جاهز للنشر مباشرة في موقعك</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                          <span>محتوى مخصص 100% لمشروعك</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                          <span>بدون تعديلات أو جهد إضافي</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Core Value Proposition */}
              <div className="mt-8 bg-brand-primary text-primary-foreground p-6 rounded-xl">
                <div className="text-center">
                  <p className="text-lg font-semibold mb-2">الفكرة الأساسية:</p>
                  <p className="text-xl font-bold">
                    كل مقال يقوّي المدونة المركزية ← المدونة تقوّي موقعك ← موقعك يكسب حضور حقيقي في Google
                  </p>
                  <p className="text-sm mt-3 opacity-90">
                    نظام ذكي يبني قيمة تراكمية - كل شهر تصير أقوى من الشهر اللي قبله
                  </p>
                </div>
              </div>
            </div>

            {/* Key Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="bg-card shadow-lg border-2 border-brand-primary/30">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">📅</div>
                  <h3 className="font-bold text-lg mb-2 text-brand-primary">18 شهر محتوى</h3>
                  <p className="text-sm text-muted-foreground">
                    تدفع 12 شهر وتحصل على <span className="font-bold text-brand-primary">18 شهر</span> - لأن النتائج تحتاج وقت
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card shadow-lg border-2 border-chart-2/30">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">📊</div>
                  <h3 className="font-bold text-lg mb-2 text-chart-2">شفافية كاملة</h3>
                  <p className="text-sm text-muted-foreground">
                    ترى النتائج في <span className="font-bold text-chart-2">Google Analytics</span> و GTM - أرقام حقيقية، مش وعود
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card shadow-lg border-2 border-accent/30">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">🚫</div>
                  <h3 className="font-bold text-lg mb-2 text-chart-3">بدون تعقيد SEO</h3>
                  <p className="text-sm text-muted-foreground">
                    لا تحتاج تفهم SEO أو مصطلحات تقنية - <span className="font-bold text-chart-3">نحن نتولى كل شيء</span>
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card shadow-lg border-2 border-brand-accent/30">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">💰</div>
                  <h3 className="font-bold text-lg mb-2 text-chart-4">توفير 90%</h3>
                  <p className="text-sm text-muted-foreground">
                    بدل 36K-96K ريال/سنة لوكالة، <span className="font-bold text-chart-4">2.5K-10K ريال فقط</span>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Metrics with Context */}
            <div className="bg-card rounded-2xl shadow-xl p-6 border-2 border-brand-primary/20">
              <h3 className="text-xl font-bold text-center mb-6 text-foreground">
                أهدافنا ونتائجنا المتوقعة
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-primary/5 p-4 rounded-xl border-2 border-primary/30 text-center">
                  <div className="text-3xl font-bold mb-1 text-brand-primary">500</div>
                  <div className="text-sm font-semibold text-foreground/80 mb-1">هدف السنة 1</div>
                  <div className="text-xs text-muted-foreground">عدد العملاء المستهدفين</div>
                </div>
                <div className="bg-chart-2/5 p-4 rounded-xl border-2 border-chart-2/30 text-center">
                  <div className="text-3xl font-bold mb-1 text-success">4K</div>
                  <div className="text-sm font-semibold text-foreground/80 mb-1">ريال/سنة</div>
                  <div className="text-xs text-muted-foreground">متوسط الإيراد للعميل</div>
                </div>
                <div className="bg-accent/5 p-4 rounded-xl border-2 border-accent/30 text-center">
                  <div className="text-3xl font-bold mb-1 text-accent">2.4M</div>
                  <div className="text-sm font-semibold text-foreground/80 mb-1">ريال</div>
                  <div className="text-xs text-muted-foreground">الدخل السنوي المتوقع</div>
                </div>
                <div className="bg-chart-4/10 p-4 rounded-xl border-2 border-chart-4/40 text-center">
                  <div className="text-3xl font-bold mb-1 text-chart-4">50</div>
                  <div className="text-sm font-semibold text-foreground mb-1">عميل</div>
                  <div className="text-xs text-muted-foreground">نقطة التعادل (4-6 أشهر)</div>
                </div>
                <div className="bg-primary/10 p-4 rounded-xl border-2 border-primary/40 text-center">
                  <div className="text-3xl font-bold mb-1 text-primary">18</div>
                  <div className="text-sm font-semibold text-foreground mb-1">شهر</div>
                  <div className="text-xs text-muted-foreground">محتوى مستمر لكل عميل</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: What is Modonty */}
      <section id="what-is" className="py-16 bg-background scroll-mt-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg ring-2 ring-primary/30">
                02
              </div>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">What is Modonty</span>
            </div>
            <h2 className="text-4xl font-bold text-center mb-6">
              {content.whatIsModonty.title}
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg leading-relaxed">
              {content.whatIsModonty.description}
            </p>

            <div className="bg-secondary p-8 rounded-2xl shadow-lg border border-brand-primary/20">
              <ul className="space-y-4 mb-6">
                {content.whatIsModonty.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-brand-primary flex-shrink-0 mt-1" />
                    <span className="text-foreground text-lg">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-background p-6 rounded-xl mt-6">
                <p className="text-center text-lg text-foreground leading-relaxed">
                  {content.whatIsModonty.coreConcept}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section id="how-it-works" className="py-16 bg-muted scroll-mt-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg ring-2 ring-primary/30">
                03
              </div>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">How It Works</span>
            </div>
            <h2 className="text-4xl font-bold text-center mb-4">
              {content.howItWorks.title}
            </h2>
            <p className="text-center text-xl text-muted-foreground mb-12">
              {content.howItWorks.closing}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {content.howItWorks.steps.map((step) => (
                <Card key={step.number} className="bg-background shadow-lg border-2 border-primary/10">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center text-xl font-bold">
                        {step.number}
                      </div>
                      <CardTitle className="text-2xl">{step.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 mb-4 leading-relaxed">{step.description}</p>
                    {step.benefits && (
                      <ul className="space-y-2 mt-4">
                        {step.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                            <ArrowRight className="h-4 w-4 text-brand-primary" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    )}
                    {step.features && (
                      <ul className="space-y-2 mt-4">
                        {step.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-chart-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Value Proposition (Why Different) */}
      <section id="why-different" className="py-16 bg-background scroll-mt-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg ring-2 ring-primary/30">
                04
              </div>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Value Proposition</span>
            </div>
            <h2 className="text-4xl font-bold text-center mb-12">
              {content.valueProposition.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {content.valueProposition.points.map((point, index) => (
                <Card key={index} className="bg-background shadow-lg border-2 border-border">
                  <CardHeader>
                    <CardTitle className="text-xl text-brand-primary mb-2">
                      {point.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground leading-relaxed">{point.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Target Audience */}
      <section id="target-audience" className="py-16 bg-secondary scroll-mt-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg ring-2 ring-primary/30">
                05
              </div>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Target Audience</span>
            </div>
            <h2 className="text-4xl font-bold text-center mb-6">
              {content.targetAudience.title}
            </h2>
            <p className="text-center text-xl text-muted-foreground mb-8">
              {content.targetAudience.description}
            </p>

            <div className="bg-background p-6 rounded-2xl shadow-lg mb-12">
              <ul className="space-y-3 mb-6">
                {content.targetAudience.problems.map((problem, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground">
                    <span className="text-destructive font-bold">×</span>
                    {problem}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.targetAudience.audiences.map((audience, index) => (
                <Card key={index} className="bg-background shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">{audience.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{audience.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Challenges Solved */}
      <section id="challenges" className="py-16 bg-background scroll-mt-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg ring-2 ring-primary/30">
                06
              </div>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Challenges Solved</span>
            </div>
            <h2 className="text-4xl font-bold text-center mb-6">
              {content.challengesSolved.title}
            </h2>
            <p className="text-center text-xl text-muted-foreground mb-12">
              {content.challengesSolved.description}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-destructive/10 p-6 rounded-2xl border-2 border-destructive/30">
                <h3 className="text-2xl font-bold mb-4 text-destructive">المشاكل</h3>
                <ul className="space-y-3">
                  {content.challengesSolved.problems.map((problem, index) => (
                    <li key={index} className="flex items-start gap-3 text-foreground">
                      <span className="text-destructive font-bold text-xl">×</span>
                      {problem}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-chart-2/10 p-6 rounded-2xl border-2 border-chart-2/30">
                <h3 className="text-2xl font-bold mb-4 text-chart-2">الحلول</h3>
                <div className="space-y-4">
                  {content.challengesSolved.solutions.map((solution, index) => (
                    <div key={index}>
                      <h4 className="font-bold text-foreground mb-1">{solution.title}</h4>
                      <p className="text-foreground text-sm">{solution.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Why Strong */}
      <section id="why-strong" className="py-16 bg-muted scroll-mt-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg ring-2 ring-primary/30">
                07
              </div>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Why Strong</span>
            </div>
            <h2 className="text-4xl font-bold text-center mb-12">
              {content.whyStrong.title}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.whyStrong.points.map((point, index) => (
                <Card key={index} className="bg-background shadow-lg border-2 border-primary/10">
                  <CardHeader>
                    <CardTitle className="text-lg text-brand-primary">
                      {point.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Market Opportunity */}
      <section id="market-opportunity" className="py-16 bg-background scroll-mt-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg ring-2 ring-primary/30">
                08
              </div>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Market Opportunity</span>
            </div>
            <h2 className="text-4xl font-bold text-center mb-4 text-brand-primary">
              حجم السوق والفرصة 🌍
            </h2>
            <p className="text-center text-xl text-muted-foreground mb-12">
              سوق ضخم ونمو استثنائي
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl shadow-xl border-2 border-chart-3/30 text-center">
                <div className="text-4xl font-bold text-chart-3 mb-2">$495</div>
                <div className="text-lg font-semibold mb-2">مليار دولار</div>
                <div className="text-sm text-muted-foreground mb-3">الاقتصاد الرقمي السعودي 2024</div>
                <div className="text-xs text-muted-foreground">(15% من الناتج المحلي الإجمالي)</div>
                <Link
                  href="https://sharikatmubasher.com/news/article/21481808/حجم-الاقتصاد-الرقمي-السعودي-يسجل-495-مليار-دولار-بنهاية-2024"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center justify-center gap-1 text-xs mt-2"
                >
                  <ExternalLink className="h-3 w-3" />
                  مصدر البيانات
                </Link>
              </div>

              <div className="bg-background p-6 rounded-xl shadow-xl border-2 border-primary/20 text-center">
                <div className="text-4xl font-bold text-primary mb-2">$8.9</div>
                <div className="text-lg font-semibold mb-2">مليار دولار</div>
                <div className="text-sm text-muted-foreground mb-1">سوق الإعلانات الرقمية 2024</div>
                <div className="text-xs text-muted-foreground mb-1">→ $23.1 مليار (2030)</div>
                <div className="text-xs text-chart-2 font-semibold mb-3">نمو سنوي 17.1%</div>
                <Link
                  href="https://maaal.com/archives/202505/8-9-مليار-دولار-سوق-الإعلانات-الرقمية-في/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center justify-center gap-1 text-xs mt-2"
                >
                  <ExternalLink className="h-3 w-3" />
                  مصدر البيانات
                </Link>
              </div>

              <div className="bg-background p-6 rounded-xl shadow-xl border-2 border-chart-2/30 text-center">
                <div className="text-4xl font-bold text-chart-2 mb-2">$4.3-5.3</div>
                <div className="text-lg font-semibold mb-2">مليار دولار</div>
                <div className="text-sm text-muted-foreground mb-3">سوق المحتوى الرقمي (2030)</div>
                <Link
                  href="https://aawsat.com/home/article/3114021/نمو-سوق-المحتوى-الرقمي-السعودي-إلى-53-مليار-دولار-في-2030"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center justify-center gap-1 text-xs mt-2"
                >
                  <ExternalLink className="h-3 w-3" />
                  مصدر البيانات
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl shadow-xl border-2 border-primary/30 text-center">
                <div className="text-4xl font-bold text-primary mb-2">4-10.1</div>
                <div className="text-lg font-semibold mb-2">مليار ريال</div>
                <div className="text-sm text-muted-foreground mb-3">سوق خدمات السيو سنوياً</div>
                <Link
                  href="https://umg.digital/أفضل-10-شركات-سيو-في-السعودية/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center justify-center gap-1 text-xs mt-2"
                >
                  <ExternalLink className="h-3 w-3" />
                  مصدر البيانات
                </Link>
              </div>

              <div className="bg-background p-6 rounded-xl shadow-xl border-2 border-chart-4/30 text-center">
                <div className="text-4xl font-bold text-chart-4 mb-2">140</div>
                <div className="text-lg font-semibold mb-2">مليار ريال</div>
                <div className="text-sm text-muted-foreground mb-3">سوق التجارة الإلكترونية 2024</div>
                <div className="text-xs text-muted-foreground">نمو سنوي متوقع 32%</div>
              </div>

              <div className="bg-background p-6 rounded-xl shadow-xl border-2 border-primary/30 text-center">
                <div className="text-4xl font-bold text-primary mb-2">98%+</div>
                <div className="text-lg font-semibold mb-2">نسبة استخدام الإنترنت</div>
                <div className="text-sm text-muted-foreground mb-3">في المملكة العربية السعودية</div>
                <Link
                  href="https://www.rs4it.sa/أهم-استراتيجيات-السيو/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center justify-center gap-1 text-xs mt-2"
                >
                  <ExternalLink className="h-3 w-3" />
                  مصدر البيانات
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-r from-secondary to-secondary p-6 rounded-xl border-2 border-primary/20 mb-8">
              <h3 className="text-xl font-bold text-center mb-4 text-brand-primary">فرص السوق في منطقة الخليج</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-background p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">الإمارات العربية المتحدة</span>
                    <span className="text-lg font-bold text-primary">$1.22B</span>
                  </div>
                  <p className="text-sm text-muted-foreground">سوق الإعلانات الرقمية (2025)</p>
                  <Link
                    href="https://www.mubasher.info/news/4393394/كم-سيبلغ-حجم-قطاع-الإعلانات-الرقمية-الإماراتي-في-2025/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1 text-xs mt-2"
                  >
                    <ExternalLink className="h-3 w-3" />
                    مصدر
                  </Link>
                </div>
                <div className="bg-background p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">دول مجلس التعاون</span>
                    <span className="text-lg font-bold text-chart-2">$151B</span>
                  </div>
                  <p className="text-sm text-muted-foreground">عوائد محتملة من التحول الرقمي</p>
                  <Link
                    href="https://www.erembusiness.com/economy/fqjg7a9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1 text-xs mt-2"
                  >
                    <ExternalLink className="h-3 w-3" />
                    مصدر
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-brand-primary text-white p-8 rounded-2xl shadow-xl mb-8">
              <h3 className="text-2xl font-bold text-center mb-6">💡 لماذا السوق ضخم؟</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-2">اقتصاد رقمي ضخم</h4>
                    <p className="text-sm opacity-90">الاقتصاد الرقمي السعودي يبلغ $495 مليار (15% من الناتج المحلي) - فرصة هائلة للمحتوى والخدمات الرقمية</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-2">نمو متسارع في الإعلانات الرقمية</h4>
                    <p className="text-sm opacity-90">سوق الإعلانات الرقمية ينمو من $8.9B (2024) إلى $23.1B (2030) - نمو سنوي 17.1%</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-2">سوق محتوى رقمي واعد</h4>
                    <p className="text-sm opacity-90">سوق المحتوى الرقمي يتوقع أن يصل إلى $4.3-5.3 مليار بحلول 2030 - نمو مستمر</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-2">طلب كبير على خدمات السيو</h4>
                    <p className="text-sm opacity-90">سوق خدمات السيو يتراوح بين 4-10.1 مليار ريال سنوياً - حاجة مستمرة للتحسين</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-2">رؤية 2030 والتحول الرقمي</h4>
                    <p className="text-sm opacity-90">دعم حكومي قوي للتحول الرقمي والمحتوى العربي - بيئة مواتية للنمو</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-2">نموذج فريد في السوق</h4>
                    <p className="text-sm opacity-90">Authority Blog + نسخ مخصصة + 18 شهر + روابط استراتيجية = لا أحد يقدم هذا الحل الشامل</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sources Section */}
            <div className="bg-muted p-6 rounded-xl border border-border">
              <h3 className="text-lg font-bold text-center mb-4 text-foreground">مصادر البيانات والإحصائيات</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">الاقتصاد الرقمي السعودي:</span>
                    <Link
                      href="https://sharikatmubasher.com/news/article/21481808/حجم-الاقتصاد-الرقمي-السعودي-يسجل-495-مليار-دولار-بنهاية-2024"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline mr-2"
                    >
                      شركة مباشر
                    </Link>
                    <span className="text-muted-foreground">(2024)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">سوق الإعلانات الرقمية:</span>
                    <Link
                      href="https://maaal.com/archives/202505/8-9-مليار-دولار-سوق-الإعلانات-الرقمية-في/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline mr-2"
                    >
                      موقع مال
                    </Link>
                    <span className="text-muted-foreground">(2024-2030)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">سوق المحتوى الرقمي:</span>
                    <Link
                      href="https://aawsat.com/home/article/3114021/نمو-سوق-المحتوى-الرقمي-السعودي-إلى-53-مليار-دولار-في-2030"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline mr-2"
                    >
                      الشرق الأوسط
                    </Link>
                    <span className="text-muted-foreground">(2030 projection)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">سوق خدمات السيو:</span>
                    <Link
                      href="https://umg.digital/أفضل-10-شركات-سيو-في-السعودية/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline mr-2"
                    >
                      UMG Digital
                    </Link>
                    <span className="text-muted-foreground">(تقرير 2024)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">نسبة استخدام الإنترنت:</span>
                    <Link
                      href="https://www.rs4it.sa/أهم-استراتيجيات-السيو/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline mr-2"
                    >
                      RS4IT
                    </Link>
                    <span className="text-muted-foreground">(2024)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">سوق الإعلانات الرقمية - الإمارات:</span>
                    <Link
                      href="https://www.mubasher.info/news/4393394/كم-سيبلغ-حجم-قطاع-الإعلانات-الرقمية-الإماراتي-في-2025/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline mr-2"
                    >
                      مباشر الإخباري
                    </Link>
                    <span className="text-muted-foreground">(2025)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">التحول الرقمي في دول الخليج:</span>
                    <Link
                      href="https://www.erembusiness.com/economy/fqjg7a9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline mr-2"
                    >
                      Erem Business
                    </Link>
                    <span className="text-muted-foreground">(تقرير 2024)</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4">
                جميع البيانات مأخوذة من مصادر رسمية وموثوقة. آخر تحديث: 2024-2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Pricing */}
      <section id="pricing" className="py-16 bg-background scroll-mt-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg ring-2 ring-primary/30">
                09
              </div>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Pricing</span>
            </div>
            <h2 className="text-4xl font-bold text-center mb-4">
              {content.pricing.title}
            </h2>
            <p className="text-center text-xl text-muted-foreground mb-4">
              {content.pricing.description}
            </p>
            <div className="text-center mb-12">
              <Badge className="text-lg px-6 py-2 bg-chart-2 text-white">
                {content.pricing.offer}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.pricing.plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`bg-background shadow-xl border-2 ${plan.popular
                    ? "border-brand-primary scale-105"
                    : "border-border"
                    }`}
                >
                  {plan.popular && (
                    <div className="bg-brand-primary text-white text-center py-2 text-sm font-bold">
                      الأكثر طلباً
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl mb-2">{plan.nameAr}</CardTitle>
                    <div className="mb-4">
                      <div className="text-4xl font-bold text-brand-primary mb-2">
                        {plan.priceAr}
                        <span className="text-lg font-normal text-muted-foreground">
                          {" "}
                          {plan.currency}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">{plan.durationAr}</p>
                    </div>
                    <div className="text-center py-2 bg-secondary rounded-lg">
                      <span className="font-bold text-brand-primary">
                        {plan.articlesPerMonth} مقال شهريًا
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: ROI Comparison */}
      <section id="roi-comparison" className="py-16 bg-background scroll-mt-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg ring-2 ring-primary/30">
                10
              </div>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">ROI Comparison</span>
            </div>
            <h2 className="text-4xl font-bold text-center mb-12 text-brand-primary">
              مقارنة التكلفة والعائد 💰
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-brand-primary text-white">
                    <th className="p-4 text-right">الطريقة</th>
                    <th className="p-4 text-center">التكلفة الشهرية</th>
                    <th className="p-4 text-center">التكلفة السنوية</th>
                    <th className="p-4 text-center">مدة العقد</th>
                    <th className="p-4 text-center">النتائج</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-destructive/10">
                    <td className="p-4 font-bold">وكالة محتوى تقليدية</td>
                    <td className="p-4 text-center text-destructive font-bold">3,000-8,000 ريال</td>
                    <td className="p-4 text-center text-destructive font-bold">36,000-96,000 ريال</td>
                    <td className="p-4 text-center">12 شهر</td>
                    <td className="p-4 text-center">بعد 6-12 شهر</td>
                  </tr>
                  <tr className="border-b bg-chart-4/10">
                    <td className="p-4 font-bold">توظيف كاتب محتوى</td>
                    <td className="p-4 text-center text-chart-4 font-bold">4,000+ ريال</td>
                    <td className="p-4 text-center text-chart-4 font-bold">48,000+ ريال</td>
                    <td className="p-4 text-center">دائم</td>
                    <td className="p-4 text-center">بطيء + إدارة</td>
                  </tr>
                  <tr className="border-b bg-chart-2/10">
                    <td className="p-4 font-bold text-brand-primary">Modonty</td>
                    <td className="p-4 text-center text-chart-2 font-bold">208-833 ريال</td>
                    <td className="p-4 text-center text-chart-2 font-bold">2,499-9,999 ريال</td>
                    <td className="p-4 text-center text-chart-2">18 شهر (بدون التزام)</td>
                    <td className="p-4 text-center text-chart-2">3-6 أشهر</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center bg-gradient-to-r from-chart-2/10 to-chart-2/10 p-8 rounded-xl border-2 border-chart-2/50">
              <p className="text-3xl font-bold text-brand-primary mb-4">
                💡 وفّر حتى 90% من تكاليف المحتوى سنوياً!
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="bg-background p-4 rounded-lg shadow-lg">
                  <div className="text-sm text-muted-foreground mb-2">الوكالة التقليدية</div>
                  <div className="text-2xl font-bold text-destructive">36K-96K ريال/سنة</div>
                  <div className="text-xs text-muted-foreground mt-1">تكلفة عالية جداً!</div>
                </div>
                <div className="bg-background p-4 rounded-lg shadow-lg">
                  <div className="text-sm text-muted-foreground mb-2">كاتب محتوى</div>
                  <div className="text-2xl font-bold text-chart-4">48K+ ريال/سنة</div>
                  <div className="text-xs text-muted-foreground mt-1">+ رواتب + تأمينات</div>
                </div>
                <div className="bg-chart-2/20 p-4 rounded-lg shadow-lg border-2 border-chart-2">
                  <div className="text-sm text-muted-foreground mb-2">Modonty</div>
                  <div className="text-2xl font-bold text-chart-2">2.5K-10K ريال/سنة</div>
                  <div className="text-xs text-chart-2 mt-1">✅ أرخص بـ 90%!</div>
                </div>
              </div>

              <div className="mt-6 bg-background p-4 rounded-lg border border-chart-2/40">
                <p className="text-foreground font-medium">
                  بدون التزامات طويلة، بدون تكاليف خفية، بنتائج قابلة للقياس عبر GTM
                </p>
                <p className="text-chart-2 font-bold mt-2">
                  🎯 توفير يصل إلى 86,000 ريال سنوياً مقارنة بالوكالات!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 11: Timeline to Launch */}
      <section id="timeline" className="py-16 bg-muted scroll-mt-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg ring-2 ring-primary/30">
                11
              </div>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Timeline to Launch</span>
            </div>
            <h2 className="text-4xl font-bold text-center mb-12 text-brand-primary">
              خطة الإطلاق ⏱️
            </h2>

            <div className="space-y-6">
              <div className="bg-secondary p-6 rounded-xl border-r-4 border-brand-primary">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">بناء Authority Blog</h3>
                    <p className="text-foreground">إنشاء المدونة المركزية + نظام النشر + واجهة العميل + نظام GTM للتتبع</p>
                  </div>
                </div>
              </div>

              <div className="bg-chart-2/10 p-6 rounded-xl border-r-4 border-chart-2">
                <div className="flex items-start gap-4">
                  <div className="bg-chart-2 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">إطلاق تجريبي</h3>
                    <p className="text-foreground">10 مشاريع سعودية (تجربة مجانية) + جمع تغذية راجعة + قياس النتائج</p>
                  </div>
                </div>
              </div>

              <div className="bg-chart-4/10 p-6 rounded-xl border-r-4 border-brand-accent">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-accent text-white w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">تحسين وتطوير</h3>
                    <p className="text-foreground">تحسين جودة المحتوى + إضافة أنواع محتوى جديدة + تحسين نظام التتبع</p>
                  </div>
                </div>
              </div>

              <div className="bg-chart-3/10 p-6 rounded-xl border-r-4 border-chart-3">
                <div className="flex items-start gap-4">
                  <div className="bg-chart-3 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">الإطلاق الرسمي</h3>
                    <p className="text-foreground">حملة تسويقية: &quot;محتوى عربي جاهز يبني حضورك بدون صداع SEO&quot; + استهداف أصحاب المتاجر والشركات</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-chart-2/10 p-6 rounded-xl border-2 border-chart-2/50 text-center">
              <p className="text-xl font-bold text-brand-primary mb-2">
                ✅ عملية إطلاق واضحة ومنظمة
              </p>
              <p className="text-foreground">
                من المفهوم للتنفيذ - كل خطوة محددة ومدروسة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 12: Available Positions (Team Structure) */}
      <section id="team-structure" className="py-16 bg-background scroll-mt-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg ring-2 ring-primary/30">
                12
              </div>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Team Structure</span>
            </div>
            <div className="text-center mb-12">
              <Badge className="mb-4 text-lg px-6 py-2 bg-brand-primary text-white">
                هيكل الفريق
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-primary">
                الفريق المطلوب للمشروع
              </h2>
              <p className="text-xl md:text-2xl text-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
                هذه هي الوظائف المطلوبة لتنفيذ مشروع Modonty بنجاح
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                كل دور له أهمية في بناء منظومة Authority Blog وخدمة العملاء
              </p>
            </div>

            <div className="space-y-4">
              {/* Head of Content / SEO Specialist */}
              <details className="bg-background rounded-lg border-2 border-brand-primary overflow-hidden group">
                <summary className="p-4 cursor-pointer hover:bg-secondary transition-colors list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold text-lg text-brand-primary flex-1">Head of Content / SEO Specialist</h3>
                    <svg className="w-5 h-5 text-brand-primary flex-shrink-0 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="p-6 pt-0 border-t border-border bg-muted">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">دورك في منظومة Modonty</h4>
                      <p className="text-sm text-foreground mb-3 leading-relaxed">
                        أنت القائد الاستراتيجي لمحتوى Modonty. دورك الأساسي هو بناء وتقوية المدونة المركزية (Authority Blog) التي تمثل قلب المشروع. أنت المسؤول عن ضمان أن كل مقال يُنشر يقوي المدونة ويساعد العملاء في نفس الوقت.
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">
                        في منظومة العمل: أنت تتلقى خطة المحتوى الشهرية من فريق التسويق، وتوزعها على فريق الكتاب، وتتأكد من أن كل مقال رئيسي يحتوي على Mentions وروابط للعملاء، ثم تشرف على إنشاء النسخ المخصصة لكل عميل.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">كيف تساهم في نجاح المشروع؟</h4>
                      <ul className="list-disc list-inside space-y-2 text-sm text-foreground mr-4">
                        <li><strong>بناء سلطة المحتوى:</strong> كل مقال جديد يقوي المدونة المركزية، وكلما قويت المدونة، زادت قوة الروابط والزيارات للعملاء</li>
                        <li><strong>ضمان الجودة:</strong> أنت المسؤول عن أن كل مقال يلبي معايير SEO دون أن نستخدم مصطلحات تقنية مع العملاء - نحن نبيع "حضور" وليس "SEO"</li>
                        <li><strong>قيادة الفريق:</strong> إدارة فريق الكتاب والمحررين لضمان تسليم محتوى شهري مستمر لمدة 18 شهر لكل عميل</li>
                        <li><strong>مراقبة الأداء:</strong> متابعة أداء المحتوى عبر GTM و Analytics لضمان أن العملاء يرون نتائج حقيقية في حساباتهم</li>
                        <li><strong>تحسين مستمر:</strong> تحليل ما ينجح وما لا ينجح، وتحسين استراتيجية المحتوى بناءً على البيانات</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">تكاملك مع الفريق</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-foreground mr-4">
                        <li>تعمل مع <strong>فريق التسويق</strong> لتحديد المواضيع التي تجذب العملاء</li>
                        <li>تدير <strong>فريق الكتاب</strong> لكتابة المقالات الرئيسية والنسخ المخصصة</li>
                        <li>تنسق مع <strong>فريق التطوير</strong> لضمان أن نظام GTM يعمل بشكل صحيح</li>
                        <li>تقدم تقارير لـ <strong>فريق الإدارة</strong> عن أداء المحتوى ونتائج العملاء</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">الأثر المتوقع من دورك</h4>
                      <div className="bg-chart-2/10 p-4 rounded-lg border border-chart-2/30">
                        <ul className="space-y-1 text-sm text-foreground">
                          <li>✓ المدونة المركزية تتصدر نتائج البحث في Google</li>
                          <li>✓ العملاء يحصلون على زيارات حقيقية من المقالات</li>
                          <li>✓ معدل تجديد الاشتراكات يزيد لأن العملاء يرون نتائج</li>
                          <li>✓ Modonty تصبح المرجع الأول للمحتوى العربي الاحترافي</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </details>

              {/* Head of Marketing */}
              <details className="bg-background rounded-lg border-2 border-brand-primary overflow-hidden group">
                <summary className="p-4 cursor-pointer hover:bg-secondary transition-colors list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold text-lg text-brand-primary flex-1">Head of Marketing</h3>
                    <svg className="w-5 h-5 text-brand-primary flex-shrink-0 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="p-6 pt-0 border-t border-border bg-muted">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">دورك في منظومة Modonty</h4>
                      <p className="text-sm text-foreground mb-3 leading-relaxed">
                        أنت المسؤول عن جعل Modonty معروفة في السوق السعودي والخليجي. دورك هو بناء العلامة التجارية ووضع Modonty كرائد في مجال Authority Blog والمحتوى العربي الاحترافي.
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">
                        في منظومة العمل: أنت تبني استراتيجية التسويق التي تجذب العملاء المحتملين (أصحاب المتاجر، العيادات، الشركات)، وتعمل مع فريق المبيعات لتحويلهم لعملاء، وتتابع مع فريق المحتوى لضمان أن الرسالة التسويقية تتماشى مع ما نقدمه.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">كيف تساهم في نجاح المشروع؟</h4>
                      <ul className="list-disc list-inside space-y-2 text-sm text-foreground mr-4">
                        <li><strong>بناء الوعي بالعلامة التجارية:</strong> جعل Modonty معروفة كحل فريد للمحتوى العربي - ليس مجرد "خدمة كتابة مقالات" بل "منظومة محتوى تبني حضورك"</li>
                        <li><strong>جذب العملاء المحتملين:</strong> إدارة حملات Google Ads و Meta Ads التي تستهدف أصحاب المتاجر والشركات التي تحتاج محتوى</li>
                        <li><strong>بناء الشراكات:</strong> إنشاء شراكات مع منصات التجارة الإلكترونية (Salla, Zid, Shopify) لتوصيل Modonty لأصحاب المتاجر</li>
                        <li><strong>تحسين معدلات التحويل:</strong> تحليل أداء الحملات وتحسين الرسائل التسويقية لزيادة عدد العملاء الذين يسجلون</li>
                        <li><strong>بناء المجتمع:</strong> إنشاء محتوى تسويقي وبناء مجتمع حول Modonty عبر وسائل التواصل الاجتماعي</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">تكاملك مع الفريق</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-foreground mr-4">
                        <li>تعمل مع <strong>فريق المبيعات</strong> لتزويدهم بعملاء محتملين جاهزين</li>
                        <li>تنسق مع <strong>فريق المحتوى</strong> لضمان أن الرسالة التسويقية تتماشى مع ما نقدمه</li>
                        <li>تقدم تقارير لـ <strong>فريق الإدارة</strong> عن أداء الحملات ومعدلات التحويل</li>
                        <li>تعمل مع <strong>فريق التطوير</strong> لتحسين تجربة التسجيل والاشتراك</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">الأثر المتوقع من دورك</h4>
                      <div className="bg-chart-2/10 p-4 rounded-lg border border-chart-2/30">
                        <ul className="space-y-1 text-sm text-foreground">
                          <li>✓ Modonty تصبح معروفة في السوق السعودي والخليجي</li>
                          <li>✓ تدفق مستمر من العملاء المحتملين الجاهزين للاشتراك</li>
                          <li>✓ معدل تحويل عالي من الزوار إلى عملاء</li>
                          <li>✓ نمو مستمر في عدد المشتركين شهرياً</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </details>

              {/* React Native Developer */}
              <details className="bg-background rounded-lg border-2 border-brand-primary overflow-hidden group">
                <summary className="p-4 cursor-pointer hover:bg-secondary transition-colors list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold text-lg text-brand-primary flex-1">React Native Developer</h3>
                    <svg className="w-5 h-5 text-brand-primary flex-shrink-0 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="p-6 pt-0 border-t border-border bg-muted">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">دورك في منظومة Modonty</h4>
                      <p className="text-sm text-foreground mb-3 leading-relaxed">
                        أنت المسؤول عن بناء تطبيق موبايل للعملاء لمتابعة مقالاتهم وأداء محتواهم. التطبيق هو النافذة التي يرى من خلالها العملاء قيمة ما يحصلون عليه من Modonty.
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">
                        في منظومة العمل: التطبيق يتصل بـ APIs المنصة لعرض المقالات الجديدة، إحصائيات الأداء من GTM، وإشعارات عند نشر مقال جديد. أنت تبني تجربة تجعل العملاء يشعرون بالثقة في Modonty ويرون النتائج الحقيقية.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">كيف تساهم في نجاح المشروع؟</h4>
                      <ul className="list-disc list-inside space-y-2 text-sm text-foreground mr-4">
                        <li><strong>تجربة عملاء ممتازة:</strong> تطبيق سهل الاستخدام يجعل العملاء يتابعون مقالاتهم بسهولة ويرون إحصائيات الأداء</li>
                        <li><strong>الشفافية:</strong> عرض إحصائيات GTM و Analytics داخل التطبيق يجعل العملاء يرون النتائج الحقيقية - هذا يبني الثقة ويزيد معدل التجديد</li>
                        <li><strong>الاشعارات:</strong> إشعارات عند نشر مقال جديد تجعل العملاء يشعرون بالقيمة المستمرة من Modonty</li>
                        <li><strong>دعم RTL:</strong> تطبيق يدعم العربية بشكل كامل (من اليمين لليسار) يعطي انطباع احترافي</li>
                        <li><strong>سهولة الوصول:</strong> تطبيق موبايل يجعل العملاء يتابعون Modonty من أي مكان</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">تكاملك مع الفريق</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-foreground mr-4">
                        <li>تعمل مع <strong>فريق Backend</strong> لبناء APIs التي يحتاجها التطبيق</li>
                        <li>تنسق مع <strong>فريق المحتوى</strong> لعرض المقالات بشكل جذاب</li>
                        <li>تعمل مع <strong>فريق التصميم</strong> لتنفيذ واجهات جذابة وسهلة الاستخدام</li>
                        <li>تقدم تقارير لـ <strong>فريق الإدارة</strong> عن استخدام التطبيق ورضا العملاء</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">الأثر المتوقع من دورك</h4>
                      <div className="bg-chart-2/10 p-4 rounded-lg border border-chart-2/30">
                        <ul className="space-y-1 text-sm text-foreground">
                          <li>✓ العملاء يتابعون مقالاتهم بسهولة ويرون النتائج</li>
                          <li>✓ زيادة معدل التجديد لأن العملاء يرون القيمة المستمرة</li>
                          <li>✓ انطباع احترافي يعزز ثقة العملاء في Modonty</li>
                          <li>✓ سهولة الوصول تجعل العملاء أكثر تفاعلاً مع المنصة</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </details>

              {/* UI/UX Designer */}
              <details className="bg-background rounded-lg border-2 border-border overflow-hidden group">
                <summary className="p-4 cursor-pointer hover:bg-muted transition-colors list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold text-lg text-foreground flex-1">UI/UX Designer</h3>
                    <svg className="w-5 h-5 text-foreground flex-shrink-0 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="p-6 pt-0 border-t border-border bg-muted">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">دورك في منظومة Modonty</h4>
                      <p className="text-sm text-foreground mb-3 leading-relaxed">
                        أنت المسؤول عن تجربة المستخدم في كل ما يراه العملاء. تصميمك هو الانطباع الأول الذي يأخذه العملاء عن Modonty - يجب أن يعكس الاحترافية والجودة.
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">
                        في منظومة العمل: أنت تصمم واجهة المدونة المركزية (Authority Blog) التي يراها الجمهور، ولوحة تحكم العملاء التي يتابعون فيها مقالاتهم، وتطبيق الموبايل. كل تصميم يجب أن يكون سهل الاستخدام ويعكس قيمة Modonty.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">كيف تساهم في نجاح المشروع؟</h4>
                      <ul className="list-disc list-inside space-y-2 text-sm text-foreground mr-4">
                        <li><strong>تجربة مستخدم ممتازة:</strong> تصميم سهل الاستخدام يجعل العملاء يشعرون بالراحة والثقة في Modonty</li>
                        <li><strong>الانطباع الأول:</strong> تصميم احترافي للمدونة المركزية يعطي انطباع قوي عن جودة Modonty</li>
                        <li><strong>سهولة المتابعة:</strong> لوحة تحكم واضحة تجعل العملاء يتابعون مقالاتهم وإحصائياتهم بسهولة</li>
                        <li><strong>دعم العربية:</strong> تصميم RTL كامل يعطي انطباع أن Modonty مصممة للعرب</li>
                        <li><strong>التسجيل والدفع:</strong> تجربة سلسة لعملية الاشتراك تزيد معدل التحويل</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">تكاملك مع الفريق</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-foreground mr-4">
                        <li>تعمل مع <strong>فريق التطوير</strong> لضمان تنفيذ التصاميم بدقة</li>
                        <li>تنسق مع <strong>فريق المحتوى</strong> لعرض المقالات بشكل جذاب</li>
                        <li>تعمل مع <strong>فريق التسويق</strong> لضمان أن التصميم يتماشى مع العلامة التجارية</li>
                        <li>تقدم <strong>Prototypes</strong> للفريق لاختبار الأفكار قبل التنفيذ</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">الأثر المتوقع من دورك</h4>
                      <div className="bg-chart-2/10 p-4 rounded-lg border border-chart-2/30">
                        <ul className="space-y-1 text-sm text-foreground">
                          <li>✓ انطباع احترافي قوي يعزز ثقة العملاء</li>
                          <li>✓ سهولة الاستخدام تزيد رضا العملاء</li>
                          <li>✓ تجربة سلسة تزيد معدل التحويل من الزوار إلى عملاء</li>
                          <li>✓ تصميم متسق يعزز العلامة التجارية</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </details>

              {/* Content Writers */}
              <details className="bg-background rounded-lg border-2 border-brand-primary overflow-hidden group">
                <summary className="p-4 cursor-pointer hover:bg-secondary transition-colors list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold text-lg text-brand-primary flex-1">Content Writers</h3>
                    <svg className="w-5 h-5 text-brand-primary flex-shrink-0 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="p-6 pt-0 border-t border-border bg-muted">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">دورك في منظومة Modonty</h4>
                      <p className="text-sm text-foreground mb-3 leading-relaxed">
                        أنت قلب المحتوى في Modonty. دورك هو كتابة المقالات التي تبني المدونة المركزية وتخدم العملاء. كل مقال تكتبه يقوي المدونة ويساعد عميل في نفس الوقت.
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">
                        في منظومة العمل: أنت تتلقى مواضيع من Head of Content، تكتب مقال رئيسي للمدونة المركزية يحتوي على Mentions وروابط للعملاء، ثم تنشئ نسخة مخصصة لكل عميل مع ذكر اسمه وخدماته. كل عميل يحصل على نسخة فريدة جاهزة للنشر في موقعه.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">كيف تساهم في نجاح المشروع؟</h4>
                      <ul className="list-disc list-inside space-y-2 text-sm text-foreground mr-4">
                        <li><strong>بناء المدونة المركزية:</strong> كل مقال تكتبه يقوي Authority Blog ويزيد ترتيبها في Google - هذا يفيد جميع العملاء</li>
                        <li><strong>خدمة العملاء:</strong> النسخ المخصصة التي تنشئها تجعل كل عميل يشعر أن المحتوى مكتوب خصيصاً له</li>
                        <li><strong>محتوى عربي أصيل:</strong> كتابة بأسلوب طبيعي (ليس ترجمة أو AI) تعطي قيمة حقيقية للعملاء</li>
                        <li><strong>SEO بدون تعقيد:</strong> كتابة محتوى صديق لمحركات البحث دون استخدام مصطلحات تقنية - نحن نبيع "حضور" وليس "SEO"</li>
                        <li><strong>الاستمرارية:</strong> التزام بجداول النشر الشهرية يضمن أن العملاء يحصلون على محتوى مستمر لمدة 18 شهر</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">تكاملك مع الفريق</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-foreground mr-4">
                        <li>تعمل تحت إشراف <strong>Head of Content</strong> الذي يحدد المواضيع والاستراتيجية</li>
                        <li>تتعاون مع <strong>المحرر</strong> لضمان جودة المحتوى قبل النشر</li>
                        <li>تنسق مع <strong>فريق المبيعات</strong> لفهم احتياجات العملاء وتخصيص المحتوى لهم</li>
                        <li>تقدم مقالاتك لـ <strong>فريق التطوير</strong> للنشر في المدونة المركزية</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">الأثر المتوقع من دورك</h4>
                      <div className="bg-chart-2/10 p-4 rounded-lg border border-chart-2/30">
                        <ul className="space-y-1 text-sm text-foreground">
                          <li>✓ المدونة المركزية تنمو وتقوى مع كل مقال جديد</li>
                          <li>✓ العملاء يحصلون على محتوى جاهز للنشر شهرياً</li>
                          <li>✓ العملاء يشعرون بالقيمة لأن المحتوى مخصص لهم</li>
                          <li>✓ معدل التجديد يزيد لأن العملاء راضون عن المحتوى</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-secondary p-3 rounded-lg border border-primary/20">
                      <p className="text-sm text-foreground">
                        <strong>ملاحظة:</strong> نفضل المرشحين من مصر (فرع الإسكندرية) للعمل عن بُعد
                      </p>
                    </div>
                  </div>
                </div>
              </details>

              {/* Sales Representative - Field */}
              <details className="bg-background rounded-lg border-2 border-brand-primary overflow-hidden group">
                <summary className="p-4 cursor-pointer hover:bg-secondary transition-colors list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold text-lg text-brand-primary flex-1">ممثل مبيعات - ميداني</h3>
                    <svg className="w-5 h-5 text-brand-primary flex-shrink-0 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="p-6 pt-0 border-t border-border bg-muted">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">دورك في منظومة Modonty</h4>
                      <p className="text-sm text-foreground mb-3 leading-relaxed">
                        أنت المسؤول عن جلب العملاء الجدد من خلال اللقاءات المباشرة. دورك هو مقابلة أصحاب المتاجر والشركات وجهاً لوجه، وشرح قيمة Modonty، وإقناعهم بالاشتراك.
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">
                        في منظومة العمل: أنت تتلقى عملاء محتملين من فريق التسويق وفريق المبيعات الهاتفية، تلتقي بهم شخصياً، تشرح لهم كيف تعمل Modonty ومزايا Authority Blog، وتغلق الصفقة. كل عميل جديد تضيفه يساهم في نمو Modonty.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">كيف تساهم في نجاح المشروع؟</h4>
                      <ul className="list-disc list-inside space-y-2 text-sm text-foreground mr-4">
                        <li><strong>جلب العملاء:</strong> كل عميل جديد تضيفه يساهم في نمو Modonty وزيادة الإيرادات</li>
                        <li><strong>الشرح المباشر:</strong> اللقاءات المباشرة تتيح لك شرح قيمة Modonty بشكل أفضل من الهاتف - هذا يزيد معدل التحويل</li>
                        <li><strong>بناء العلاقات:</strong> العلاقات الشخصية القوية تجعل العملاء يثقون في Modonty ويرغبون في التجديد</li>
                        <li><strong>فهم الاحتياجات:</strong> اللقاءات المباشرة تساعدك على فهم احتياجات العملاء وتخصيص العرض لهم</li>
                        <li><strong>الإغلاق:</strong> مهاراتك في الإقناع والتفاوض تساعد في إغلاق الصفقات وتحقيق الأهداف الشهرية</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">تكاملك مع الفريق</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-foreground mr-4">
                        <li>تتعاون مع <strong>فريق التسويق</strong> للحصول على عملاء محتملين جاهزين</li>
                        <li>تعمل مع <strong>فريق المبيعات الهاتفية</strong> لتحويل العملاء المحتملين إلى لقاءات</li>
                        <li>تنسق مع <strong>فريق المحتوى</strong> لفهم ما يمكن أن تقدمه Modonty للعملاء</li>
                        <li>تقدم تقارير لـ <strong>فريق الإدارة</strong> عن الصفقات المغلقة والأهداف المحققة</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">الأثر المتوقع من دورك</h4>
                      <div className="bg-chart-2/10 p-4 rounded-lg border border-chart-2/30">
                        <ul className="space-y-1 text-sm text-foreground">
                          <li>✓ نمو مستمر في عدد العملاء المشتركين</li>
                          <li>✓ زيادة الإيرادات الشهرية والسنوية</li>
                          <li>✓ علاقات قوية مع العملاء تزيد معدل التجديد</li>
                          <li>✓ تحقيق أهداف المبيعات الشهرية</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </details>

              {/* Sales Representative - Phone */}
              <details className="bg-background rounded-lg border-2 border-brand-primary overflow-hidden group">
                <summary className="p-4 cursor-pointer hover:bg-secondary transition-colors list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold text-lg text-brand-primary flex-1">ممثل مبيعات - هاتفي</h3>
                    <svg className="w-5 h-5 text-brand-primary flex-shrink-0 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="p-6 pt-0 border-t border-border bg-muted">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">دورك في منظومة Modonty</h4>
                      <p className="text-sm text-foreground mb-3 leading-relaxed">
                        أنت المسؤول عن جلب العملاء المحتملين من خلال المكالمات الهاتفية. دورك هو إجراء مكالمات باردة (Cold Calls)، تأهيل العملاء المحتملين، وشرح قيمة Modonty عبر الهاتف.
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">
                        في منظومة العمل: أنت تجري مكالمات لأصحاب المتاجر والشركات، تشرح لهم كيف تعمل Modonty، وتؤهلهم للقاءات مع فريق المبيعات الميداني أو للاشتراك مباشرة. كل عميل محتمل تجلبه يساهم في نمو Modonty.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">كيف تساهم في نجاح المشروع؟</h4>
                      <ul className="list-disc list-inside space-y-2 text-sm text-foreground mr-4">
                        <li><strong>جلب العملاء المحتملين:</strong> المكالمات الهاتفية تتيح لك الوصول لعدد كبير من العملاء المحتملين بسرعة</li>
                        <li><strong>التأهيل:</strong> تأهيل العملاء المحتملين عبر الهاتف يضمن أن فريق المبيعات الميداني يلتقي بعملاء جاهزين</li>
                        <li><strong>الشرح السريع:</strong> شرح قيمة Modonty عبر الهاتف يجعل العملاء يفهمون الفكرة بسرعة</li>
                        <li><strong>الإغلاق المباشر:</strong> بعض العملاء يمكن إقناعهم بالاشتراك مباشرة عبر الهاتف</li>
                        <li><strong>المتابعة:</strong> متابعة العملاء المحتملين عبر المكالمات والإيميلات تزيد معدل التحويل</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">تكاملك مع الفريق</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-foreground mr-4">
                        <li>تعمل مع <strong>فريق التسويق</strong> للحصول على قوائم العملاء المحتملين</li>
                        <li>تنسق مع <strong>فريق المبيعات الميداني</strong> لتحويل العملاء المحتملين إلى لقاءات</li>
                        <li>تقدم تقارير لـ <strong>فريق الإدارة</strong> عن عدد المكالمات والعملاء المحتملين</li>
                        <li>تستخدم <strong>CRM</strong> لتسجيل جميع المكالمات والتفاعلات</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-2">الأثر المتوقع من دورك</h4>
                      <div className="bg-chart-2/10 p-4 rounded-lg border border-chart-2/30">
                        <ul className="space-y-1 text-sm text-foreground">
                          <li>✓ تدفق مستمر من العملاء المحتملين الجاهزين</li>
                          <li>✓ زيادة عدد المكالمات والعملاء المحتملين يومياً</li>
                          <li>✓ دعم فريق المبيعات الميداني بعملاء جاهزين</li>
                          <li>✓ نمو في عدد العملاء المشتركين</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Section 13: Financial KPIs & Metrics */}
      <section id="financial-kpis" className="py-16 bg-muted scroll-mt-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg ring-2 ring-primary/30">
                13
              </div>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Financial KPIs</span>
            </div>
            <div className="text-center mb-12">
              <Badge className="mb-4 text-lg px-6 py-2 bg-brand-primary text-white">
                التحليل المالي الشامل
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-primary">
                مؤشرات النجاح المالية (KPIs) 📊
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                تحليل شامل للنموذج المالي والاقتصاد الوحدوي لمشروع Modonty
              </p>
            </div>

            {/* Executive Summary */}
            <div className="bg-brand-primary text-white p-8 rounded-2xl shadow-xl mb-8">
              <h3 className="text-2xl font-bold mb-6 text-center">الملخص التنفيذي المالي</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">500</div>
                  <div className="text-sm opacity-90">عميل (الهدف بنهاية السنة)</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">2.38M</div>
                  <div className="text-sm opacity-90">ريال (الإيراد السنوي المتوقع)</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">3.2:1</div>
                  <div className="text-sm opacity-90">نسبة LTV:CAC المستهدفة</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">≥ 80%</div>
                  <div className="text-sm opacity-90">معدل التجديد المستهدف</div>
                </div>
              </div>
            </div>

            {/* Revenue Projections */}
            <div className="bg-background rounded-2xl shadow-xl border-2 border-brand-primary p-8 mb-8">
              <h3 className="text-2xl font-bold text-brand-primary mb-6 text-center">التوقعات المالية - سيناريوهات النمو</h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-brand-primary text-white">
                      <th className="p-4 text-right">المؤشر</th>
                      <th className="p-4 text-center">6 أشهر</th>
                      <th className="p-4 text-center">12 شهر (نهاية السنة)</th>
                      <th className="p-4 text-center">18 شهر</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">عدد العملاء</td>
                      <td className="p-4 text-center">100</td>
                      <td className="p-4 text-center text-chart-2 font-bold">500</td>
                      <td className="p-4 text-center">800</td>
                    </tr>
                    <tr className="border-b bg-muted">
                      <td className="p-4 font-semibold">الإيراد السنوي (ARR)</td>
                      <td className="p-4 text-center">475,000 ريال</td>
                      <td className="p-4 text-center text-chart-2 font-bold">2,375,000 ريال</td>
                      <td className="p-4 text-center">3,800,000 ريال</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">الإيراد الشهري (MRR)</td>
                      <td className="p-4 text-center">39,583 ريال</td>
                      <td className="p-4 text-center text-chart-2 font-bold">197,917 ريال</td>
                      <td className="p-4 text-center">316,667 ريال</td>
                    </tr>
                    <tr className="border-b bg-muted">
                      <td className="p-4 font-semibold">التكاليف الشهرية</td>
                      <td className="p-4 text-center">26,750 ريال</td>
                      <td className="p-4 text-center">26,750 ريال</td>
                      <td className="p-4 text-center">26,750 ريال</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">الربح الشهري</td>
                      <td className="p-4 text-center text-chart-2">+12,833 ريال</td>
                      <td className="p-4 text-center text-chart-2 font-bold">+171,167 ريال</td>
                      <td className="p-4 text-center text-chart-2">+289,917 ريال</td>
                    </tr>
                    <tr className="bg-chart-2/10">
                      <td className="p-4 font-semibold">الربح التراكمي</td>
                      <td className="p-4 text-center text-chart-2">+77,000 ريال</td>
                      <td className="p-4 text-center text-chart-2 font-bold">+1,054,000 ريال</td>
                      <td className="p-4 text-center text-chart-2">+2,219,000 ريال</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Unit Economics */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-background rounded-2xl shadow-xl border-2 border-chart-2/50 p-6">
                <h3 className="text-xl font-bold text-brand-primary mb-4 flex items-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  الاقتصاد الوحدوي (Unit Economics)
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                    <span className="font-semibold">متوسط الإيراد للعميل (ARPU)</span>
                    <span className="font-bold text-brand-primary">4,750 ريال/سنة</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-chart-2/10 rounded-lg">
                    <span className="font-semibold">القيمة الدائمة (LTV)</span>
                    <span className="font-bold text-chart-2">15,200 ريال</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-chart-4/10 rounded-lg">
                    <span className="font-semibold">تكلفة اكتساب العميل (CAC)</span>
                    <span className="font-bold text-chart-4">4,750 ريال</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-chart-3/10 rounded-lg border-2 border-chart-3/50">
                    <span className="font-semibold">نسبة LTV:CAC</span>
                    <span className="font-bold text-chart-3 text-xl">3.2:1</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-semibold">فترة الاسترداد</span>
                    <span className="font-bold text-foreground">12 شهر</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-chart-2/20 rounded-lg border border-chart-2/50">
                  <p className="text-sm text-chart-2">
                    <strong>✓ صحي:</strong> نسبة LTV:CAC أعلى من 3:1 تعني نموذج أعمال مستدام
                  </p>
                </div>
              </div>

              <div className="bg-background rounded-2xl shadow-xl border-2 border-brand-primary p-6">
                <h3 className="text-xl font-bold text-brand-primary mb-4 flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  مؤشرات الأداء التشغيلي
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                    <span className="font-semibold">معدل التجديد (Renewal Rate)</span>
                    <span className="font-bold text-brand-primary">≥ 80%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-destructive/10 rounded-lg">
                    <span className="font-semibold">معدل الفقدان (Churn Rate)</span>
                    <span className="font-bold text-destructive">≤ 5% شهرياً</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-chart-2/10 rounded-lg">
                    <span className="font-semibold">متوسط مدة الاشتراك</span>
                    <span className="font-bold text-chart-2">18 شهر</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-chart-4/10 rounded-lg">
                    <span className="font-semibold">التكلفة لكل مقال</span>
                    <span className="font-bold text-chart-4">~335 ريال</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-chart-3/10 rounded-lg">
                    <span className="font-semibold">الإيراد لكل موظف</span>
                    <span className="font-bold text-chart-3">~17,750 ريال/شهر</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-secondary rounded-lg border border-primary/50">
                  <p className="text-sm text-primary">
                    <strong>💡 ملاحظة:</strong> معدل الفقدان المنخفض ({'<5%'}) يضمن نمو مستدام
                  </p>
                </div>
              </div>
            </div>

            {/* Break-Even Analysis */}
            <div className="bg-background rounded-2xl shadow-xl border-2 border-brand-primary p-8 mb-8">
              <h3 className="text-2xl font-bold text-brand-primary mb-6 text-center">تحليل نقطة التعادل</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-muted p-6 rounded-xl border-2 border-border">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-brand-primary mb-2">50</div>
                    <div className="font-semibold mb-2">عميل (نقطة التعادل)</div>
                    <p className="text-sm text-foreground">الحد الأدنى للعملاء لتحقيق التعادل</p>
                  </div>
                </div>
                <div className="bg-muted p-6 rounded-xl border-2 border-border">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-brand-primary mb-2">4-6</div>
                    <div className="font-semibold mb-2">أشهر</div>
                    <p className="text-sm text-foreground">الوقت المتوقع للوصول لنقطة التعادل</p>
                  </div>
                </div>
                <div className="bg-muted p-6 rounded-xl border-2 border-border">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-brand-primary mb-2">237,500</div>
                    <div className="font-semibold mb-2">ريال/سنة</div>
                    <p className="text-sm text-foreground">الإيراد السنوي عند نقطة التعادل</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-chart-4/10 rounded-lg border border-chart-4/50">
                <p className="text-sm text-foreground">
                  <strong>📊 الحساب:</strong> التكاليف الشهرية (26,750 ريال) ÷ متوسط الإيراد الشهري للعميل (395 ريال) = 67.7 عميل شهرياً، لكن مع الدفع السنوي المقدم، نقطة التعادل تتحقق عند 50 عميل
                </p>
              </div>
            </div>

            {/* Growth Projections */}
            <div className="bg-background rounded-2xl shadow-xl border-2 border-brand-primary p-8 mb-8">
              <h3 className="text-2xl font-bold text-brand-primary mb-6 text-center">خطة النمو - من 0 إلى 500 عميل</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-brand-primary text-white">
                      <th className="p-4 text-right">الفترة</th>
                      <th className="p-4 text-center">الشهر 3</th>
                      <th className="p-4 text-center">الشهر 6</th>
                      <th className="p-4 text-center">الشهر 12 (الهدف)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">عدد العملاء</td>
                      <td className="p-4 text-center">50</td>
                      <td className="p-4 text-center">100</td>
                      <td className="p-4 text-center text-chart-2 font-bold">500</td>
                    </tr>
                    <tr className="border-b bg-muted">
                      <td className="p-4 font-semibold">الإيراد التراكمي</td>
                      <td className="p-4 text-center">237,500 ريال</td>
                      <td className="p-4 text-center">475,000 ريال</td>
                      <td className="p-4 text-center text-chart-2 font-bold">2,375,000 ريال</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">التكاليف التراكمية</td>
                      <td className="p-4 text-center">80,250 ريال</td>
                      <td className="p-4 text-center">160,500 ريال</td>
                      <td className="p-4 text-center">321,000 ريال</td>
                    </tr>
                    <tr className="border-b bg-chart-2/10">
                      <td className="p-4 font-semibold">الربح التراكمي</td>
                      <td className="p-4 text-center text-chart-2">+157,250 ريال</td>
                      <td className="p-4 text-center text-chart-2">+314,500 ريال</td>
                      <td className="p-4 text-center text-chart-2 font-bold">+2,054,000 ريال</td>
                    </tr>
                    <tr className="bg-secondary">
                      <td className="p-4 font-semibold">معدل النمو الشهري</td>
                      <td className="p-4 text-center">~17 عميل/شهر</td>
                      <td className="p-4 text-center">~17 عميل/شهر</td>
                      <td className="p-4 text-center text-chart-2 font-bold">~42 عميل/شهر</td>
                    </tr>
                    <tr className="border-t-2 border-brand-primary">
                      <td className="p-4 font-semibold">الربح الشهري</td>
                      <td className="p-4 text-center text-chart-2">+12,833 ريال</td>
                      <td className="p-4 text-center text-chart-2">+12,833 ريال</td>
                      <td className="p-4 text-center text-chart-2 font-bold">+171,167 ريال</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-chart-4/10 rounded-lg border border-chart-4/50">
                <p className="text-sm text-foreground">
                  <strong>📊 ملاحظة:</strong> للوصول إلى 500 عميل بنهاية السنة، نحتاج معدل نمو متوسط ~42 عميل شهرياً بعد الشهر السادس (عندما نصل لـ 100 عميل)
                </p>
              </div>
            </div>

            {/* Key Financial Ratios */}
            <div className="bg-background rounded-2xl shadow-xl border-2 border-chart-3/50 p-8">
              <h3 className="text-2xl font-bold text-brand-primary mb-6 text-center">النسب المالية الرئيسية</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg border border-border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">هامش الربح الإجمالي</span>
                      <span className="font-bold text-brand-primary text-xl">~85%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">(الإيرادات - التكاليف المتغيرة) / الإيرادات</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg border border-border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">هامش الربح التشغيلي (الشهر 12)</span>
                      <span className="font-bold text-brand-primary text-xl">~66%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">(الإيرادات - التكاليف) / الإيرادات</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg border border-border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Rule of 40</span>
                      <span className="font-bold text-brand-primary text-xl">{'> 40'}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">(معدل النمو + هامش الربح) - مؤشر صحة SaaS</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg border border-border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Burn Multiple</span>
                      <span className="font-bold text-brand-primary text-xl">{'< 1.0'}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">(التكاليف / النمو) - كفاءة الإنفاق</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg border border-border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Magic Number</span>
                      <span className="font-bold text-brand-primary text-xl">{'> 0.75'}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">كفاءة التسويق والمبيعات</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg border border-border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">CAC Payback Period</span>
                      <span className="font-bold text-brand-primary text-xl">12 شهر</span>
                    </div>
                    <p className="text-xs text-muted-foreground">الوقت لاسترداد تكلفة اكتساب العميل</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 14: Cost Breakdown Summary */}
      <section id="cost-breakdown" className="py-16 bg-background scroll-mt-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg ring-2 ring-primary/30">
                14
              </div>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Cost Breakdown</span>
            </div>
            <h2 className="text-4xl font-bold text-center mb-4 text-brand-primary">
              التكاليف التشغيلية 💵
            </h2>
            <p className="text-center text-xl text-muted-foreground mb-8">
              ملخص التكاليف الشهرية
            </p>

            <div className="bg-background rounded-2xl shadow-xl border-2 border-brand-primary p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-6 bg-muted rounded-xl">
                  <div className="text-4xl font-bold text-brand-primary mb-2">26,750</div>
                  <div className="text-sm text-muted-foreground">ريال/شهر</div>
                  <div className="text-xs text-muted-foreground mt-1">إجمالي التكاليف</div>
                </div>
                <div className="text-center p-6 bg-muted rounded-xl">
                  <div className="text-4xl font-bold text-chart-2 mb-2">50</div>
                  <div className="text-sm text-muted-foreground">عميل</div>
                  <div className="text-xs text-muted-foreground mt-1">نقطة التعادل</div>
                </div>
                <div className="text-center p-6 bg-muted rounded-xl">
                  <div className="text-4xl font-bold text-primary mb-2">3</div>
                  <div className="text-sm text-muted-foreground">فئات رئيسية</div>
                  <div className="text-xs text-muted-foreground mt-1">تقنية، فريق، تسويق</div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-secondary rounded-lg border border-primary/20">
                  <div className="font-semibold text-brand-primary mb-1">💻 تقنية</div>
                  <div className="text-sm text-muted-foreground">450 ريال/شهر</div>
                </div>
                <div className="p-4 bg-chart-2/10 rounded-lg border border-chart-2/30">
                  <div className="font-semibold text-brand-primary mb-1">👥 الفريق</div>
                  <div className="text-sm text-muted-foreground">23,300 ريال/شهر</div>
                </div>
                <div className="p-4 bg-chart-4/10 rounded-lg border border-chart-4/30">
                  <div className="font-semibold text-brand-primary mb-1">📢 تسويق</div>
                  <div className="text-sm text-muted-foreground">3,000 ريال/شهر</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 15: Competitive Advantages */}
      <section id="competitive-advantages" className="py-16 bg-muted scroll-mt-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg ring-2 ring-primary/30">
                15
              </div>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Competitive Advantages</span>
            </div>
            <h2 className="text-4xl font-bold text-center mb-12 text-brand-primary">
              المزايا التنافسية 🏆
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background p-6 rounded-xl shadow-lg border-2 border-brand-primary">
                <h3 className="font-bold text-xl mb-4 text-brand-primary">✓ Authority Blog فريد</h3>
                <p className="text-foreground">مدونة مركزية قوية تخدم جميع العملاء - نموذج لا يوجد في السوق</p>
              </div>

              <div className="bg-background p-6 rounded-xl shadow-lg border-2 border-brand-primary">
                <h3 className="font-bold text-xl mb-4 text-brand-primary">✓ 18 شهر محتوى</h3>
                <p className="text-foreground">تدفع 12 شهر وتحصل على 18 شهر - نؤمن بالنتائج طويلة الأمد</p>
              </div>

              <div className="bg-background p-6 rounded-xl shadow-lg border-2 border-brand-primary">
                <h3 className="font-bold text-xl mb-4 text-brand-primary">✓ شفافية كاملة</h3>
                <p className="text-foreground">تتبع عبر GTM - ترى النتائج في حسابك الخاص، لا وعود نظرية</p>
              </div>

              <div className="bg-background p-6 rounded-xl shadow-lg border-2 border-brand-primary">
                <h3 className="font-bold text-xl mb-4 text-brand-primary">✓ محتوى عربي أصيل</h3>
                <p className="text-foreground">مكتوب يدوياً بأسلوب طبيعي، ليس ترجمة أو AI خام</p>
              </div>

              <div className="bg-background p-6 rounded-xl shadow-lg border-2 border-brand-accent">
                <h3 className="font-bold text-xl mb-4 text-brand-accent">⭐ نسخ مخصصة</h3>
                <p className="text-foreground">كل عميل يحصل على نسخة خاصة بموقعه، جاهزة للنشر مباشرة</p>
              </div>

              <div className="bg-background p-6 rounded-xl shadow-lg border-2 border-brand-accent">
                <h3 className="font-bold text-xl mb-4 text-brand-accent">⭐ First Mover</h3>
                <p className="text-foreground">أول منصة SaaS عربية متخصصة في Authority Blog + محتوى مخصص</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 16: Future Expansion */}
      <section id="future-expansion" className="py-16 bg-background scroll-mt-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg ring-2 ring-primary/30">
                16
              </div>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Future Expansion</span>
            </div>
            <h2 className="text-4xl font-bold text-center mb-4 text-brand-primary">
              خطة التوسع المستقبلية 🌍
            </h2>
            <p className="text-center text-xl text-muted-foreground mb-12">
              رؤية طويلة الأمد
            </p>

            <div className="space-y-6">
              <div className="bg-secondary p-6 rounded-xl border-r-4 border-brand-primary">
                <div className="flex items-start gap-4">
                  <Badge className="bg-brand-primary text-lg px-4 py-2">المرحلة 2</Badge>
                  <div>
                    <h3 className="font-bold text-lg mb-2">التوسع إلى الخليج</h3>
                    <p className="text-foreground">الإمارات، الكويت، البحرين، عمان - سوق إضافي 200K+ مشروع</p>
                  </div>
                </div>
              </div>

              <div className="bg-chart-2/10 p-6 rounded-xl border-r-4 border-chart-2">
                <div className="flex items-start gap-4">
                  <Badge className="bg-chart-2 text-lg px-4 py-2">المرحلة 3</Badge>
                  <div>
                    <h3 className="font-bold text-lg mb-2">أنواع محتوى جديدة</h3>
                    <p className="text-foreground">فيديو، بودكاست، إنفوجرافيك - توسيع نطاق الخدمة</p>
                  </div>
                </div>
              </div>

              <div className="bg-chart-3/10 p-6 rounded-xl border-r-4 border-chart-3">
                <div className="flex items-start gap-4">
                  <Badge className="bg-chart-3 text-lg px-4 py-2">المرحلة 4</Badge>
                  <div>
                    <h3 className="font-bold text-lg mb-2">AI-Assisted Content</h3>
                    <p className="text-foreground">استخدام AI لتحسين الجودة والسرعة مع الحفاظ على المراجعة البشرية</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 17: Collaboration */}
      <section id="collaboration" className="py-16 bg-secondary scroll-mt-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg ring-2 ring-primary/30">
                17
              </div>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Collaboration</span>
            </div>
            <h2 className="text-4xl font-bold text-center mb-6">
              {content.collaboration.title}
            </h2>
            <p className="text-center text-xl text-muted-foreground mb-4">
              علاقة واضحة ومباشرة - كل طرف يعرف دوره بالضبط
            </p>
            <p className="text-center text-lg text-foreground mb-12 max-w-3xl mx-auto">
              نحن نبني المحتوى ونقويه، وأنت تحصل على النتائج في موقعك. بسيط وواضح.
            </p>

            {/* How It Works Flow */}
            <div className="bg-background p-8 rounded-2xl shadow-xl border-2 border-brand-primary mb-8">
              <h3 className="text-2xl font-bold text-brand-primary mb-6 text-center">كيف يعمل النظام؟</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">نحن نكتب مقال رئيسي في المدونة المركزية</h4>
                    <p className="text-foreground">مقال احترافي عن موضوع يهم جمهورك، منشور في مدونة Modonty القوية</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">خدمة الروابط الخارجية الاستراتيجية (Strategic Backlink Service) <Badge className="bg-chart-2 text-white text-xs mr-2">جميع الباقات</Badge></h4>
                    <p className="text-foreground mb-2">نستخدم أفضل ممارسات Guest Post لاختيار ووضع روابطك في المقالات المنشورة في مدونة Modonty (Authority Blog).</p>
                    <div className="bg-secondary p-3 rounded-lg mt-2 border-r-4 border-brand-primary">
                      <p className="text-sm text-foreground font-semibold mb-1">كيف نختار الروابط؟</p>
                      <ul className="text-xs text-muted-foreground space-y-1 mr-4">
                        <li>• نختار المقالات ذات الصلة بمجال عملك ومنتجاتك</li>
                        <li>• نضمن وضع طبيعي ومدعوم بالسياق (Contextual Placement)</li>
                        <li>• نستخدم Anchor Text مناسب وطبيعي</li>
                        <li>• نركز على مقالات عالية الجودة والسلطة (High Authority)</li>
                      </ul>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">✓ هذه الميزة متاحة لجميع الباقات - كل عميل يحصل على روابط استراتيجية من المدونة المركزية</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">ننشئ نسخة مخصصة لك <Badge className="bg-brand-accent text-white text-xs mr-2">Premium فقط</Badge></h4>
                    <p className="text-foreground">نفس الفكرة، لكن بصياغة خاصة بمشروعك - جاهزة للنشر في موقعك مباشرة</p>
                    <p className="text-sm text-muted-foreground mt-2">💡 هذه الميزة متاحة فقط في باقة Premium</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-chart-2 text-white flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">أنت تنشر النسخة المخصصة <Badge className="bg-brand-accent text-white text-xs mr-2">Premium فقط</Badge></h4>
                    <p className="text-foreground">ترفع المقال في موقعك أو متجرك - محتوى جديد يقوي موقعك</p>
                    <p className="text-sm text-muted-foreground mt-2">💡 هذه الخطوة خاصة بباقة Premium</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-chart-2 text-white flex items-center justify-center font-bold flex-shrink-0">
                    5
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">نشر على منصات التواصل الاجتماعي</h4>
                    <p className="text-foreground mb-2">ننشر كل مقال على منصات التواصل الاجتماعي (Twitter/X، LinkedIn، Facebook) لزيادة الوصول والتفاعل</p>
                    <div className="bg-chart-3/10 p-3 rounded-lg mt-2 border-r-4 border-chart-3">
                      <p className="text-sm text-foreground font-semibold mb-1">ما نقدمه في النشر:</p>
                      <ul className="text-xs text-muted-foreground space-y-1 mr-4">
                        <li>• نشر احترافي على منصات متعددة</li>
                        <li>• محتوى مخصص لكل منصة (Twitter، LinkedIn، Facebook)</li>
                        <li>• Hashtags استراتيجية لزيادة الوصول</li>
                        <li>• متابعة التفاعل والرد على التعليقات</li>
                      </ul>
                    </div>
                    <div className="bg-secondary p-3 rounded-lg mt-3 border-r-4 border-primary">
                      <p className="text-sm text-foreground font-semibold mb-2">الفرق بين الباقات:</p>
                      <ul className="text-xs text-muted-foreground space-y-1 mr-4">
                        <li className="flex items-start gap-2">
                          <Badge className="bg-chart-2 text-white text-xs">جميع الباقات</Badge>
                          <span>نشر على حسابات Modonty الرسمية</span>
                        </li>
                        <li className="flex items-start gap-2 mt-2">
                          <Badge className="bg-brand-accent text-white text-xs">Premium فقط</Badge>
                          <span>نشر إضافي على حساباتك الخاصة (Twitter، LinkedIn، Facebook) - محتوى مخصص لحساباتك</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                    6
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">إضافة Meta Pixel لمقالاتك <Badge className="bg-chart-2 text-white text-xs mr-2">جميع الباقات</Badge></h4>
                    <p className="text-foreground mb-2">نضيف Meta Pixel (Facebook Pixel) لمقالاتك لتتبع الزوار وإنشاء Lookalike Audiences لحملاتك الإعلانية</p>
                    <div className="bg-secondary p-3 rounded-lg mt-2 border-r-4 border-primary">
                      <p className="text-sm text-foreground font-semibold mb-1">كيف يساعدك Meta Pixel:</p>
                      <ul className="text-xs text-muted-foreground space-y-1 mr-4">
                        <li>• تتبع زوار المقالات في Facebook و Instagram</li>
                        <li>• إنشاء Lookalike Audiences بناءً على زوار المقالات</li>
                        <li>• تحسين استهداف حملاتك الإعلانية</li>
                        <li>• قياس أداء المقالات في منصات Meta</li>
                      </ul>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">✓ هذه الميزة متاحة لجميع الباقات - كل مقال يحصل على Meta Pixel تلقائياً</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-chart-3 text-white flex items-center justify-center font-bold flex-shrink-0">
                    7
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">لوحة تحكم (Dashboard) مخصصة لك <Badge className="bg-chart-2 text-white text-xs mr-2">جميع الباقات</Badge></h4>
                    <p className="text-foreground mb-2">كل عميل يحصل على لوحة تحكم خاصة به لتتبع جميع النتائج في مكان واحد</p>
                    <div className="bg-chart-3/10 p-3 rounded-lg mt-2 border-r-4 border-chart-3">
                      <p className="text-sm text-foreground font-semibold mb-1">ما يمكنك تتبعه في Dashboard:</p>
                      <ul className="text-xs text-muted-foreground space-y-1 mr-4">
                        <li>• جميع المقالات المنشورة وتواريخ النشر</li>
                        <li>• الزيارات من Google Analytics و Meta Pixel</li>
                        <li>• أداء المقالات على منصات التواصل الاجتماعي</li>
                        <li>• إحصائيات التفاعل والوصول</li>
                        <li>• تقارير شهرية مفصلة</li>
                      </ul>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">✓ هذه الميزة متاحة لجميع الباقات - تتبع شامل لجميع النتائج</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                    8
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">النتائج تظهر في حسابك</h4>
                    <p className="text-foreground">ترى الزيارات من المقالات ومنصات التواصل في Google Analytics و Meta Pixel الخاص بك - شفافية كاملة في Dashboard المخصص</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Backlink Strategy Section */}
            <div className="bg-gradient-to-br from-secondary to-secondary p-8 rounded-2xl shadow-lg border-2 border-brand-primary mb-8">
              <h3 className="text-2xl font-bold text-brand-primary mb-6 text-center">استراتيجية الروابط الخارجية - كيف نعمل كخبراء SEO</h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-background shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl text-brand-primary">معايير اختيار الروابط</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-chart-2 flex-shrink-0 mt-0.5" />
                        <span><strong>الصلة بالموضوع:</strong> نختار مقالات مرتبطة بمجال عملك ومنتجاتك</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-chart-2 flex-shrink-0 mt-0.5" />
                        <span><strong>محاذاة الكلمات المفتاحية:</strong> مقالات تستهدف كلمات مفتاحية تهم جمهورك</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-chart-2 flex-shrink-0 mt-0.5" />
                        <span><strong>سلطة المقال:</strong> مقالات عالية الجودة والترافيك من مدونة Modonty القوية</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-chart-2 flex-shrink-0 mt-0.5" />
                        <span><strong>الوضع الطبيعي:</strong> روابط في سياق طبيعي ومدعومة بالمحتوى</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-background shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl text-brand-primary">ممارسات Guest Post الاحترافية</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-chart-2 flex-shrink-0 mt-0.5" />
                        <span><strong>معايير التحرير:</strong> مقالات تلبي أعلى معايير الجودة التحريرية</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-chart-2 flex-shrink-0 mt-0.5" />
                        <span><strong>السياق الطبيعي:</strong> الروابط تظهر بشكل طبيعي داخل المحتوى</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-chart-2 flex-shrink-0 mt-0.5" />
                        <span><strong>Anchor Text الاستراتيجي:</strong> نصوص روابط محسّنة وطبيعية</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-chart-2 flex-shrink-0 mt-0.5" />
                        <span><strong>مصدر عالي السلطة:</strong> مدونة Modonty كمصدر موثوق (Authority Blog)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-background p-6 rounded-xl border-2 border-brand-accent">
                <h4 className="text-xl font-bold text-brand-accent mb-4 text-center">إرشادات Premium للروابط الاستراتيجية <Badge className="bg-brand-accent text-white text-xs mr-2">Premium فقط</Badge></h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-foreground mb-2">كيف نرشدك لروابط مخصصة:</p>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-brand-accent flex-shrink-0 mt-0.5" />
                        <span>نحلل منتجاتك وخدماتك لنحدد أفضل المقالات لروابطك</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-brand-accent flex-shrink-0 mt-0.5" />
                        <span>نختار الكلمات المفتاحية المستهدفة بناءً على أهدافك التجارية</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-brand-accent flex-shrink-0 mt-0.5" />
                        <span>نحدد أفضل Anchor Text لكل رابط حسب السياق</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-brand-accent flex-shrink-0 mt-0.5" />
                        <span>نركز على صفحات محددة تريد رفع ترتيبها في Google</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-2">الاستراتيجية حسب نشاطك:</p>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-brand-accent flex-shrink-0 mt-0.5" />
                        <span><strong>متاجر إلكترونية:</strong> روابط في مقالات عن المنتجات والمراجعات</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-brand-accent flex-shrink-0 mt-0.5" />
                        <span><strong>خدمات طبية:</strong> روابط في مقالات صحية وتعليمية</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-brand-accent flex-shrink-0 mt-0.5" />
                        <span><strong>خدمات قانونية:</strong> روابط في مقالات قانونية ومعلوماتية</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-brand-accent flex-shrink-0 mt-0.5" />
                        <span><strong>خدمات تجارية:</strong> روابط في مقالات استشارية وتوجيهية</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  في باقة Premium، نعمل معك مباشرة لبناء استراتيجية روابط مخصصة تحقق أقصى فائدة لموقعك
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="bg-background shadow-lg border-2 border-brand-primary">
                <CardHeader>
                  <CardTitle className="text-2xl text-brand-primary mb-2">
                    ما نقدمه نحن (Modonty)
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">كل ما يتعلق بالمحتوى والنتائج</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">بناء وتقوية المدونة المركزية</span>
                        <p className="text-sm text-muted-foreground mt-1">مدونة قوية تتصدر Google وتخدم جميع العملاء</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">كتابة المقالات الرئيسية</span>
                        <p className="text-sm text-muted-foreground mt-1">مقالات احترافية مبنية على بحث حقيقي</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">خدمة الروابط الخارجية الاستراتيجية <Badge className="bg-chart-2 text-white text-xs mr-1">جميع الباقات</Badge></span>
                        <p className="text-sm text-muted-foreground mt-1">نستخدم أفضل ممارسات Guest Post لاختيار ووضع روابطك في مقالات عالية الجودة من مدونة Modonty - روابط طبيعية ومدعومة بالسياق</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">إنشاء نسخة مخصصة لكل مقال <Badge className="bg-brand-accent text-white text-xs mr-1">Premium</Badge></span>
                        <p className="text-sm text-muted-foreground mt-1">نسخة فريدة جاهزة للنشر في موقعك (متاحة في باقة Premium فقط)</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">نشر على منصات التواصل الاجتماعي</span>
                        <div className="text-sm text-muted-foreground mt-1">
                          <Badge className="bg-chart-2 text-white text-xs mr-1">جميع الباقات</Badge> نشر على حسابات Modonty الرسمية |
                          <Badge className="bg-brand-accent text-white text-xs mr-1 ml-1">Premium</Badge> نشر إضافي على حساباتك الخاصة (Twitter، LinkedIn، Facebook) - محتوى مخصص لحساباتك
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">إضافة Meta Pixel لمقالاتك <Badge className="bg-chart-2 text-white text-xs mr-1">جميع الباقات</Badge></span>
                        <p className="text-sm text-muted-foreground mt-1">نضيف Meta Pixel (Facebook Pixel) تلقائياً لمقالاتك لتتبع الزوار وإنشاء Lookalike Audiences لحملاتك الإعلانية على Facebook و Instagram - تساعدك في استهداف جمهور مشابه لزوار المقالات</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">لوحة تحكم (Dashboard) مخصصة <Badge className="bg-chart-2 text-white text-xs mr-1">جميع الباقات</Badge></span>
                        <p className="text-sm text-muted-foreground mt-1">كل عميل يحصل على لوحة تحكم خاصة به لتتبع جميع النتائج: المقالات المنشورة، الزيارات من Google Analytics، أداء Meta Pixel، إحصائيات منصات التواصل الاجتماعي، وكل البيانات في مكان واحد</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">إعداد GTM للتتبع</span>
                        <p className="text-sm text-muted-foreground mt-1">تتبع الزيارات من المقالات ومنصات التواصل في Google Analytics الخاص بك - شفافية كاملة في النتائج</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">تطبيق Mobile App <Badge className="bg-chart-2 text-white text-xs mr-1">جميع الباقات</Badge></span>
                        <p className="text-sm text-muted-foreground mt-1">تطبيق جوال مخصص لمتابعة مقالاتك وأدائها - إشعارات فورية عند نشر مقال جديد، متابعة الأداء من الهاتف، وإرسال طلبات مواضيع جديدة بسهولة</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">تقويم المحتوى (Content Calendar) <Badge className="bg-chart-2 text-white text-xs mr-1">جميع الباقات</Badge></span>
                        <p className="text-sm text-muted-foreground mt-1">تقويم مرئي يوضح تواريخ نشر جميع مقالاتك القادمة - رؤية خطة المحتوى لـ 18 شهر مسبقاً، جدولة المحتوى، وتنظيم أفضل لاستراتيجيتك</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">إشعارات Email تلقائية <Badge className="bg-chart-2 text-white text-xs mr-1">جميع الباقات</Badge></span>
                        <p className="text-sm text-muted-foreground mt-1">إشعارات فورية عند نشر مقال جديد، تقارير شهرية تلقائية عن الأداء، وتنبيهات عند تحسن الترتيب أو زيادة الزيارات - ابق على اطلاع دائماً</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">تحليل أداء المحتوى المتقدم <Badge className="bg-chart-2 text-white text-xs mr-1">جميع الباقات</Badge></span>
                        <p className="text-sm text-muted-foreground mt-1">تحليل مفصل لأداء كل مقال منفرداً - أفضل المقالات أداءً، تتبع الكلمات المفتاحية، مقارنة الأداء بين المقالات، ورؤى قابلة للتنفيذ لتحسين النتائج</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">مكتبة المحتوى (Content Library) <Badge className="bg-chart-2 text-white text-xs mr-1">جميع الباقات</Badge></span>
                        <p className="text-sm text-muted-foreground mt-1">الوصول لجميع مقالاتك السابقة في مكان واحد - بحث وفلترة سريعة، تحميل المقالات، ومتابعة تاريخ المحتوى المنشور</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">متابعة الأداء والتحسين</span>
                        <p className="text-sm text-muted-foreground mt-1">تحليل ما ينجح وتحسين المحتوى بناءً على البيانات</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-background shadow-lg border-2 border-primary/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-brand-primary mb-2">
                    ما نحتاجه منك (العميل)
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">معلومات بسيطة لنتعرف عليك</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <ArrowRight className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">تعريف بمشروعك</span>
                        <p className="text-sm text-muted-foreground mt-1">اسم المشروع، الخدمات، المنتجات - معلومات أساسية</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">تحديد الأولويات</span>
                        <p className="text-sm text-muted-foreground mt-1">أي صفحات أو خدمات تريد رفع حضورها أولاً؟</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">صلاحية GTM (اختياري)</span>
                        <p className="text-sm text-muted-foreground mt-1">إذا أردت رؤية النتائج بدقة، نصل بحسابك بـ GTM</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">نشر المقالات</span>
                        <p className="text-sm text-muted-foreground mt-1">ترفع النسخة المخصصة في موقعك - عملية بسيطة</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">مراجعة دورية (اختياري)</span>
                        <p className="text-sm text-muted-foreground mt-1">مكالمة قصيرة كل فترة لمراجعة النتائج</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Premium Additional Features */}
            <div className="bg-gradient-to-br from-brand-accent/10 to-chart-3/10 p-8 rounded-2xl shadow-lg border-2 border-brand-accent mb-8">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Badge className="bg-brand-accent text-white text-lg px-4 py-1">Premium فقط</Badge>
                <h3 className="text-2xl font-bold text-brand-primary">ميزات إضافية حصرية في باقة Premium</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-background shadow-md border-2 border-brand-accent">
                  <CardHeader>
                    <CardTitle className="text-lg text-brand-primary">🔄 تحديث المحتوى القديم (Content Refresh)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground">تحديث المقالات القديمة لتحسين ترتيبها في Google - إضافة معلومات جديدة، تحسين SEO، وإعادة النشر لزيادة الزيارات</p>
                  </CardContent>
                </Card>

                <Card className="bg-background shadow-md border-2 border-brand-accent">
                  <CardHeader>
                    <CardTitle className="text-lg text-brand-primary">💡 اقتراحات المواضيع (Content Suggestions)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground">اقتراحات ذكية لمواضيع جديدة بناءً على اتجاهات السوق، تحليل المنافسين، وكلمات مفتاحية جديدة - نوفر لك أفكار محتوى مستمرة</p>
                  </CardContent>
                </Card>

                <Card className="bg-background shadow-md border-2 border-brand-accent">
                  <CardHeader>
                    <CardTitle className="text-lg text-brand-primary">📊 تتبع ترتيب الكلمات المفتاحية (Keyword Ranking)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground">تتبع ترتيب كلماتك المفتاحية في Google - رؤية التقدم في الترتيب، تنبيهات عند تحسن الترتيب، وتحليل أداء الكلمات المفتاحية</p>
                  </CardContent>
                </Card>

                <Card className="bg-background shadow-md border-2 border-brand-accent">
                  <CardHeader>
                    <CardTitle className="text-lg text-brand-primary">✅ موافقة العميل قبل النشر (Content Approval)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground">إرسال المقال للمراجعة والموافقة قبل النشر - مراجعة المحتوى، طلب تعديلات، والموافقة النهائية قبل النشر</p>
                  </CardContent>
                </Card>

                <Card className="bg-background shadow-md border-2 border-brand-accent">
                  <CardHeader>
                    <CardTitle className="text-lg text-brand-primary">🔗 تكامل مع CMS (WordPress, Shopify, etc.)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground">رفع المقال تلقائياً لموقعك - تكامل مباشر مع WordPress، Shopify، Salla، Zid - لا حاجة لرفع يدوي</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Result Summary */}
            <div className="bg-background p-8 rounded-2xl shadow-lg border-2 border-brand-primary">
              <h3 className="text-2xl font-bold text-brand-primary mb-4 text-center">النتيجة النهائية</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-secondary p-6 rounded-xl border border-primary/20">
                  <h4 className="font-bold text-lg mb-3 text-brand-primary">ما تحصل عليه:</h4>
                  <ul className="space-y-2 text-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-chart-2 flex-shrink-0 mt-1" />
                      <span>مقالات جاهزة للنشر شهرياً (2-12 حسب الباقة)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-chart-2 flex-shrink-0 mt-1" />
                      <span>روابط قوية من مدونة قوية (Authority Blog)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-chart-2 flex-shrink-0 mt-1" />
                      <span>زيارات حقيقية تراها في حسابك</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-chart-2 flex-shrink-0 mt-1" />
                      <span>حضور قوي في Google بدون تعقيدات SEO</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-chart-2/10 p-6 rounded-xl border border-chart-2/30">
                  <h4 className="font-bold text-lg mb-3 text-brand-primary">ما لا تحتاجه:</h4>
                  <ul className="space-y-2 text-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive font-bold">×</span>
                      <span>لا تحتاج تفهم SEO أو محركات البحث</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive font-bold">×</span>
                      <span>لا تحتاج توظيف كاتب محتوى</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive font-bold">×</span>
                      <span>لا تحتاج إدارة فريق محتوى</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive font-bold">×</span>
                      <span>لا تحتاج متابعة يومية - نحن نتولى كل شيء</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-brand-primary text-white rounded-xl text-center">
                <p className="text-lg font-semibold">
                  فريق التسويق عندك يركّز على الحملات والإعلانات والعروض… ونحن نتولى بناء "الأساس" الهادئ للمحتوى في الخلفية.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 18: Additional Revenue Sources */}
      <section id="additional-revenue" className="py-16 bg-gradient-to-br from-muted to-secondary scroll-mt-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg ring-2 ring-primary/30">
                18
              </div>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Additional Revenue</span>
            </div>
            <h2 className="text-4xl font-bold text-center mb-4 text-brand-primary">
              مصادر الدخل الإضافية 💰
            </h2>
            <p className="text-center text-xl text-muted-foreground mb-2">
              نموذج عمل متنوع يضمن الاستدامة والنمو
            </p>
            <p className="text-center text-lg text-foreground mb-12 max-w-3xl mx-auto">
              بالإضافة إلى الاشتراكات الأساسية، نقدم 12 مصدر دخل إضافي لتنويع الإيرادات وزيادة القيمة للعملاء
            </p>

            {/* Level 1 */}
            <div className="mb-12">
              <div className="bg-background p-6 rounded-xl shadow-lg border-2 border-chart-2/30 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-chart-2 text-white text-lg px-4 py-1">المستوى 1</Badge>
                  <h3 className="text-2xl font-bold text-brand-primary">مكاسب سريعة</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 border-chart-2/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-chart-2">الخدمات الإضافية</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                          <span>مقالات إضافية: <strong>500 ريال</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                          <span>تسليم عاجل: <strong>300 ريال</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                          <span>تدقيق المحتوى: <strong>1,500 ريال</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                          <span>استشارة SEO: <strong>2,000 ريال</strong></span>
                        </li>
                      </ul>
                      <p className="text-xs text-chart-2 font-semibold mt-3">التأثير: +20-30% إيراد لكل عميل</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-primary/10">
                    <CardHeader>
                      <CardTitle className="text-lg text-primary">الميزات المميزة</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>دعم أولوية: <strong>500 ريال/شهر</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>مدير حساب مخصص: <strong>1,500 ريال/شهر</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>لوحة تحليلات متقدمة: <strong>300 ريال/شهر</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>وصول API: <strong>800 ريال/شهر</strong></span>
                        </li>
                      </ul>
                      <p className="text-xs text-primary font-semibold mt-3">التأثير: +20-30% إيراد لكل عميل</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-chart-3/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-chart-3">الخدمات الاستشارية</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-chart-3 flex-shrink-0 mt-0.5" />
                          <span>نقل المحتوى: <strong>3,000-5,000 ريال</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-chart-3 flex-shrink-0 mt-0.5" />
                          <span>تدقيق الموقع: <strong>2,500 ريال</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-chart-3 flex-shrink-0 mt-0.5" />
                          <span>تحليل المنافسين: <strong>2,000 ريال</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-chart-3 flex-shrink-0 mt-0.5" />
                          <span>إعداد تقويم المحتوى: <strong>1,500 ريال</strong></span>
                        </li>
                      </ul>
                      <p className="text-xs text-chart-3 font-semibold mt-3">التأثير: +10-15% إيراد</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-chart-4/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-chart-4">برنامج الإحالة</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-chart-4 flex-shrink-0 mt-0.5" />
                          <span><strong>المحيل:</strong> شهر مجاني أو 500 ريال رصيد</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-chart-4 flex-shrink-0 mt-0.5" />
                          <span><strong>المحال إليه:</strong> خصم 10%</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-chart-4 flex-shrink-0 mt-0.5" />
                          <span><strong>النتيجة:</strong> عميل جديد بتكلفة أقل</span>
                        </li>
                      </ul>
                      <p className="text-xs text-chart-4 font-semibold mt-3">التأثير: 20-30% من العملاء الجدد</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Level 2 */}
            <div className="mb-12">
              <div className="bg-background p-6 rounded-xl shadow-lg border-2 border-primary/30 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-primary text-white text-lg px-4 py-1">المستوى 2</Badge>
                  <h3 className="text-2xl font-bold text-brand-primary">متوسط المدى</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-primary">سوق المحتوى</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground mb-3">بيع مقالات فردية لغير المشتركين (200-500 ريال لكل مقال)</p>
                      <p className="text-xs text-primary font-semibold">الإمكانات: 50,000-100,000 ريال/شهر</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-primary">برنامج الوكالة (White-Label)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground mb-3">الوكالات تبيع Modonty تحت علامتها التجارية</p>
                      <p className="text-xs text-primary font-semibold">الإمكانات: 100-200 عميل من خلال 5-10 وكالات</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-primary">منتجات البيانات والرؤى</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-foreground">
                        <li>• تقارير الصناعة: <strong>500 ريال</strong></li>
                        <li>• تحليل اتجاهات المحتوى: <strong>300 ريال/شهر</strong></li>
                        <li>• لوحة رؤى SEO: <strong>400 ريال/شهر</strong></li>
                        <li>• ذكاء المنافسين: <strong>600 ريال/شهر</strong></li>
                      </ul>
                      <p className="text-xs text-primary font-semibold mt-3">الإمكانات: 20,000-50,000 ريال/شهر</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-primary">التدريب والتعليم</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-foreground">
                        <li>• دورة تسويق المحتوى: <strong>1,500 ريال</strong></li>
                        <li>• ورشة SEO: <strong>800 ريال</strong></li>
                        <li>• ندوات شهرية: <strong>200 ريال/جلسة</strong></li>
                        <li>• برنامج شهادة: <strong>2,500 ريال</strong></li>
                      </ul>
                      <p className="text-xs text-primary font-semibold mt-3">الإمكانات: 30,000-60,000 ريال/شهر</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Level 3 */}
            <div className="mb-12">
              <div className="bg-background p-6 rounded-xl shadow-lg border-2 border-chart-3/30 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-chart-3 text-white text-lg px-4 py-1">المستوى 3</Badge>
                  <h3 className="text-2xl font-bold text-brand-primary">طويل المدى</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 border-chart-3/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-chart-3">منصة API والتكامل</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground mb-3">تكاملات مع Salla، Zid، Shopify</p>
                      <p className="text-xs text-chart-3 font-semibold">الإمكانات: 50,000-150,000 ريال/شهر</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-chart-3/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-chart-3">ترخيص المحتوى</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground mb-3">ترخيص مكتبة المحتوى للمنصات الأخرى</p>
                      <p className="text-xs text-chart-3 font-semibold">الإمكانات: 100,000-500,000 ريال/سنة</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-chart-3/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-chart-3">الامتياز/التوسع الإقليمي</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground mb-3">ترخيص نموذج Modonty لمناطق أخرى</p>
                      <p className="text-xs text-chart-3 font-semibold">الإمكانات: 500,000-2 مليون ريال/سنة</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-chart-3/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-chart-3">بناء AI لاستخدام محتوانا</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground mb-2">تطوير نموذج AI مدرب على محتوى Modonty لإنشاء محتوى عربي احترافي</p>
                      <p className="text-xs text-muted-foreground mb-3">بيع اشتراكات شهري/سنوي مثل ChatGPT (99-299 ريال/شهر)</p>
                      <p className="text-xs text-chart-3 font-semibold">الإمكانات: 500,000-2 مليون ريال/سنة</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Revenue Projections */}
            <div className="bg-gradient-to-br from-primary via-primary to-primary text-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-center mb-6 text-white">توقعات الإيراد مع المصادر الإضافية</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-background/20 backdrop-blur-sm p-6 rounded-xl border border-white/30 hover:bg-background/30 transition-colors">
                  <h4 className="font-bold text-lg mb-2 text-white">السيناريو 1</h4>
                  <p className="text-sm mb-2 text-white/90">المستوى 1 فقط (3 أشهر)</p>
                  <p className="text-3xl font-bold text-white">3.35M</p>
                  <p className="text-sm text-white/90">ريال/سنة (+41%)</p>
                </div>
                <div className="bg-background/20 backdrop-blur-sm p-6 rounded-xl border border-white/30 hover:bg-background/30 transition-colors">
                  <h4 className="font-bold text-lg mb-2 text-white">السيناريو 2</h4>
                  <p className="text-sm mb-2 text-white/90">المستوى 1 + 2 (6 أشهر)</p>
                  <p className="text-3xl font-bold text-white">8.8M</p>
                  <p className="text-sm text-white/90">ريال/سنة (+270%)</p>
                </div>
                <div className="bg-background/20 backdrop-blur-sm p-6 rounded-xl border border-white/30 hover:bg-background/30 transition-colors">
                  <h4 className="font-bold text-lg mb-2 text-white">السيناريو 3</h4>
                  <p className="text-sm mb-2 text-white/90">جميع المستويات (12 شهر)</p>
                  <p className="text-3xl font-bold text-white">12.3M</p>
                  <p className="text-sm text-white/90">ريال/سنة (+417%)</p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-12 bg-background p-8 rounded-2xl shadow-lg border-2 border-brand-primary">
              <h3 className="text-2xl font-bold text-center mb-6 text-brand-primary">الفوائد للعملاء</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-chart-2 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-2">مرونة أكبر</h4>
                    <p className="text-sm text-foreground">خدمات إضافية حسب الحاجة</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-chart-2 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-2">قيمة أعلى</h4>
                    <p className="text-sm text-foreground">ميزات مميزة لتحسين الأداء</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-chart-2 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-2">دعم متقدم</h4>
                    <p className="text-sm text-foreground">استشارات وتدريب متخصص</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-chart-2 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-2">شبكة قوية</h4>
                    <p className="text-sm text-foreground">برنامج إحالة يكافئ الجميع</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 19: 3-Domain Workflow Explanation */}
      <section id="workflow" className="py-16 bg-gradient-to-br from-muted to-secondary scroll-mt-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg ring-2 ring-primary/30">
                19
              </div>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">3-Domain Workflow</span>
            </div>
            <div className="text-center mb-12">
              <Badge className="mb-4 text-lg px-6 py-2 bg-brand-primary text-white">
                كيف نعمل
              </Badge>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                نظامنا المكون من 3 منصات متكاملة
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                فهم واضح لكيفية عمل المنصات الثلاث معاً لتحقيق أهدافنا
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Domain 1: jrbseo.com */}
              <Card className="bg-background shadow-xl border-2 border-primary/20 hover:border-brand-primary transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                      1
                    </div>
                    <CardTitle className="text-2xl text-primary">jrbseo.com</CardTitle>
                  </div>
                  <Badge className="bg-secondary text-primary">المنصة الأساسية</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground mb-4 leading-relaxed">
                    المنصة الرئيسية للعملاء والاشتراكات
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">شرح الفكرة والقيمة المضافة</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">جذب العملاء والتسجيل</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">إدارة الاشتراكات والدفعات</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">معلومات المشروع الشاملة</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Domain 2: Modonty.com */}
              <Card className="bg-background shadow-xl border-2 border-chart-2/30 hover:border-chart-2 transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-chart-2 text-white flex items-center justify-center text-xl font-bold">
                      2
                    </div>
                    <CardTitle className="text-2xl text-chart-2">Modonty.com</CardTitle>
                  </div>
                  <Badge className="bg-chart-2/20 text-chart-2">نظام المحتوى</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground mb-4 leading-relaxed">
                    النظام الأساسي لإنشاء وإدارة المقالات
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">إنشاء المقالات وتحريرها</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">نشر المقالات وإدارتها</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">تسليم المحتوى للعملاء</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">إدارة المدونة المركزية</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Domain 3: jbrtechno.com */}
              <Card className="bg-background shadow-xl border-2 border-chart-3/30 hover:border-chart-3 transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-chart-3 text-white flex items-center justify-center text-xl font-bold">
                      3
                    </div>
                    <CardTitle className="text-2xl text-chart-3">jbrtechno.com</CardTitle>
                  </div>
                  <Badge className="bg-chart-3/20 text-chart-3">الإدارة والعمليات</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground mb-4 leading-relaxed">
                    لوحة التحكم الداخلية والعمليات الإدارية
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">لوحة تحكم الإدارة</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">لوحة تحكم الأدمن</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">توظيف وإدارة الموظفين</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">العمليات الداخلية والتنسيق</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Workflow Explanation */}
            <div className="bg-background p-8 rounded-2xl shadow-lg border-2 border-brand-primary">
              <h3 className="text-2xl font-bold text-center mb-6 text-brand-primary">
                كيف تعمل المنصات معاً؟
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-secondary rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">العميل يصل عبر jrbseo.com</h4>
                    <p className="text-sm text-foreground">
                      العميل يزور jrbseo.com، يفهم الفكرة، يسجل اشتراكه، ويدفع
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="h-6 w-6 text-brand-primary rotate-90 md:rotate-0" />
                </div>
                <div className="flex items-start gap-4 p-4 bg-chart-2/10 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-chart-2 text-white flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Modonty.com ينشئ المحتوى</h4>
                    <p className="text-sm text-foreground">
                      النظام في Modonty.com يستقبل طلب العميل، ينشئ المقالات، ويسلمها للعميل
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="h-6 w-6 text-brand-primary rotate-90 md:rotate-0" />
                </div>
                <div className="flex items-start gap-4 p-4 bg-chart-3/10 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-chart-3 text-white flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">jbrtechno.com يدير العمليات</h4>
                    <p className="text-sm text-foreground">
                      الفريق الإداري يستخدم jbrtechno.com لإدارة الموظفين، متابعة الأداء، وتنسيق العمل
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoToTop />
      </div>
    </div>
  );
}

