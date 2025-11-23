'use client';

import { use, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';
import { ApplicationStatusBadge } from '@/components/ApplicationStatusBadge';
import { updateApplicationStatus, updateApplicationNotes, updateApplicationPhone, updateScheduledInterviewDate } from '@/actions/updateApplicationStatus';
import { deleteInterviewResponse } from '@/actions/deleteInterviewResponse';
import { getInterviewResult } from '@/actions/interviewResult';
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
  RefreshCw,
  ClipboardCheck,
  Edit,
  Star,
  ThumbsUp,
  ThumbsDown,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  PlayCircle,
  Target,
  TrendingDown,
  Eye,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Application, ApplicationStatus } from '@prisma/client';
import { validateAndFixWhatsAppPhone, analyzeAndFixPhoneNumber } from '@/helpers/whatsappPhone';
import { formatDateTimeWithArabicTime } from '@/helpers/formatDateTime';

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
  scheduledInterviewDate?: Date | string | null;
};

export default function ApplicationDetailPage({ params }: ApplicationDetailPageProps) {
  const resolvedParams = use(params);
  const { locale, id } = resolvedParams;
  const router = useRouter();

  const [application, setApplication] = useState<ExtendedApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [deletingResponse, setDeletingResponse] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [updatingPhone, setUpdatingPhone] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [savingSchedule, setSavingSchedule] = useState(false);
  const [interviewResult, setInterviewResult] = useState<{
    id: string;
    applicationId: string;
    interviewDate: Date | string;
    result: 'PASSED' | 'FAILED' | 'PENDING';
    rating: number | null;
    interviewerName: string | null;
    strengths: string[];
    weaknesses: string[];
    notes: string | null;
    recommendation: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
  } | null>(null);
  const [loadingResult, setLoadingResult] = useState(false);
  const [showStatusConfirm, setShowStatusConfirm] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<ApplicationStatus | null>(null);
  const [showRejectWarning, setShowRejectWarning] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await fetch(`/api/applications/${id}`);
        if (response.ok) {
          const data: ExtendedApplication = await response.json();
          setApplication(data);
          setNotes(data.adminNotes || '');
          if (data.scheduledInterviewDate) {
            const scheduledDateObj = new Date(data.scheduledInterviewDate);
            setScheduledDate(scheduledDateObj.toISOString().split('T')[0]);
            setScheduledTime(scheduledDateObj.toTimeString().slice(0, 5));
          } else {
            setScheduledDate('');
            setScheduledTime('');
          }
        }
      } catch (error) {
        console.error('Error fetching application:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchInterviewResult = async () => {
      setLoadingResult(true);
      try {
        const result = await getInterviewResult(id);
        if (result.success && result.interviewResult) {
          setInterviewResult(result.interviewResult);
        }
      } catch (error) {
        console.error('Error fetching interview result:', error);
      } finally {
        setLoadingResult(false);
      }
    };

    fetchApplication();
    fetchInterviewResult();
  }, [id]);

  const handleStatusChange = async (newStatus: ApplicationStatus) => {
    if (!application) return;

    // Check if rejecting a candidate who passed interview
    if (newStatus === 'REJECTED' && interviewResult?.result === 'PASSED') {
      setPendingStatus(newStatus);
      setShowRejectWarning(true);
      return;
    }

    // Show confirmation for critical status changes
    if (newStatus === 'ACCEPTED' || newStatus === 'REJECTED') {
      setPendingStatus(newStatus);
      setShowStatusConfirm(true);
      return;
    }

    // Direct update for non-critical status changes
    await performStatusChange(newStatus);
  };

  const performStatusChange = async (newStatus: ApplicationStatus) => {
    if (!application) return;

    setUpdating(true);
    const result = await updateApplicationStatus(application.id, newStatus);

    if (result.success) {
      setApplication({ ...application, status: newStatus });
    }

    setUpdating(false);
    setShowStatusConfirm(false);
    setPendingStatus(null);
  };

  const getSuggestedNextAction = () => {
    if (!application) return null;

    if (application.status === 'PENDING') {
      return {
        label: locale === 'ar' ? 'مراجعة الطلب' : 'Review Application',
        action: () => handleStatusChange('REVIEWED'),
        icon: Eye,
        variant: 'default' as const,
      };
    }

    if (application.status === 'REVIEWED' && !application.scheduledInterviewDate) {
      return {
        label: locale === 'ar' ? 'جدولة مقابلة' : 'Schedule Interview',
        action: () => {
          const scheduleSection = document.getElementById('interview-schedule-section');
          scheduleSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        },
        icon: CalendarClock,
        variant: 'default' as const,
      };
    }

    if (application.scheduledInterviewDate && !interviewResult) {
      return {
        label: locale === 'ar' ? 'تسجيل نتيجة المقابلة' : 'Record Interview Result',
        action: () => router.push(`/${locale}/admin/applications/interview-result/${application.id}`),
        icon: ClipboardCheck,
        variant: 'default' as const,
      };
    }

    if (interviewResult?.result === 'PASSED' && application.status !== 'ACCEPTED') {
      return {
        label: locale === 'ar' ? 'قبول المرشح' : 'Accept Candidate',
        action: () => handleStatusChange('ACCEPTED'),
        icon: CheckCircle2,
        variant: 'default' as const,
      };
    }

    return null;
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

  const handleAnalyzePhone = async () => {
    if (!application) return;

    setUpdatingPhone(true);
    const fixedPhone = analyzeAndFixPhoneNumber(application.phone);

    if (fixedPhone === application.phone) {
      setUpdatingPhone(false);
      return;
    }

    const result = await updateApplicationPhone(application.id, fixedPhone);

    if (result.success) {
      setApplication({ ...application, phone: fixedPhone });
    }

    setUpdatingPhone(false);
  };

  const handleSaveSchedule = async () => {
    if (!application) return;

    setSavingSchedule(true);
    
    let scheduledDateTime: Date | null = null;
    if (scheduledDate && scheduledTime) {
      const [year, month, day] = scheduledDate.split('-').map(Number);
      const [hours, minutes] = scheduledTime.split(':').map(Number);
      scheduledDateTime = new Date(year, month - 1, day, hours, minutes);
    }

    const result = await updateScheduledInterviewDate(application.id, scheduledDateTime);

    if (result.success) {
      setApplication({ ...application, scheduledInterviewDate: scheduledDateTime });
    } else {
      alert(result.error || (locale === 'ar' ? 'فشل في حفظ تاريخ المقابلة' : 'Failed to save interview date'));
    }

    setSavingSchedule(false);
  };

  const handleClearSchedule = async () => {
    if (!application) return;

    setSavingSchedule(true);
    const result = await updateScheduledInterviewDate(application.id, null);

    if (result.success) {
      setApplication({ ...application, scheduledInterviewDate: null });
      setScheduledDate('');
      setScheduledTime('');
    } else {
      alert(result.error || (locale === 'ar' ? 'فشل في حذف تاريخ المقابلة' : 'Failed to clear interview date'));
    }

    setSavingSchedule(false);
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

  const handleShareScheduleViaWhatsApp = () => {
    if (!application || !application.scheduledInterviewDate) return;

    const scheduledDate = new Date(application.scheduledInterviewDate);
    
    // Format date using Gregorian calendar (not Hijri) - use en-US for date to ensure Gregorian
    let formattedDate: string;
    if (locale === 'ar') {
      // Use en-US locale for date part (always Gregorian), then format time in Arabic
      const dateFormatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      
      const hours = scheduledDate.getHours();
      const minutes = scheduledDate.getMinutes();
      const hour12 = hours % 12 || 12;
      const minuteStr = minutes.toString().padStart(2, '0');
      const timePeriod = hours < 12 ? 'صباح' : 'مساء';
      
      const dateStr = dateFormatter.format(scheduledDate);
      const timeStr = `${hour12}:${minuteStr} ${timePeriod}`;
      formattedDate = `${dateStr} في ${timeStr}`;
    } else {
      formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(scheduledDate);
    }

    const message = locale === 'ar'
      ? `مرحباً ${application.applicantName}،\n\nنود إبلاغك بأنه تم تحديد موعد المقابلة الشخصية معنا.\n\n📅 *موعد المقابلة:*\n${formattedDate}\n\n⏱️ *مدة المقابلة:* 45 دقيقة\n\nيرجى التأكد من توفر اتصال إنترنت مستقر للمقابلة عبر الفيديو.\n\nهل يمكنك تأكيد الموعد؟`
      : `Hello ${application.applicantName},\n\nWe are pleased to inform you that your interview has been scheduled.\n\n📅 *Interview Date & Time:*\n${formattedDate}\n\n⏱️ *Interview Duration:* 45 minutes\n\nPlease ensure you have a stable internet connection for the video interview.\n\nCan you please confirm the appointment?`;
    
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
            <Button onClick={() => router.back()}>
              {locale === 'ar' ? <ArrowRight className="h-4 w-4 ml-2" /> : <ArrowLeft className="h-4 w-4 mr-2" />}
              {locale === 'ar' ? 'العودة للقائمة' : 'Back to List'}
            </Button>
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

  const suggestedAction = getSuggestedNextAction();

  const getWorkflowProgress = () => {
    const steps = [];
    steps.push({ label: locale === 'ar' ? 'الطلب' : 'Application', completed: true });
    steps.push({ 
      label: locale === 'ar' ? 'المراجعة' : 'Review', 
      completed: application.status !== 'PENDING' 
    });
    steps.push({ 
      label: locale === 'ar' ? 'المقابلة' : 'Interview', 
      completed: !!application.scheduledInterviewDate 
    });
    steps.push({ 
      label: locale === 'ar' ? 'النتيجة' : 'Result', 
      completed: !!interviewResult 
    });
    steps.push({ 
      label: locale === 'ar' ? 'القرار' : 'Decision', 
      completed: application.status === 'ACCEPTED' || application.status === 'REJECTED' 
    });
    return steps;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          {locale === 'ar' ? <ArrowRight className="h-4 w-4 ml-2" /> : <ArrowLeft className="h-4 w-4 mr-2" />}
          {locale === 'ar' ? 'العودة للقائمة' : 'Back to List'}
        </Button>
      </div>

      {/* Quick Actions Bar */}
      <Card className="mb-6 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            {/* Workflow Progress */}
            <div className="flex items-center gap-2 flex-wrap">
              {getWorkflowProgress().map((step, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      step.completed
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : (
                      <Clock className="h-3 w-3" />
                    )}
                    {step.label}
                  </div>
                  {idx < getWorkflowProgress().length - 1 && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2">
              {suggestedAction && (
                <Button
                  onClick={suggestedAction.action}
                  size="sm"
                  variant={suggestedAction.variant}
                  className="gap-2"
                >
                  <suggestedAction.icon className="h-4 w-4" />
                  {suggestedAction.label}
                </Button>
              )}
              
              <Button
                onClick={() => window.open(application.cvUrl, '_blank')}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                {locale === 'ar' ? 'عرض السيرة الذاتية' : 'View CV'}
              </Button>

              <Button
                onClick={handleShareViaWhatsApp}
                variant="outline"
                size="sm"
                className="gap-2 bg-green-50 hover:bg-green-100 border-green-200 text-green-700"
              >
                <MessageCircle className="h-4 w-4" />
                {locale === 'ar' ? 'واتساب' : 'WhatsApp'}
              </Button>

              <a
                href={`mailto:${application.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                <Mail className="h-4 w-4" />
                {locale === 'ar' ? 'بريد إلكتروني' : 'Email'}
              </a>

              {application.scheduledInterviewDate && !interviewResult && (
                <Link href={`/${locale}/admin/applications/interview-result/${application.id}`}>
                  <Button variant="outline" size="sm" className="gap-2 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100">
                    <ClipboardCheck className="h-4 w-4" />
                    {locale === 'ar' ? 'تسجيل النتيجة' : 'Record Result'}
                  </Button>
                </Link>
              )}

              {interviewResult && (
                <Link href={`/${locale}/admin/applications/interview-result/${application.id}`}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit className="h-4 w-4" />
                    {locale === 'ar' ? 'تعديل النتيجة' : 'Edit Result'}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {/* Header Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                {application.profileImageUrl && (
                  <button
                    onClick={() => setShowImageDialog(true)}
                    className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0 hover:border-primary/40 transition-colors cursor-pointer"
                  >
                    <Image
                      src={application.profileImageUrl}
                      alt={application.applicantName}
                      fill
                      className="object-cover"
                    />
                  </button>
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
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">
                    {locale === 'ar' ? 'الهاتف' : 'Phone'}
                  </p>
                  <div className="flex items-center gap-2">
                    <a href={`tel:${application.phone}`} className="text-sm font-medium hover:underline">
                      {application.phone}
                    </a>
                    <Button
                      onClick={handleAnalyzePhone}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      disabled={updatingPhone}
                      title={locale === 'ar' ? 'تحليل وتحديث رقم الهاتف' : 'Analyze and update phone number'}
                    >
                      {updatingPhone ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <RefreshCw className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
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

        {/* At-a-Glance Summary Card */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              {locale === 'ar' ? 'ملخص سريع' : 'At-a-Glance Summary'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  {locale === 'ar' ? 'الخبرة' : 'Experience'}
                </p>
                <p className="text-lg font-bold">{application.yearsOfExperience} {locale === 'ar' ? 'سنة' : 'yrs'}</p>
              </div>
              {interviewResult && interviewResult.rating !== null && (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    {locale === 'ar' ? 'التقييم' : 'Rating'}
                  </p>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <p className="text-lg font-bold">{interviewResult.rating}/10</p>
                  </div>
                </div>
              )}
              {application.interviewResponseSubmittedAt && (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    {locale === 'ar' ? 'تم الرد' : 'Responded'}
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    <CheckCircle2 className="h-4 w-4 inline" /> {locale === 'ar' ? 'نعم' : 'Yes'}
                  </p>
                </div>
              )}
              {interviewResult && (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    {locale === 'ar' ? 'نتيجة المقابلة' : 'Interview Result'}
                  </p>
                  <div>
                    {interviewResult.result === 'PASSED' && (
                      <Badge className="bg-green-600 text-white">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {locale === 'ar' ? 'نجح' : 'Passed'}
                      </Badge>
                    )}
                    {interviewResult.result === 'FAILED' && (
                      <Badge className="bg-red-600 text-white">
                        <ThumbsDown className="h-3 w-3 mr-1" />
                        {locale === 'ar' ? 'فشل' : 'Failed'}
                      </Badge>
                    )}
                    {interviewResult.result === 'PENDING' && (
                      <Badge variant="secondary">
                        {locale === 'ar' ? 'قيد المراجعة' : 'Pending'}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Decision Support Info */}
            {interviewResult && (interviewResult.strengths.length > 0 || interviewResult.weaknesses.length > 0) && (
              <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
                {interviewResult.strengths.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-green-700 mb-1 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {locale === 'ar' ? 'نقاط القوة الرئيسية' : 'Key Strengths'}
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-0.5">
                      {interviewResult.strengths.slice(0, 3).map((s, idx) => (
                        <li key={idx}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {interviewResult.weaknesses.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-red-700 mb-1 flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" />
                      {locale === 'ar' ? 'نقاط تحتاج تحسين' : 'Areas to Improve'}
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-0.5">
                      {interviewResult.weaknesses.slice(0, 3).map((w, idx) => (
                        <li key={idx}>• {w}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
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

        {/* Interview Schedule Card */}
        <Card id="interview-schedule-section" className={!application.scheduledInterviewDate ? 'border-dashed border-2 border-muted-foreground/20' : ''}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarClock className="h-5 w-5" />
                {locale === 'ar' ? 'جدولة المقابلة' : 'Interview Schedule'}
              </CardTitle>
              {!application.scheduledInterviewDate && application.status === 'REVIEWED' && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {locale === 'ar' ? 'إجراء مطلوب' : 'Action Required'}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {!application.scheduledInterviewDate ? (
              <div className="text-center py-6 px-4 bg-muted/30 rounded-lg border-2 border-dashed border-muted">
                <CalendarClock className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm font-medium mb-1">
                  {locale === 'ar' ? 'لم يتم جدولة مقابلة بعد' : 'No interview scheduled yet'}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  {locale === 'ar' 
                    ? 'يُنصح بجدولة مقابلة مع المرشح للمتابعة في عملية التوظيف'
                    : 'Schedule an interview with the candidate to proceed with the hiring process'}
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <CalendarClock className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">
                    {locale === 'ar' ? 'تاريخ المقابلة المجدول' : 'Scheduled Interview Date'}
                  </p>
                  <p className="text-sm font-medium">
                    {formatDateTimeWithArabicTime(application.scheduledInterviewDate, locale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  {locale === 'ar' ? (
                    <p className="text-xs text-muted-foreground mt-1">
                      يمكنك تعديل التاريخ والوقت أدناه
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground mt-1">
                      You can update the date and time below
                    </p>
                  )}
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="scheduledDate">
                  {locale === 'ar' ? 'تاريخ المقابلة' : 'Interview Date'}
                </Label>
                <Input
                  id="scheduledDate"
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  disabled={savingSchedule}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scheduledTime">
                  {locale === 'ar' ? 'وقت المقابلة' : 'Interview Time'}
                </Label>
                <Input
                  id="scheduledTime"
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  disabled={savingSchedule}
                />
                {locale === 'ar' && (
                  <p className="text-xs text-muted-foreground">
                    💡 تلميح: سيتم عرض الوقت بصيغة عربية (صباح/مساء) - AM = صباح، PM = مساء
                  </p>
                )}
                {locale === 'en' && (
                  <p className="text-xs text-muted-foreground">
                    💡 Hint: Time will be displayed in Arabic format (صباح/مساء) - AM = صباح (Morning), PM = مساء (Evening)
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={handleSaveSchedule}
                disabled={savingSchedule || (!scheduledDate || !scheduledTime)}
              >
                {savingSchedule ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {locale === 'ar' ? 'جاري الحفظ...' : 'Saving...'}
                  </>
                ) : application.scheduledInterviewDate ? (
                  locale === 'ar' ? 'تحديث الموعد' : 'Update Schedule'
                ) : (
                  locale === 'ar' ? 'حفظ الموعد' : 'Save Schedule'
                )}
              </Button>
              {application.scheduledInterviewDate && (
                <>
                  <Button
                    onClick={handleShareScheduleViaWhatsApp}
                    variant="outline"
                    className="gap-2 bg-green-50 hover:bg-green-100 border-green-200 text-green-700 hover:text-green-800"
                    disabled={savingSchedule}
                  >
                    <MessageCircle className="h-4 w-4" />
                    {locale === 'ar' ? 'مشاركة عبر واتساب' : 'Share via WhatsApp'}
                  </Button>
                  <Button
                    onClick={handleClearSchedule}
                    variant="outline"
                    disabled={savingSchedule}
                  >
                    {savingSchedule ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {locale === 'ar' ? 'جاري الحذف...' : 'Clearing...'}
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4 mr-2" />
                        {locale === 'ar' ? 'حذف الموعد' : 'Clear Schedule'}
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Interview Result Card */}
        <Card className={!interviewResult && application.scheduledInterviewDate ? 'border-dashed border-2 border-orange-200 bg-orange-50/30' : ''}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5" />
                {locale === 'ar' ? 'نتيجة المقابلة' : 'Interview Result'}
              </CardTitle>
              {interviewResult ? (
                <Link href={`/${locale}/admin/applications/interview-result/${application.id}`}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit className="h-4 w-4" />
                    {locale === 'ar' ? 'تعديل' : 'Edit'}
                  </Button>
                </Link>
              ) : application.scheduledInterviewDate ? (
                <>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    {locale === 'ar' ? 'إجراء مطلوب' : 'Action Required'}
                  </Badge>
                </>
              ) : null}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {!interviewResult && application.scheduledInterviewDate ? (
              <div className="text-center py-6 px-4 bg-orange-50/50 rounded-lg border-2 border-dashed border-orange-200">
                <ClipboardCheck className="h-12 w-12 mx-auto mb-3 text-orange-500" />
                <p className="text-sm font-medium mb-1">
                  {locale === 'ar' ? 'لم يتم تسجيل نتيجة المقابلة بعد' : 'Interview result not recorded yet'}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  {locale === 'ar'
                    ? 'تم جدولة المقابلة - يُرجى تسجيل النتيجة بعد إجراء المقابلة'
                    : 'Interview is scheduled - Please record the result after conducting the interview'}
                </p>
                <Link href={`/${locale}/admin/applications/interview-result/${application.id}`}>
                  <Button variant="default" className="gap-2">
                    <ClipboardCheck className="h-4 w-4" />
                    {locale === 'ar' ? 'تسجيل النتيجة الآن' : 'Record Result Now'}
                  </Button>
                </Link>
              </div>
            ) : !interviewResult ? (
              <div className="text-center py-6 px-4 bg-muted/30 rounded-lg border-2 border-dashed border-muted">
                <ClipboardCheck className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm font-medium mb-1">
                  {locale === 'ar' ? 'لا توجد نتيجة مقابلة' : 'No interview result'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {locale === 'ar'
                    ? 'سيتم عرض نتيجة المقابلة هنا بعد تسجيلها'
                    : 'Interview result will appear here after recording'}
                </p>
              </div>
            ) : (
              <>
              {/* Interview Date and Result */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {locale === 'ar' ? 'تاريخ المقابلة' : 'Interview Date'}
                  </p>
                  <p className="text-sm font-medium">
                    {formatDateTimeWithArabicTime(interviewResult.interviewDate, locale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {locale === 'ar' ? 'النتيجة' : 'Result'}
                  </p>
                  <div>
                    {interviewResult.result === 'PASSED' && (
                      <Badge className="bg-green-600 hover:bg-green-700 text-white">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {locale === 'ar' ? 'نجح' : 'Passed'}
                      </Badge>
                    )}
                    {interviewResult.result === 'FAILED' && (
                      <Badge className="bg-red-600 hover:bg-red-700 text-white">
                        <ThumbsDown className="h-3 w-3 mr-1" />
                        {locale === 'ar' ? 'فشل' : 'Failed'}
                      </Badge>
                    )}
                    {interviewResult.result === 'PENDING' && (
                      <Badge variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                        {locale === 'ar' ? 'قيد المراجعة' : 'Pending'}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Rating and Interviewer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {interviewResult.rating !== null && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {locale === 'ar' ? 'التقييم' : 'Rating'}
                    </p>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <p className="text-sm font-medium">
                        {interviewResult.rating}/10
                      </p>
                    </div>
                  </div>
                )}
                {interviewResult.interviewerName && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {locale === 'ar' ? 'اسم المقابل' : 'Interviewer'}
                    </p>
                    <p className="text-sm font-medium">{interviewResult.interviewerName}</p>
                  </div>
                )}
              </div>

              {/* Strengths */}
              {interviewResult.strengths && interviewResult.strengths.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {locale === 'ar' ? 'نقاط القوة' : 'Strengths'}
                  </p>
                  <ul className="space-y-1">
                    {interviewResult.strengths.map((strength, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Weaknesses */}
              {interviewResult.weaknesses && interviewResult.weaknesses.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {locale === 'ar' ? 'نقاط الضعف' : 'Weaknesses'}
                  </p>
                  <ul className="space-y-1">
                    {interviewResult.weaknesses.map((weakness, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Notes */}
              {interviewResult.notes && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {locale === 'ar' ? 'ملاحظات' : 'Notes'}
                  </p>
                  <p className="text-sm whitespace-pre-wrap bg-muted/50 p-3 rounded-md">
                    {interviewResult.notes}
                  </p>
                </div>
              )}

              {/* Recommendation */}
              {interviewResult.recommendation && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {locale === 'ar' ? 'التوصية' : 'Recommendation'}
                  </p>
                  <p className="text-sm whitespace-pre-wrap bg-primary/10 p-3 rounded-md border border-primary/20">
                    {interviewResult.recommendation}
                  </p>
                </div>
              )}

              {/* Last Updated */}
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  {locale === 'ar' ? 'آخر تحديث:' : 'Last updated:'}{' '}
                  {formatDateTimeWithArabicTime(interviewResult.updatedAt, locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Status Update Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5" />
              {locale === 'ar' ? 'تحديث الحالة' : 'Update Status'}
            </CardTitle>
            {interviewResult?.result === 'PASSED' && application.status !== 'ACCEPTED' && (
              <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
                <AlertCircle className="h-4 w-4" />
                {locale === 'ar' 
                  ? '💡 المرشح نجح في المقابلة - يُنصح بقبوله'
                  : '💡 Candidate passed interview - Consider accepting'}
              </p>
            )}
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

        {/* Supporting Information Section */}
        <div className="border-t pt-6 space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {locale === 'ar' ? 'معلومات إضافية' : 'Additional Information'}
          </h2>

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
        </div>

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

      {/* Image Dialog */}
      {application.profileImageUrl && (
        <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] w-[90vw] p-4 sm:p-6 overflow-auto">
            <DialogTitle className="sr-only">
              {locale === 'ar' ? 'صورة الملف الشخصي' : 'Profile Image'} - {application.applicantName}
            </DialogTitle>
            <div className="relative w-full h-[calc(90vh-8rem)] min-h-[300px] max-h-[calc(90vh-8rem)]">
              <Image
                src={application.profileImageUrl}
                alt={application.applicantName}
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 90vw, 80vw"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Status Change Confirmation Dialog */}
      <Dialog open={showStatusConfirm} onOpenChange={setShowStatusConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {locale === 'ar' ? 'تأكيد تغيير الحالة' : 'Confirm Status Change'}
            </DialogTitle>
            <DialogDescription>
              {pendingStatus === 'ACCEPTED' && (
                <>
                  {locale === 'ar' 
                    ? `هل أنت متأكد من قبول المرشح "${application.applicantName}"؟ سيتم تغيير حالة الطلب إلى "مقبول".`
                    : `Are you sure you want to accept candidate "${application.applicantName}"? The application status will be changed to "Accepted".`}
                </>
              )}
              {pendingStatus === 'REJECTED' && (
                <>
                  {locale === 'ar'
                    ? `هل أنت متأكد من رفض المرشح "${application.applicantName}"؟ سيتم تغيير حالة الطلب إلى "مرفوض".`
                    : `Are you sure you want to reject candidate "${application.applicantName}"? The application status will be changed to "Rejected".`}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowStatusConfirm(false);
                setPendingStatus(null);
              }}
            >
              {locale === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button
              onClick={() => pendingStatus && performStatusChange(pendingStatus)}
              className={pendingStatus === 'REJECTED' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              {locale === 'ar' ? 'تأكيد' : 'Confirm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Warning Dialog (for candidates who passed interview) */}
      <Dialog open={showRejectWarning} onOpenChange={setShowRejectWarning}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-yellow-600">
              <AlertTriangle className="h-5 w-5" />
              {locale === 'ar' ? 'تحذير' : 'Warning'}
            </DialogTitle>
            <DialogDescription className="space-y-2">
              <p>
                {locale === 'ar'
                  ? `هذا المرشح "${application.applicantName}" نجح في المقابلة (التقييم: ${interviewResult?.rating}/10).`
                  : `This candidate "${application.applicantName}" passed the interview (Rating: ${interviewResult?.rating}/10).`}
              </p>
              <p className="font-semibold">
                {locale === 'ar'
                  ? 'هل أنت متأكد من رفضه؟'
                  : 'Are you sure you want to reject them?'}
              </p>
              {interviewResult?.strengths && interviewResult.strengths.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs font-semibold mb-1">
                    {locale === 'ar' ? 'نقاط القوة:' : 'Strengths:'}
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-0.5">
                    {interviewResult.strengths.slice(0, 3).map((s, idx) => (
                      <li key={idx}>• {s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowRejectWarning(false);
                setPendingStatus(null);
              }}
              className="w-full sm:w-auto"
            >
              {locale === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button
              onClick={() => {
                setShowRejectWarning(false);
                setShowStatusConfirm(true);
              }}
              variant="outline"
              className="bg-yellow-600 hover:bg-yellow-700 text-white w-full sm:w-auto"
            >
              {locale === 'ar' ? 'متابعة مع التحذير' : 'Continue with Warning'}
            </Button>
            <Button
              onClick={() => pendingStatus && performStatusChange(pendingStatus)}
              className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
            >
              {locale === 'ar' ? 'رفض مباشرة' : 'Reject Anyway'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

