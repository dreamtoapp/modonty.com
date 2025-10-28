import { Application } from '@prisma/client';
import { Card, CardContent, CardHeader } from './ui/card';
import { ApplicationStatusBadge } from './ApplicationStatusBadge';
import { Badge } from './ui/badge';
import { Mail, Phone, Calendar, Briefcase, FileText, ExternalLink, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { getCVFileType } from '@/lib/applications';

interface ApplicationCardProps {
  application: Application;
  locale: string;
}

export function ApplicationCard({ application, locale }: ApplicationCardProps) {
  const formattedDate = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(application.createdAt));

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              {application.profileImageUrl ? (
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
                  <Image
                    src={application.profileImageUrl}
                    alt={application.applicantName}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-1 truncate">{application.applicantName}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Briefcase className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{application.position}</span>
              </div>
            </div>
          </div>
          <ApplicationStatusBadge status={application.status} locale={locale} />
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{application.email}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4 flex-shrink-0" />
          <span>{application.phone}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 flex-shrink-0" />
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">
            {locale === 'ar' ? 'سنوات الخبرة:' : 'Experience:'}
          </span>
          <Badge variant="secondary">{application.yearsOfExperience} {locale === 'ar' ? 'سنة' : 'years'}</Badge>
        </div>

        {/* CV Preview */}
        <div className="flex items-center gap-2 text-sm">
          <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground mr-2">
            {locale === 'ar' ? 'السيرة الذاتية:' : 'CV:'}
          </span>
          <Badge variant="outline" className="text-xs">
            {getCVFileType(application.cvUrl)}
          </Badge>
          <a
            href={application.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center gap-1 text-xs"
          >
            <ExternalLink className="h-3 w-3" />
            {locale === 'ar' ? 'فتح' : 'Open'}
          </a>
        </div>

        <div className="pt-2 border-t">
          <Link href={`/${locale}/admin/applications/${application.id}`}>
            <Button className="w-full" size="sm">
              {locale === 'ar' ? 'عرض التفاصيل' : 'View Details'}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

