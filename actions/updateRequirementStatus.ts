'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export type RequirementStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export async function updateRequirementStatus(id: string, status: RequirementStatus) {
  try {
    const cookieStore = await cookies();
    const adminToken = cookieStore.get('adminToken');
    if (!adminToken) {
      return { success: false, error: 'Unauthorized' };
    }

    await prisma.phase1Requirement.update({
      where: { id },
      data: { status },
    });

    revalidatePath('/[locale]/admin/phase-1-requirements', 'page');
    return { success: true };
  } catch (error) {
    console.error('Error updating requirement status:', error);
    return { success: false, error: 'Failed to update status' };
  }
}

