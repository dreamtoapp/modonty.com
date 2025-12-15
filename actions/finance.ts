'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import type { FinanceData } from '@/helpers/financialCalculations';

export interface UpdateFinanceDataResult {
  success: boolean;
  error?: string;
}

export async function updateFinanceData(data: FinanceData): Promise<UpdateFinanceDataResult> {
  try {
    const session = await auth();

    if (!session?.user || (session.user.role !== UserRole.ADMIN && session.user.role !== UserRole.SUPER_ADMIN)) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    // Validate data structure
    if (!data || typeof data !== 'object') {
      return {
        success: false,
        error: 'Invalid finance data: data must be an object',
      };
    }

    if (!data.currency || typeof data.currency !== 'string') {
      return {
        success: false,
        error: 'Invalid finance data: currency is required',
      };
    }

    // Note: Costs are now stored in Cost table, not in FinanceData
    // Remove costs from data before saving
    const { costs, ...dataWithoutCosts } = data;

    // Note: FinanceData model does not exist in schema
    // This function is kept for backward compatibility but does not persist data
    // Finance data should be calculated from Transaction and Cost models instead

    // Revalidate paths that use finance data
    revalidatePath('/ar/admin/costs');
    revalidatePath('/ar/admin/bmc');

    return {
      success: true,
    };
  } catch (error) {
    console.error('updateFinanceData error:', error);
    return {
      success: false,
      error: 'Failed to update finance data',
    };
  }
}













