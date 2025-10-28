'use client';

import { useState, use } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { CVUpload } from '@/components/CVUpload';
import { ProfileImageUpload } from '@/components/ProfileImageUpload';
import { SuccessDialog } from '@/components/SuccessDialog';
import { submitApplication } from '@/actions/submitApplication';
import { getTeamPositions } from '@/helpers/extractMetrics';

export default function ApplyPage() {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations('applications');
  const locale = params.locale as string;
  const positionTitle = decodeURIComponent(params.position as string);

  // Find position data
  const positions = getTeamPositions();
  const position = positions.find(
    (p) => (locale === 'ar' ? p.title : p.titleEn) === positionTitle
  );

  const [acknowledged, setAcknowledged] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    yearsOfExperience: '',
    portfolioUrl: '',
    githubUrl: '',
    linkedinUrl: '',
    skills: '',
    coverLetter: '',
    cvUrl: '',
    cvPublicId: '',
    profileImageUrl: '',
    profileImagePublicId: '',
  });

  if (!position) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">{t('positionNotFound')}</h2>
            <p className="text-muted-foreground mb-6">{t('positionNotFoundDesc')}</p>
            <Link href={`/${locale}/careers`}>
              <Button>
                {locale === 'ar' ? <ArrowRight className="h-4 w-4 ml-2" /> : <ArrowLeft className="h-4 w-4 mr-2" />}
                {t('backToCareers')}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const requirements = locale === 'ar' ? position.requirements : position.requirementsEn;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.cvUrl) {
      setError(locale === 'ar' ? 'يرجى تحميل السيرة الذاتية' : 'Please upload your CV');
      return;
    }

    if (!acknowledged) {
      setError(locale === 'ar' ? 'يرجى قراءة المتطلبات والموافقة عليها' : 'Please acknowledge the requirements');
      return;
    }

    setSubmitting(true);

    try {
      const skillsArray = formData.skills.split(',').map((s) => s.trim()).filter((s) => s.length > 0);

      const result = await submitApplication({
        applicantName: formData.applicantName,
        email: formData.email,
        phone: formData.phone,
        position: positionTitle,
        yearsOfExperience: parseInt(formData.yearsOfExperience, 10),
        portfolioUrl: formData.portfolioUrl || '',
        githubUrl: formData.githubUrl || '',
        linkedinUrl: formData.linkedinUrl || '',
        skills: skillsArray,
        coverLetter: formData.coverLetter,
        cvUrl: formData.cvUrl,
        cvPublicId: formData.cvPublicId,
        profileImageUrl: formData.profileImageUrl,
        profileImagePublicId: formData.profileImagePublicId,
        locale: locale === 'ar' ? 'ar' : 'en',
      });

      if (result.success) {
        setShowSuccessDialog(true);
      } else {
        setError(result.error || (locale === 'ar' ? 'فشل في إرسال الطلب' : 'Failed to submit application'));
      }
    } catch (err) {
      setError(locale === 'ar' ? 'حدث خطأ غير متوقع' : 'An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Link href={`/${locale}/careers`}>
          <Button variant="ghost" size="sm">
            {locale === 'ar' ? <ArrowRight className="h-4 w-4 ml-2" /> : <ArrowLeft className="h-4 w-4 mr-2" />}
            {t('backToCareers')}
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t('applyForPosition')}</h1>
        <p className="text-xl text-muted-foreground">{positionTitle}</p>
      </div>

      {/* Requirements Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t('requirements')}</CardTitle>
          <CardDescription>{t('requirementsDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {requirements.map((req, idx) => {
              const isBonus = req.startsWith('⭐');
              const isSection = req.startsWith('---');
              const isEmpty = req.trim() === '';
              const cleanReq = isBonus ? req.substring(2).trim() : req.replace(/^---\s*/, '').replace(/\s*---$/, '').trim();

              if (isEmpty) {
                return <li key={idx} className="h-2" />;
              }

              if (isSection) {
                return (
                  <li key={idx} className="pt-3 pb-1.5 first:pt-0">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-primary/80">
                      {cleanReq}
                    </h4>
                  </li>
                );
              }

              return (
                <li key={idx} className="text-sm flex items-start gap-2.5 pl-1">
                  <CheckCircle2 className="h-4 w-4 text-primary/70 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground leading-relaxed">
                    {isBonus && '⭐ '}{cleanReq}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 pt-6 border-t space-y-3">
            <label className="flex items-start gap-3 cursor-pointer group">
              <Checkbox
                checked={acknowledged}
                onCheckedChange={(checked) => setAcknowledged(checked === true)}
              />
              <span className="text-sm font-medium leading-relaxed group-hover:text-primary transition-colors">
                {t('acknowledgeRequirements')}
              </span>
            </label>
            {!acknowledged && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg border border-dashed">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                <span>
                  {locale === 'ar'
                    ? 'يرجى تحديد المربع أعلاه لإظهار نموذج التقديم'
                    : 'Please check the box above to show the application form'}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Application Form - Only shows after acknowledgement */}
      {acknowledged && (
        <Card className="animate-in fade-in slide-in-from-top-4 duration-500">
          <CardHeader>
            <CardTitle>{t('applicationForm')}</CardTitle>
            <CardDescription>{t('fillAllFields')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('profileImage')} <span className="text-destructive">*</span>
                </label>
                <ProfileImageUpload
                  onUploadSuccess={(url, publicId) => {
                    setFormData((prev) => ({ ...prev, profileImageUrl: url, profileImagePublicId: publicId }));
                  }}
                  onUploadError={(err) => console.error('Image upload error:', err)}
                  disabled={submitting}
                />
                <p className="text-xs text-muted-foreground">{t('profileImageHelp')}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="applicantName" className="text-sm font-medium">
                    {t('fullName')} <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="applicantName"
                    name="applicantName"
                    type="text"
                    required
                    value={formData.applicantName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    placeholder={t('fullNamePlaceholder')}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t('email')} <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    placeholder={t('emailPlaceholder')}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    {t('phone')} <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    placeholder={t('phonePlaceholder')}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="yearsOfExperience" className="text-sm font-medium">
                    {t('yearsOfExperience')} <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    type="number"
                    min="0"
                    max="50"
                    required
                    value={formData.yearsOfExperience}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="portfolioUrl" className="text-sm font-medium">
                    {t('portfolioUrl')}
                  </label>
                  <input
                    id="portfolioUrl"
                    name="portfolioUrl"
                    type="url"
                    value={formData.portfolioUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    placeholder="https://"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="githubUrl" className="text-sm font-medium">
                    {t('githubUrl')}
                  </label>
                  <input
                    id="githubUrl"
                    name="githubUrl"
                    type="url"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    placeholder="https://github.com/"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="linkedinUrl" className="text-sm font-medium">
                    {t('linkedinUrl')}
                  </label>
                  <input
                    id="linkedinUrl"
                    name="linkedinUrl"
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    placeholder="https://linkedin.com/in/"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="skills" className="text-sm font-medium">
                  {t('skills')} <span className="text-destructive">*</span>
                </label>
                <input
                  id="skills"
                  name="skills"
                  type="text"
                  required
                  value={formData.skills}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  placeholder={t('skillsPlaceholder')}
                />
                <p className="text-xs text-muted-foreground">{t('skillsHelp')}</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="coverLetter" className="text-sm font-medium">
                  {t('coverLetter')} <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  required
                  rows={6}
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md bg-background resize-y"
                  placeholder={t('coverLetterPlaceholder')}
                  minLength={50}
                  maxLength={2000}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.coverLetter.length}/2000 {t('characters')}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('cvUpload')} <span className="text-destructive">*</span>
                </label>
                <CVUpload
                  onUploadSuccess={(url, publicId) => {
                    setFormData((prev) => ({ ...prev, cvUrl: url, cvPublicId: publicId }));
                    setUploadError(null);
                  }}
                  onUploadError={(err) => setUploadError(err)}
                  disabled={submitting}
                />
                {uploadError && (
                  <p className="text-sm text-destructive">{uploadError}</p>
                )}
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={submitting || !acknowledged || !formData.cvUrl || !formData.profileImageUrl}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {t('submitting')}
                    </>
                  ) : (
                    t('submitApplication')
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Success Dialog */}
      <SuccessDialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        applicantName={formData.applicantName}
        position={positionTitle}
        locale={locale}
      />
    </div>
  );
}

