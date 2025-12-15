import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';
import { getManagementNotes, getAllManagementNotes } from '@/actions/managementNotes';
import { prisma } from '@/lib/prisma';
import { NotesPageClient } from './NotesPageClient';

export default async function AdministrativeNotesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user || (session.user.role !== UserRole.ADMIN && session.user.role !== UserRole.SUPER_ADMIN && session.user.role !== UserRole.STAFF)) {
    redirect(`/${locale}/admin`);
  }

  const userRole = session.user.role as UserRole;
  const userId = session.user.id;

  const [notesResult, users, staffRecords] = await Promise.all([
    userRole === UserRole.ADMIN || userRole === UserRole.SUPER_ADMIN
      ? getAllManagementNotes()
      : getManagementNotes(userId, userRole),
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
    prisma.staff.findMany({
      select: {
        department: true,
      },
      distinct: ['department'],
    }),
  ]);

  const notes = notesResult.success ? notesResult.notes || [] : [];
  const departments = Array.from(
    new Set(staffRecords.map((s) => s.department).filter(Boolean) as string[])
  );

  console.log('NotesPage - Result success:', notesResult.success);
  console.log('NotesPage - Notes count:', notes.length);
  console.log('NotesPage - User role:', userRole);
  console.log('NotesPage - User ID:', userId);
  if (!notesResult.success) {
    console.error('NotesPage - Error:', notesResult.error);
  }

  return (
    <NotesPageClient
      notes={notes}
      users={users}
      departments={departments}
      currentUserId={userId}
      userRole={userRole}
      locale={locale}
    />
  );
}

