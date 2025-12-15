import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { UserRole, TargetAudience } from '@prisma/client';
import { getNoteThread } from '@/actions/managementNotes';
import { prisma } from '@/lib/prisma';
import { NoteThreadClient } from './NoteThreadClient';

export default async function NoteThreadPage({
  params
}: {
  params: Promise<{ locale: string; noteId: string }>;
}) {
  const { locale, noteId } = await params;
  const session = await auth();

  if (!session?.user || (session.user.role !== UserRole.ADMIN && session.user.role !== UserRole.SUPER_ADMIN && session.user.role !== UserRole.STAFF)) {
    redirect(`/${locale}/admin`);
  }

  const userId = session.user.id;
  const userRole = session.user.role as UserRole;

  const [threadResult, users] = await Promise.all([
    getNoteThread(noteId),
    prisma.user.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        name: 'asc',
      },
    }),
  ]);

  if (!threadResult.success || !threadResult.note) {
    notFound();
  }

  const note = threadResult.note;

  const targetUserId = note.targetUserId || note.targetUser?.id;

  if (note.targetAudience !== TargetAudience.SPECIFIC_USER || !targetUserId) {
    notFound();
  }

  const canView = userRole === UserRole.ADMIN ||
    userRole === UserRole.SUPER_ADMIN ||
    userId === targetUserId ||
    userId === note.createdBy?.id;

  if (!canView) {
    redirect(`/${locale}/admin/notes`);
  }

  return (
    <NoteThreadClient
      note={note}
      currentUserId={userId}
      userRole={userRole}
      locale={locale}
      users={users}
    />
  );
}






