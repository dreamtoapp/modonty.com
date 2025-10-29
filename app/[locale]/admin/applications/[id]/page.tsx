'use client';

import { use, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ApplicationStatusBadge } from '@/components/ApplicationStatusBadge';
import { updateApplicationStatus, updateApplicationNotes } from '@/actions/updateApplicationStatus';
import { ArrowLeft, ArrowRight, Mail, Phone, Calendar, Briefcase, Link2, ExternalLink, Loader2, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Application, ApplicationStatus } from '@prisma/client';

interface ApplicationDetailPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default function ApplicationDetailPage({ params }: ApplicationDetailPageProps) {
  const resolvedParams = use(params);
  const { locale, id } = resolvedParams;

  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await fetch(`/api/applications/${id}`);
        if (response.ok) {
          const data = await response.json();
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
              <ApplicationStatusBadge status={application.status} locale={locale} />
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

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    {locale === 'ar' ? 'تاريخ التقديم' : 'Application Date'}
                  </p>
                  <p className="text-sm font-medium">{formattedDate}</p>
                </div>
              </div>

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

