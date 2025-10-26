import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, TrendingUp, Users, Rocket, Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('home');

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <Badge variant="secondary" className="mb-4">
          {locale === 'ar' ? 'قريباً' : 'Coming Soon'}
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {t('title')}
        </h1>
        <p className="text-xl text-muted-foreground mb-4">
          {t('subtitle')}
        </p>
        <p className="text-lg text-muted-foreground mb-8">
          {t('description')}
        </p>
        <Link href={`/${locale}/careers`}>
          <Button size="lg" className="gap-2">
            {t('joinUs')}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* About Section */}
      <Card className="mb-16">
        <CardHeader>
          <CardTitle className="text-2xl">{t('aboutProject')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-7 mb-4">
            {t('aboutText')}
          </p>
          <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
            <p className="text-sm italic">
              {t('confidential')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Why Join Us */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {t('whyJoin')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">{t('benefits.innovative')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t('benefits.innovativeDesc')}</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">{t('benefits.competitive')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t('benefits.competitiveDesc')}</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">{t('benefits.growth')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t('benefits.growthDesc')}</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">{t('benefits.startup')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t('benefits.startupDesc')}</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Join Us CTA */}
      <Card className="mb-16 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardHeader className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4">
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl">{t('careersTitle')}</CardTitle>
          <CardDescription className="text-base mt-2">{t('careersDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Link href={`/${locale}/careers`}>
            <Button size="lg" className="gap-2">
              {t('viewAllPositions')}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
