import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Sparkles, Briefcase, Send } from 'lucide-react';
import { getTeamPositions } from '@/helpers/extractMetrics';

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('careers');
  const positions = getTeamPositions();

  const leadershipPositions = positions.filter(p => p.phase === 0);
  const technicalPositions = positions.filter(p => p.phase === 1);
  const contentPositions = positions.filter(p => p.phase === 2);
  const operationsPositions = positions.filter(p => p.phase === 3);
  const salesPositions = positions.filter(p => p.phase === 4);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Briefcase className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('title')}
        </h1>
        <p className="text-xl text-muted-foreground mb-4">
          {t('subtitle')}
        </p>
        <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary inline-block">
          <p className="text-sm text-muted-foreground">
            {t('confidentialityNote')}
          </p>
        </div>
      </div>

      {/* Available Positions */}
      <div id="positions" className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {t('positions.title')}
        </h2>

        {/* 
          ====================================
          Leadership & Executive Positions
          - CTO / Technical Lead (Filled by المهندس خالد)
          - Operations (Filled by المهندس عبدالعزيز) - includes Customer Support & Data Analysis
          - Head of Content
          - Head of Marketing (includes Digital Marketing & Social Media)
          ====================================
        */}
        {leadershipPositions.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">{t('positions.leadership')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {leadershipPositions.map((position, index) => {
                const isFilled = !!position.filledBy;
                const requirements = locale === 'ar' ? position.requirements : position.requirementsEn;
                return (
                  <Card key={index} className={`transition-shadow ${isFilled ? 'border-green-500/20 bg-green-500/5' : 'hover:shadow-lg border-primary/20'}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg">
                          {locale === 'ar' ? position.title : position.titleEn}
                        </CardTitle>
                        <div className="flex gap-2 flex-wrap justify-end">
                          {position.employmentType && (
                            <Badge variant="outline">
                              {position.employmentType === 'full-time' ? t('positions.fullTime') : t('positions.projectBased')}
                            </Badge>
                          )}
                          {isFilled ? (
                            <>
                              <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 hover:bg-green-500/20">
                                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                                {t('positions.filled')}
                              </Badge>
                              {position.filledBy && (
                                <Badge variant="outline" className="bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20">
                                  {position.filledBy}
                                </Badge>
                              )}
                            </>
                          ) : (
                            <>
                              <Badge>{position.count} {locale === 'ar' ? 'وظيفة' : 'position(s)'}</Badge>
                              <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20">
                                {t('positions.vacant')}
                              </Badge>
                              <Badge variant="outline" className="bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20">
                                {t('positions.lookingForYou')}
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-muted-foreground mb-2">
                          {locale === 'ar' ? 'المتطلبات:' : 'Requirements:'}
                        </p>
                        <ul className="space-y-1.5">
                          {requirements.map((req, idx) => {
                            const isBonus = req.startsWith('⭐');
                            const cleanReq = isBonus ? req.substring(2) : req;
                            return (
                              <li key={idx} className={`text-sm flex items-start gap-2 ${isBonus ? 'bg-amber-500/10 dark:bg-amber-500/20 p-2 rounded-md border border-amber-500/20' : ''}`}>
                                {isBonus ? (
                                  <Sparkles className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                ) : (
                                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                )}
                                <span className={isBonus ? 'font-medium text-amber-700 dark:text-amber-400' : 'text-muted-foreground'}>
                                  {cleanReq}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      {!isFilled && (
                        <div className="mt-4 pt-4 border-t">
                          <Button className="w-full" size="lg">
                            <Send className="h-4 w-4 mr-2" />
                            {t('positions.applyNow')}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* 
          ====================================
          Technical Team
          - Full-stack Developer (Filled by المهندس خالد)
          - Lead Backend Developer (Filled by المهندس خالد) - handles DevOps essentials
          - React Native Developer
          - Designer (Filled by المهندس عبدالعزيز)
          - UI/UX Designer
          ====================================
        */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">{t('positions.technical')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {technicalPositions.map((position, index) => {
              const isFilled = position.titleEn === 'Full-stack Developer' || position.titleEn === 'Lead Backend Developer' || position.titleEn === 'Designer';
              const requirements = locale === 'ar' ? position.requirements : position.requirementsEn;
              return (
                <Card key={index} className={`transition-shadow ${isFilled ? 'border-green-500/20 bg-green-500/5' : 'hover:shadow-lg'}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg">
                        {locale === 'ar' ? position.title : position.titleEn}
                      </CardTitle>
                      <div className="flex gap-2 flex-wrap justify-end">
                        {position.employmentType && (
                          <Badge variant="outline">
                            {position.employmentType === 'full-time' ? t('positions.fullTime') : t('positions.projectBased')}
                          </Badge>
                        )}
                        {isFilled ? (
                          <>
                            <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 hover:bg-green-500/20">
                              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                              {t('positions.filled')}
                            </Badge>
                            {position.filledBy && (
                              <Badge variant="outline" className="bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20">
                                {position.filledBy}
                              </Badge>
                            )}
                          </>
                        ) : (
                          <>
                            <Badge>{position.count} {locale === 'ar' ? 'وظيفة' : 'position(s)'}</Badge>
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20">
                              {t('positions.vacant')}
                            </Badge>
                            <Badge variant="outline" className="bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20">
                              {t('positions.lookingForYou')}
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-muted-foreground mb-2">
                        {locale === 'ar' ? 'المتطلبات التقنية:' : 'Technical Requirements:'}
                      </p>
                      <ul className="space-y-1.5">
                        {requirements.map((req, idx) => {
                          const isBonus = req.startsWith('⭐');
                          const cleanReq = isBonus ? req.substring(2) : req;
                          return (
                            <li key={idx} className={`text-sm flex items-start gap-2 ${isBonus ? 'bg-amber-500/10 dark:bg-amber-500/20 p-2 rounded-md border border-amber-500/20' : ''}`}>
                              {isBonus ? (
                                <Sparkles className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              ) : (
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              )}
                              <span className={isBonus ? 'font-medium text-amber-700 dark:text-amber-400' : 'text-muted-foreground'}>
                                {cleanReq}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    {!isFilled && (
                      <div className="mt-4 pt-4 border-t">
                        <Button className="w-full" size="lg">
                          <Send className="h-4 w-4 mr-2" />
                          {t('positions.applyNow')}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 
          ====================================
          Content Team
          - Content Writers (2 positions)
          - Editor
          ====================================
        */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">{t('positions.content')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contentPositions.map((position, index) => {
              const requirements = locale === 'ar' ? position.requirements : position.requirementsEn;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg">
                        {locale === 'ar' ? position.title : position.titleEn}
                      </CardTitle>
                      <div className="flex gap-2 flex-wrap justify-end">
                        {position.employmentType && (
                          <Badge variant="outline">
                            {position.employmentType === 'full-time' ? t('positions.fullTime') : t('positions.projectBased')}
                          </Badge>
                        )}
                        <Badge>{position.count} {locale === 'ar' ? 'وظيفة' : 'position(s)'}</Badge>
                      </div>
                    </div>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20">
                        {t('positions.vacant')}
                      </Badge>
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20">
                        {t('positions.lookingForYou')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-muted-foreground mb-2">
                        {locale === 'ar' ? 'المتطلبات التقنية:' : 'Technical Requirements:'}
                      </p>
                      <ul className="space-y-1.5">
                        {requirements.map((req, idx) => {
                          const isBonus = req.startsWith('⭐');
                          const cleanReq = isBonus ? req.substring(2) : req;
                          return (
                            <li key={idx} className={`text-sm flex items-start gap-2 ${isBonus ? 'bg-amber-500/10 dark:bg-amber-500/20 p-2 rounded-md border border-amber-500/20' : ''}`}>
                              {isBonus ? (
                                <Sparkles className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              ) : (
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              )}
                              <span className={isBonus ? 'font-medium text-amber-700 dark:text-amber-400' : 'text-muted-foreground'}>
                                {cleanReq}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <Button className="w-full" size="lg">
                        <Send className="h-4 w-4 mr-2" />
                        {t('positions.applyNow')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 
          ====================================
          Operations & Support
          - No positions (all integrated into Operations leadership)
          ====================================
        */}
        {operationsPositions.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">{t('positions.operations')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {operationsPositions.map((position, index) => {
                const isFilled = !!position.filledBy;
                const requirements = locale === 'ar' ? position.requirements : position.requirementsEn;
                return (
                  <Card key={index} className={`transition-shadow ${isFilled ? 'border-green-500/20 bg-green-500/5' : 'hover:shadow-lg'}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg">
                          {locale === 'ar' ? position.title : position.titleEn}
                        </CardTitle>
                        <div className="flex gap-2 flex-wrap justify-end">
                          {position.employmentType && (
                            <Badge variant="outline">
                              {position.employmentType === 'full-time' ? t('positions.fullTime') : t('positions.projectBased')}
                            </Badge>
                          )}
                          {isFilled ? (
                            <>
                              <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 hover:bg-green-500/20">
                                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                                {t('positions.filled')}
                              </Badge>
                              {position.filledBy && (
                                <Badge variant="outline" className="bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20">
                                  {position.filledBy}
                                </Badge>
                              )}
                            </>
                          ) : (
                            <>
                              <Badge>{position.count} {locale === 'ar' ? 'وظيفة' : 'position(s)'}</Badge>
                              <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20">
                                {t('positions.vacant')}
                              </Badge>
                              <Badge variant="outline" className="bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20">
                                {t('positions.lookingForYou')}
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-muted-foreground mb-2">
                          {locale === 'ar' ? 'المتطلبات التقنية:' : 'Technical Requirements:'}
                        </p>
                        <ul className="space-y-1.5">
                          {requirements.map((req, idx) => {
                            const isBonus = req.startsWith('⭐');
                            const cleanReq = isBonus ? req.substring(2) : req;
                            return (
                              <li key={idx} className={`text-sm flex items-start gap-2 ${isBonus ? 'bg-amber-500/10 dark:bg-amber-500/20 p-2 rounded-md border border-amber-500/20' : ''}`}>
                                {isBonus ? (
                                  <Sparkles className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                ) : (
                                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                )}
                                <span className={isBonus ? 'font-medium text-amber-700 dark:text-amber-400' : 'text-muted-foreground'}>
                                  {cleanReq}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      {!isFilled && (
                        <div className="mt-4 pt-4 border-t">
                          <Button className="w-full" size="lg">
                            <Send className="h-4 w-4 mr-2" />
                            {t('positions.applyNow')}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* 
          ====================================
          Sales & Marketing Positions
          - Sales Representative (2 positions)
          - Customer Success Manager
          ====================================
        */}
        {salesPositions.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">{t('positions.sales')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {salesPositions.map((position, index) => {
                const isFilled = !!position.filledBy;
                const requirements = locale === 'ar' ? position.requirements : position.requirementsEn;
                return (
                  <Card key={index} className={`transition-shadow border-blue-500/20 ${isFilled ? 'bg-green-500/5' : 'hover:shadow-lg'}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg">
                          {locale === 'ar' ? position.title : position.titleEn}
                        </CardTitle>
                        <div className="flex gap-2 flex-wrap justify-end">
                          {position.employmentType && (
                            <Badge variant="outline">
                              {position.employmentType === 'full-time' ? t('positions.fullTime') : t('positions.projectBased')}
                            </Badge>
                          )}
                          {isFilled ? (
                            <>
                              <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 hover:bg-green-500/20">
                                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                                {t('positions.filled')}
                              </Badge>
                              {position.filledBy && (
                                <Badge variant="outline" className="bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20">
                                  {position.filledBy}
                                </Badge>
                              )}
                            </>
                          ) : (
                            <Badge variant="secondary">{position.count} {locale === 'ar' ? 'وظيفة' : 'position(s)'}</Badge>
                          )}
                        </div>
                      </div>
                      {!isFilled && (
                        <div className="mt-2 flex gap-2 flex-wrap">
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20">
                            {t('positions.vacant')}
                          </Badge>
                          <Badge variant="outline" className="bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20">
                            {t('positions.lookingForYou')}
                          </Badge>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-muted-foreground mb-2">
                          {locale === 'ar' ? 'المتطلبات:' : 'Requirements:'}
                        </p>
                        <ul className="space-y-1.5">
                          {requirements.map((req, idx) => {
                            const isBonus = req.startsWith('⭐');
                            const cleanReq = isBonus ? req.substring(2) : req;
                            return (
                              <li key={idx} className={`text-sm flex items-start gap-2 ${isBonus ? 'bg-amber-500/10 dark:bg-amber-500/20 p-2 rounded-md border border-amber-500/20' : ''}`}>
                                {isBonus ? (
                                  <Sparkles className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                ) : (
                                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                )}
                                <span className={isBonus ? 'font-medium text-amber-700 dark:text-amber-400' : 'text-muted-foreground'}>
                                  {cleanReq}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      {!isFilled && (
                        <div className="mt-4 pt-4 border-t">
                          <Button className="w-full" size="lg">
                            <Send className="h-4 w-4 mr-2" />
                            {t('positions.applyNow')}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Hiring Process */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {t('hiringProcess.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-full bg-primary text-primary-foreground w-8 h-8 flex items-center justify-center font-bold">
                  1
                </div>
                <CardTitle className="text-lg">{t('hiringProcess.step1')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t('hiringProcess.step1Desc')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-full bg-primary text-primary-foreground w-8 h-8 flex items-center justify-center font-bold">
                  2
                </div>
                <CardTitle className="text-lg">{t('hiringProcess.step2')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t('hiringProcess.step2Desc')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-full bg-primary text-primary-foreground w-8 h-8 flex items-center justify-center font-bold">
                  3
                </div>
                <CardTitle className="text-lg">{t('hiringProcess.step3')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t('hiringProcess.step3Desc')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-full bg-primary text-primary-foreground w-8 h-8 flex items-center justify-center font-bold">
                  4
                </div>
                <CardTitle className="text-lg">{t('hiringProcess.step4')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t('hiringProcess.step4Desc')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

