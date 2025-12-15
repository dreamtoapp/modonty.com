import { getTranslations } from 'next-intl/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { ProfilePageClient } from './ProfilePageClient';

export default async function SettingsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user || !session.user.id) {
    redirect(`/${locale}/admin/login`);
  }

  const userId = session.user.id;

  // Fetch user with Staff and Application relations
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      lastLogin: true,
      createdAt: true,
    },
  });

  if (!user) {
    redirect(`/${locale}/admin/login`);
  }

  // Fetch Staff relation if exists
  const staff = await prisma.staff.findUnique({
    where: { userId },
    select: {
      department: true,
      employeeId: true,
      status: true,
      officialEmail: true,
      application: {
        select: {
          profileImageUrl: true,
          profileImagePublicId: true,
          position: true,
        },
      },
    },
  });

  // Fetch stats
  const [tasksAssigned, tasksCreated, notesCreated] = await Promise.all([
    prisma.task.count({
      where: { assignedToUserId: userId },
    }),
    prisma.task.count({
      where: { createdByUserId: userId },
    }),
    prisma.managementNote.count({
      where: { createdByUserId: userId },
    }),
  ]);

  return (
    <ProfilePageClient
      user={user}
      staff={staff}
      stats={{
        tasksAssigned,
        tasksCreated,
        notesCreated,
      }}
      locale={locale}
    />
  );
}

