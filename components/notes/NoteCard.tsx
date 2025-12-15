'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NoteType, TargetAudience } from '@prisma/client';
import { Calendar, User, AlertCircle, CheckCircle2, XCircle, Gift, Award, MessageSquare, Reply, ChevronDown, ChevronUp } from 'lucide-react';

interface NoteCardProps {
  note: {
    id: string;
    title: string;
    content: string;
    type: NoteType;
    targetAudience: TargetAudience;
    isImportant: boolean;
    rewardAmount?: number | null;
    rewardCurrency?: string | null;
    expiresAt?: Date | string | null;
    createdBy?: {
      id: string;
      name: string | null;
      email: string;
    } | null;
    targetUser?: {
      id: string;
      name: string | null;
      email: string;
    } | null;
    createdAt: Date | string;
    readBy?: string[];
    replies?: Array<{
      id: string;
      content: string;
      createdAt: Date | string;
      createdBy?: {
        id: string;
        name: string | null;
        email: string;
      } | null;
    }>;
  };
  currentUserId?: string;
  userRole?: string;
  onMarkAsRead?: (noteId: string) => void;
  onEdit?: (note: any) => void;
  onDelete?: (noteId: string) => void;
  onReply?: (noteId: string) => void;
  showActions?: boolean;
  locale?: string;
}

const typeConfig: Record<NoteType, { label: { en: string; ar: string }; icon: any; className: string }> = {
  [NoteType.ANNOUNCEMENT]: {
    label: { en: 'Announcement', ar: 'إعلان' },
    icon: MessageSquare,
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  },
  [NoteType.REWARD]: {
    label: { en: 'Reward', ar: 'مكافأة' },
    icon: Award,
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  },
  [NoteType.TASK]: {
    label: { en: 'Task', ar: 'مهمة' },
    icon: CheckCircle2,
    className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  },
  [NoteType.GENERAL]: {
    label: { en: 'General', ar: 'عام' },
    icon: AlertCircle,
    className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
  },
};

const audienceConfig = {
  [TargetAudience.ALL]: { label: { en: 'All', ar: 'الكل' } },
  [TargetAudience.STAFF]: { label: { en: 'Staff', ar: 'الموظفين' } },
  [TargetAudience.ADMIN]: { label: { en: 'Admin', ar: 'المديرين' } },
  [TargetAudience.SPECIFIC_DEPARTMENT]: { label: { en: 'Department', ar: 'قسم' } },
  [TargetAudience.SPECIFIC_USER]: { label: { en: 'Specific User', ar: 'مستخدم محدد' } },
};

