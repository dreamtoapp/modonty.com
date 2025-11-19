'use client';

import { use, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ApplicationStatusBadge } from '@/components/ApplicationStatusBadge';
import { updateApplicationStatus, updateApplicationNotes } from '@/actions/updateApplicationStatus';
import { deleteInterviewResponse } from '@/actions/deleteInterviewResponse';
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  Link2,
  ExternalLink,
  Loader2,
  User,
  MapPin,
  CalendarClock,
  Languages,
  ShieldCheck,
  Copy,
  Check,
  MessageCircle,
  Trash2,
  AlertTriangle,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Application, ApplicationStatus } from '@prisma/client';
import { validateAndFixWhatsAppPhone } from '@/helpers/whatsappPhone';

interface ApplicationDetailPageProps {
  params: Promise<{ locale: string; id: string }>;
}

type ExtendedApplication = Application & {
  availabilityDate?: Date | string | null;
  currentLocation?: string | null;
  arabicProficiency?: string | null;
  englishProficiency?: string | null;
  consentToDataUsage?: boolean | null;
  lastJobExitReason?: string | null;
  lastSalary?: string | null;
  expectedSalary?: string | null;
  canWorkHard?: boolean | null;
  noticePeriod?: string | null;
  preferredWorkLocation?: string | null;
  whyInterestedInPosition?: string | null;
  questionsAboutRole?: string | null;
  willingnessToRelocate?: boolean | null;
  bestInterviewTime?: string | null;
  interviewResponseSubmittedAt?: Date | string | null;
};