export function NoteCard({
  note,
  currentUserId,
  userRole,
  onMarkAsRead,
  onEdit,
  onDelete,
  onReply,
  showActions = true,
  locale = 'en',
}: NoteCardProps) {
  const router = useRouter();
  const [showRepliesPreview, setShowRepliesPreview] = useState(false);
  const type = typeConfig[note.type] || typeConfig[NoteType.GENERAL];
  const TypeIcon = type.icon;
  const isRTL = locale === 'ar';
  const isRead = currentUserId && note.readBy?.includes(currentUserId);
  const isExpired = note.expiresAt && new Date(note.expiresAt) < new Date();
  const replies = note.replies || [];
  const replyCount = replies.length;
  const canReply = note.targetAudience === TargetAudience.SPECIFIC_USER &&
    currentUserId &&
    (currentUserId === note.targetUser?.id || currentUserId === note.createdBy?.id);
  const previewReplies = replies.slice(-2);

  const handleReplyClick = () => {
    router.push(`/${locale}/admin/notes/${note.id}`);
  };

  const handleViewThreadClick = () => {
    router.push(`/${locale}/admin/notes/${note.id}`);
  };

  return (
    <Card className={`hover:shadow-md transition-shadow ${!isRead ? 'border-primary' : ''}`}>
      <CardHeader className="pb-3">
        <div className={`flex items-start justify-between gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="flex-1 min-w-0">
            <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h3 className="font-semibold text-lg">{note.title}</h3>
              {note.isImportant && (
                <Badge variant="destructive" className="text-xs">
                  {locale === 'ar' ? 'عاجل' : 'Urgent'}
                </Badge>
              )}
              {!isRead && (
                <Badge variant="default" className="text-xs">
                  {locale === 'ar' ? 'جديد' : 'New'}
                </Badge>
              )}
              {isExpired && (
                <Badge variant="secondary" className="text-xs">
                  {locale === 'ar' ? 'منتهي' : 'Expired'}
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className={`flex flex-wrap items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Badge className={type.className} variant="secondary">
            <TypeIcon className="h-3 w-3 mr-1" />
            {type.label[locale as 'en' | 'ar']}
          </Badge>
          <Badge variant="outline">
            {audienceConfig[note.targetAudience].label[locale as 'en' | 'ar']}
          </Badge>
          {note.rewardAmount && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
              {note.rewardAmount} {note.rewardCurrency || 'SAR'}
            </Badge>
          )}
          {replyCount > 0 && (
            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/20">
              <MessageSquare className="h-3 w-3 mr-1" />
              {replyCount} {locale === 'ar' ? 'رد' : replyCount === 1 ? 'reply' : 'replies'}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className={`space-y-2 text-sm ${isRTL ? 'text-right' : ''}`}>
          <p className="text-muted-foreground whitespace-pre-wrap">{note.content}</p>

          {note.targetUser && (
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {locale === 'ar' ? 'مخصص لـ: ' : 'Target: '}
                {note.targetUser.name || note.targetUser.email}
              </span>
            </div>
          )}

          {note.createdBy && (
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {locale === 'ar' ? 'أنشأه: ' : 'Created by: '}
                {note.createdBy.name || note.createdBy.email}
              </span>
            </div>
          )}

          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
                year: 'numeric',
                month: locale === 'ar' ? '2-digit' : 'short',
                day: '2-digit',
              }).format(new Date(note.createdAt))}
            </span>
          </div>

          {note.expiresAt && (
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''} ${isExpired ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground'}`}>
              <Calendar className="h-4 w-4" />
              <span>
                {locale === 'ar' ? 'ينتهي في: ' : 'Expires: '}
                {new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
                  year: 'numeric',
                  month: locale === 'ar' ? '2-digit' : 'short',
                  day: '2-digit',
                }).format(new Date(note.expiresAt))}
              </span>
            </div>
          )}
        </div>

        {replyCount > 0 && (
          <div className="mt-4 pt-4 border-t">
            <button
              onClick={() => setShowRepliesPreview(!showRepliesPreview)}
              className={`flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {showRepliesPreview ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              <span>
                {locale === 'ar'
                  ? `عرض ${replyCount} ${replyCount === 1 ? 'رد' : 'ردود'}`
                  : `Show ${replyCount} ${replyCount === 1 ? 'reply' : 'replies'}`}
              </span>
            </button>
            {showRepliesPreview && (
              <div className={`mt-3 space-y-3 ${isRTL ? 'text-right' : ''}`}>
                {previewReplies.map((reply) => (
                  <div key={reply.id} className="pl-4 border-l-2 border-muted">
                    <div className="text-xs text-muted-foreground mb-1">
                      {reply.createdBy?.name || reply.createdBy?.email || 'Unknown'} •{' '}
                      {new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      }).format(new Date(reply.createdAt))}
                    </div>
                    <p className="text-sm">{reply.content}</p>
                  </div>
                ))}
                {replyCount > 2 && (
                  <div className="text-sm text-muted-foreground">
                    {locale === 'ar'
                      ? `و ${replyCount - 2} ${replyCount - 2 === 1 ? 'رد آخر' : 'ردود أخرى'}...`
                      : `and ${replyCount - 2} more ${replyCount - 2 === 1 ? 'reply' : 'replies'}...`}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {showActions && (
          <div className={`flex items-center gap-2 mt-4 pt-4 border-t ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
            {canReply && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleReplyClick}
              >
                <Reply className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                {locale === 'ar' ? 'رد' : 'Reply'}
              </Button>
            )}
            {replyCount > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleViewThreadClick}
              >
                {locale === 'ar' ? 'عرض المحادثة' : 'View Thread'}
              </Button>
            )}
            {onMarkAsRead && !isRead && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onMarkAsRead(note.id)}
              >
                <CheckCircle2 className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                {locale === 'ar' ? 'تم القراءة' : 'Mark as Read'}
              </Button>
            )}
            {onEdit && (
              <Button size="sm" variant="outline" onClick={() => onEdit(note)}>
                {locale === 'ar' ? 'تعديل' : 'Edit'}
              </Button>
            )}
            {onDelete && (
              <Button size="sm" variant="destructive" onClick={() => onDelete(note.id)}>
                {locale === 'ar' ? 'حذف' : 'Delete'}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}