export default function ApplicationDetailPage({ params }: ApplicationDetailPageProps) {
  const resolvedParams = use(params);
  const { locale, id } = resolvedParams;

  const [application, setApplication] = useState<ExtendedApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [deletingResponse, setDeletingResponse] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await fetch(`/api/applications/${id}`);
        if (response.ok) {
          const data: ExtendedApplication = await response.json();
          setApplication(data);
          setNotes(data.adminNotes || '');
        }
      } catch (error) {
        console.error('Error fetching application:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleStatusChange = async (newStatus: ApplicationStatus) => {
    if (!application) return;

    setUpdating(true);
    const result = await updateApplicationStatus(application.id, newStatus);

    if (result.success) {
      setApplication({ ...application, status: newStatus });
    }

    setUpdating(false);
  };

  const handleSaveNotes = async () => {
    if (!application) return;

    setSavingNotes(true);
    const result = await updateApplicationNotes(application.id, notes);

    if (result.success) {
      setApplication({ ...application, adminNotes: notes });
    }

    setSavingNotes(false);
  };

  const handleCopyInterviewLink = async () => {
    if (!application) return;

    const interviewLink = `${window.location.origin}/${locale}/interview/${application.id}`;
    
    try {
      await navigator.clipboard.writeText(interviewLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleShareViaWhatsApp = () => {
    if (!application) return;

    const interviewLink = `${window.location.origin}/${locale}/interview/${application.id}`;
    // Format message with link on separate line to make it clickable in WhatsApp
    // WhatsApp recognizes URLs when they are on their own line with proper spacing
    const message = locale === 'ar'
      ? `مرحباً ${application.applicantName}،\n\nلقد قمنا بدراسة سيرتك الذاتية وهي قابلة للتطبيق تقريباً معنا. يرجى ملء المعلومات التالية للمقابلة:\n\n${interviewLink}`
      : `Hello ${application.applicantName},\n\nWe have studied your CV and it is almost applicable to us. Please fill in the following information for the interview:\n\n${interviewLink}`;
    
    // Validate and attempt to fix phone number automatically
    const phoneValidation = validateAndFixWhatsAppPhone(application.phone);
    
    // If phone is valid (or was fixed), use it; otherwise use generic share (no alert)
    const whatsappUrl = phoneValidation.valid && phoneValidation.formatted
      ? `https://wa.me/${phoneValidation.formatted}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-xl font-semibold mb-2">
              {locale === 'ar' ? 'لم يتم العثور على الطلب' : 'Application Not Found'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {locale === 'ar'
                ? 'الطلب الذي تبحث عنه غير موجود'
                : 'The application you are looking for does not exist'}
            </p>
            <Link href={`/${locale}/admin/applications`}>
              <Button>
                {locale === 'ar' ? <ArrowRight className="h-4 w-4 ml-2" /> : <ArrowLeft className="h-4 w-4 mr-2" />}
                {locale === 'ar' ? 'العودة للقائمة' : 'Back to List'}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formattedDate = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(application.createdAt));

  const availabilityDate = application.availabilityDate
    ? new Date(application.availabilityDate)
    : null;

  const formattedAvailability = availabilityDate
    ? new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(availabilityDate)
    : null;

  const languageLabel = (value: string | null | undefined) => {
    if (!value) return null;
    const map: Record<string, { ar: string; en: string }> = {
      excellent: { ar: 'ممتاز', en: 'Excellent' },
      very_good: { ar: 'جيد جدًا', en: 'Very Good' },
      good: { ar: 'جيد', en: 'Good' },
      fair: { ar: 'مقبول', en: 'Acceptable' },
    };
    const labels = map[value];
    if (!labels) return value;
    return locale === 'ar' ? labels.ar : labels.en;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <Link href={`/${locale}/admin/applications`}>
          <Button variant="ghost" size="sm">
            {locale === 'ar' ? <ArrowRight className="h-4 w-4 ml-2" /> : <ArrowLeft className="h-4 w-4 mr-2" />}
            {locale === 'ar' ? 'العودة للقائمة' : 'Back to List'}
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        {/* Header Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                {application.profileImageUrl && (
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
                    <Image
                      src={application.profileImageUrl}
                      alt={application.applicantName}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {!application.profileImageUrl && (
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}
                <div>
                  <CardTitle className="text-3xl mb-2">{application.applicantName}</CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    <span className="font-medium">{application.position}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ApplicationStatusBadge status={application.status} locale={locale} />
                <Button
                  onClick={handleCopyInterviewLink}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  {linkCopied ? (
                    <>
                      <Check className="h-4 w-4" />
                      {locale === 'ar' ? 'تم النسخ' : 'Copied'}
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      {locale === 'ar' ? 'نسخ الرابط' : 'Copy Link'}
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleShareViaWhatsApp}
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-green-50 hover:bg-green-100 border-green-200 text-green-700 hover:text-green-800"
                >
                  <MessageCircle className="h-4 w-4" />
                  {locale === 'ar' ? 'مشاركة عبر واتساب' : 'Share via WhatsApp'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    {locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </p>
                  <a href={`mailto:${application.email}`} className="text-sm font-medium hover:underline">
                    {application.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    {locale === 'ar' ? 'الهاتف' : 'Phone'}
                  </p>
                  <a href={`tel:${application.phone}`} className="text-sm font-medium hover:underline">
                    {application.phone}
                  </a>
                </div>
              </div>

              {application.currentLocation && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {locale === 'ar' ? 'الموقع الحالي' : 'Current Location'}
                    </p>
                    <p className="text-sm font-medium">{application.currentLocation}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    {locale === 'ar' ? 'تاريخ التقديم' : 'Application Date'}
                  </p>
                  <p className="text-sm font-medium">{formattedDate}</p>
                </div>
              </div>

              {formattedAvailability && (
                <div className="flex items-center gap-3">
                  <CalendarClock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {locale === 'ar' ? 'تاريخ التوفر' : 'Availability Date'}
                    </p>
                    <p className="text-sm font-medium">{formattedAvailability}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    {locale === 'ar' ? 'سنوات الخبرة' : 'Years of Experience'}
                  </p>
                  <p className="text-sm font-medium">
                    {application.yearsOfExperience} {locale === 'ar' ? 'سنة' : 'years'}
                  </p>
                </div>
              </div>
            </div>

            {(application.arabicProficiency || application.englishProficiency) && (
              <div className="flex items-start gap-3">
                <Languages className="h-5 w-5 text-muted-foreground mt-1" />
                <div className="flex flex-wrap gap-2">
                  {application.arabicProficiency && (
                    <Badge variant="secondary">
                      {locale === 'ar' ? 'العربية:' : 'Arabic:'}{' '}
                      {languageLabel(application.arabicProficiency)}
                    </Badge>
                  )}
                  {application.englishProficiency && (
                    <Badge variant="secondary">
                      {locale === 'ar' ? 'الإنجليزية:' : 'English:'}{' '}
                      {languageLabel(application.englishProficiency)}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {application.consentToDataUsage && (
              <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 border border-primary/20 rounded-lg px-3 py-2">
                <ShieldCheck className="h-4 w-4 flex-shrink-0" />
                <span>
                  {locale === 'ar'
                    ? 'تمت موافقة المرشح على استخدام بياناته لأغراض التوظيف'
                    : 'Candidate consented to data usage for recruitment'}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Links Card */}
        {(application.portfolioUrl || application.githubUrl || application.linkedinUrl) && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {locale === 'ar' ? 'الروابط' : 'Links'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {application.portfolioUrl && (
                <a
                  href={application.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Link2 className="h-4 w-4" />
                  {locale === 'ar' ? 'معرض الأعمال' : 'Portfolio'}
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {application.githubUrl && (
                <a
                  href={application.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Link2 className="h-4 w-4" />
                  GitHub
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {application.linkedinUrl && (
                <a
                  href={application.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Link2 className="h-4 w-4" />
                  LinkedIn
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </CardContent>
          </Card>
        )}

        {/* Skills Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {locale === 'ar' ? 'المهارات' : 'Skills'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {application.skills.map((skill, idx) => (
                <Badge key={idx} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cover Letter Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {locale === 'ar' ? 'خطاب التقديم' : 'Cover Letter'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {application.coverLetter}
            </p>
          </CardContent>
        </Card>

        {/* CV Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {locale === 'ar' ? 'السيرة الذاتية' : 'CV / Resume'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <a
              href={application.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                {locale === 'ar' ? 'عرض السيرة الذاتية' : 'View CV'}
              </Button>
            </a>
          </CardContent>
        </Card>

        {/* Interview Response Card */}
        {application.interviewResponseSubmittedAt && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {locale === 'ar' ? 'استجابة المقابلة' : 'Interview Response'}
                </CardTitle>
                <Button
                  onClick={() => setShowDeleteConfirm(true)}
                  variant="destructive"
                  size="sm"
                  className="gap-2"
                  disabled={deletingResponse}
                >
                  {deletingResponse ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {locale === 'ar' ? 'جاري الحذف...' : 'Deleting...'}
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      {locale === 'ar' ? 'حذف الاستجابة' : 'Delete Response'}
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {application.lastJobExitReason && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {locale === 'ar' ? 'آخر وظيفة - لماذا تركتها' : 'Last Job - Why you left'}
                  </p>
                  <p className="text-sm whitespace-pre-wrap">{application.lastJobExitReason}</p>
                </div>
              )}
              {(application.lastSalary || application.expectedSalary) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  {application.lastSalary && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-1">
                          {locale === 'ar' ? '💰 آخر راتب حصل عليه' : '💰 Last Salary Package'}
                        </p>
                        <p className="text-base font-bold text-blue-700 dark:text-blue-300">
                          {application.lastSalary}
                        </p>
                      </div>
                    </div>
                  )}
                  {application.expectedSalary && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-100 mb-1">
                          {locale === 'ar' ? '📈 الراتب المتوقع' : '📈 Expected Salary'}
                        </p>
                        <p className="text-base font-bold text-indigo-700 dark:text-indigo-300">
                          {application.expectedSalary}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {application.canWorkHard !== null && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {locale === 'ar' ? 'القدرة على العمل تحت ظروف صعبة' : 'Can work under hard conditions'}
                  </p>
                  <Badge variant={application.canWorkHard ? 'default' : 'secondary'}>
                    {application.canWorkHard
                      ? locale === 'ar'
                        ? 'نعم'
                        : 'Yes'
                      : locale === 'ar'
                      ? 'لا'
                      : 'No'}
                  </Badge>
                </div>
              )}
              {application.noticePeriod && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {locale === 'ar' ? 'متى يكون جاهزاً للبدء' : 'Ready to start'}
                  </p>
                  <p className="text-sm font-medium">{application.noticePeriod}</p>
                </div>
              )}
              {application.preferredWorkLocation && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {locale === 'ar' ? 'موقع العمل المفضل' : 'Preferred Work Location'}
                  </p>
                  <Badge variant="secondary">
                    {application.preferredWorkLocation === 'OFFICE'
                      ? locale === 'ar'
                        ? 'مكتب'
                        : 'Office'
                      : application.preferredWorkLocation === 'REMOTE'
                      ? locale === 'ar'
                        ? 'عن بُعد'
                        : 'Remote'
                      : locale === 'ar'
                      ? 'هجين'
                      : 'Hybrid'}
                  </Badge>
                </div>
              )}
              {application.whyInterestedInPosition && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {locale === 'ar' ? 'لماذا مهتم بالوظيفة' : 'Why interested in position'}
                  </p>
                  <p className="text-sm whitespace-pre-wrap">{application.whyInterestedInPosition}</p>
                </div>
              )}
              {application.questionsAboutRole && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {locale === 'ar' ? 'أسئلة حول الوظيفة' : 'Questions about role'}
                  </p>
                  <p className="text-sm whitespace-pre-wrap">{application.questionsAboutRole}</p>
                </div>
              )}
              {application.willingnessToRelocate !== null && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {locale === 'ar' ? 'الاستعداد للانتقال' : 'Willingness to relocate'}
                  </p>
                  <Badge variant={application.willingnessToRelocate ? 'default' : 'secondary'}>
                    {application.willingnessToRelocate
                      ? locale === 'ar'
                        ? 'نعم'
                        : 'Yes'
                      : locale === 'ar'
                      ? 'لا'
                      : 'No'}
                  </Badge>
                </div>
              )}
              {application.bestInterviewTime && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {locale === 'ar' ? 'أفضل وقت للمقابلة' : 'Best Time for Interview'}
                  </p>
                  <p className="text-sm font-medium">{application.bestInterviewTime}</p>
                </div>
              )}
              {application.interviewResponseSubmittedAt && (
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    {locale === 'ar' ? 'تم الإرسال في:' : 'Submitted at:'}{' '}
                    {new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    }).format(new Date(application.interviewResponseSubmittedAt))}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Delete Confirmation Dialog */}
        {showDeleteConfirm && (
          <Card className="border-destructive border-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                {locale === 'ar' ? 'تأكيد الحذف' : 'Confirm Deletion'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {locale === 'ar'
                  ? 'هل أنت متأكد من حذف استجابة المقابلة؟ سيتم حذف جميع البيانات المرسلة ويمكن للمستخدم إرسال استجابة جديدة.'
                  : 'Are you sure you want to delete the interview response? All submitted data will be deleted and the user can submit a new response.'}
              </p>
              <div className="flex gap-2 justify-end">
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  variant="outline"
                  disabled={deletingResponse}
                >
                  {locale === 'ar' ? 'إلغاء' : 'Cancel'}
                </Button>
                <Button
                  onClick={async () => {
                    if (!application) return;
                    setDeletingResponse(true);
                    const result = await deleteInterviewResponse(application.id);
                    if (result.success) {
                      setApplication({
                        ...application,
                        lastJobExitReason: null,
                        lastSalary: null,
                        expectedSalary: null,
                        canWorkHard: null,
                        noticePeriod: null,
                        preferredWorkLocation: null,
                        whyInterestedInPosition: null,
                        questionsAboutRole: null,
                        willingnessToRelocate: null,
                        bestInterviewTime: null,
                        interviewResponseSubmittedAt: null,
                      });
                      setShowDeleteConfirm(false);
                    } else {
                      alert(result.error || (locale === 'ar' ? 'فشل الحذف' : 'Failed to delete'));
                    }
                    setDeletingResponse(false);
                  }}
                  variant="destructive"
                  disabled={deletingResponse}
                >
                  {deletingResponse ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {locale === 'ar' ? 'جاري الحذف...' : 'Deleting...'}
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      {locale === 'ar' ? 'حذف' : 'Delete'}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Status Update Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {locale === 'ar' ? 'تحديث الحالة' : 'Update Status'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={application.status === 'PENDING' ? 'default' : 'outline'}
                onClick={() => handleStatusChange('PENDING')}
                disabled={updating}
              >
                {locale === 'ar' ? 'قيد المراجعة' : 'Pending'}
              </Button>
              <Button
                variant={application.status === 'REVIEWED' ? 'default' : 'outline'}
                onClick={() => handleStatusChange('REVIEWED')}
                disabled={updating}
              >
                {locale === 'ar' ? 'تمت المراجعة' : 'Reviewed'}
              </Button>
              <Button
                variant={application.status === 'ACCEPTED' ? 'default' : 'outline'}
                onClick={() => handleStatusChange('ACCEPTED')}
                disabled={updating}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {locale === 'ar' ? 'مقبول' : 'Accepted'}
              </Button>
              <Button
                variant={application.status === 'REJECTED' ? 'default' : 'outline'}
                onClick={() => handleStatusChange('REJECTED')}
                disabled={updating}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {locale === 'ar' ? 'مرفوض' : 'Rejected'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Admin Notes Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {locale === 'ar' ? 'ملاحظات الإدارة' : 'Admin Notes'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border rounded-md bg-background resize-y"
              placeholder={locale === 'ar' ? 'أضف ملاحظاتك هنا...' : 'Add your notes here...'}
            />
            <Button onClick={handleSaveNotes} disabled={savingNotes}>
              {savingNotes ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {locale === 'ar' ? 'جاري الحفظ...' : 'Saving...'}
                </>
              ) : (
                locale === 'ar' ? 'حفظ الملاحظات' : 'Save Notes'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

