'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { UserRole, CostType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export interface GetCostsResult {
  success: boolean;
  costs?: Array<{
    id: string;
    label: string;
    amount: number;
    description: string | null;
    categoryKey: string;
    costType: CostType;
    isActive: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
  }>;
  error?: string;
}

export async function getCosts(
  categoryKey?: string,
  costType?: CostType
): Promise<GetCostsResult> {
  try {
    const where: any = {};
    if (categoryKey) {
      where.category = {
        key: categoryKey,
      };
    }
    if (costType) {
      where.type = costType;
    }

    const costs = await prisma.cost.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: [
        { category: { key: 'asc' } },
        { createdAt: 'asc' },
      ],
    });

    const mappedCosts = costs.map((cost) => ({
      id: cost.id,
      label: cost.name,
      amount: cost.amount,
      description: cost.description,
      categoryKey: cost.category?.key || '',
      costType: cost.type,
      isActive: true,
      order: 0,
      createdAt: cost.createdAt,
      updatedAt: cost.updatedAt,
    }));

    return {
      success: true,
      costs: mappedCosts,
    };
  } catch (error) {
    console.error('getCosts error:', error);
    return {
      success: false,
      error: 'Failed to fetch costs',
      costs: [],
    };
  }
}

export interface GetCostsByCategoryResult {
  success: boolean;
  costsByCategory?: Record<string, Array<{
    id: string;
    label: string;
    amount: number;
    description: string | null;
    costType: CostType;
    order: number;
  }>>;
  error?: string;
}

export async function getCostsByCategory(): Promise<GetCostsByCategoryResult> {
  try {
    const costs = await prisma.cost.findMany({
      include: {
        category: true,
      },
      orderBy: [
        { category: { key: 'asc' } },
        { createdAt: 'asc' },
      ],
    });

    const costsByCategory: GetCostsByCategoryResult['costsByCategory'] = {};

    for (const cost of costs) {
      const categoryKey = cost.category?.key || '';
      if (!costsByCategory[categoryKey]) {
        costsByCategory[categoryKey] = [];
      }
      costsByCategory[categoryKey]!.push({
        id: cost.id,
        label: cost.name,
        amount: cost.amount,
        description: cost.description,
        costType: cost.type,
        order: 0,
      });
    }

    return {
      success: true,
      costsByCategory,
    };
  } catch (error) {
    console.error('getCostsByCategory error:', error);
    return {
      success: false,
      error: 'Failed to fetch costs by category',
    };
  }
}

export interface CreateCostResult {
  success: boolean;
  id?: string;
  error?: string;
}

export async function createCost(data: {
  label: string;
  amount: number;
  description?: string | null;
  categoryKey: string;
  costType: CostType;
  order?: number;
}): Promise<CreateCostResult> {
  try {
    const session = await auth();

    if (
      !session?.user ||
      (session.user.role !== UserRole.ADMIN &&
        session.user.role !== UserRole.SUPER_ADMIN)
    ) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { key: data.categoryKey },
    });

    if (!category) {
      return {
        success: false,
        error: `Category "${data.categoryKey}" not found`,
      };
    }

    const created = await prisma.cost.create({
      data: {
        name: data.label,
        amount: data.amount,
        description: data.description || null,
        categoryId: category.id,
        type: data.costType,
        date: new Date(),
      },
    });

    revalidatePath('/ar/admin/costs');
    revalidatePath('/en/admin/costs');
    revalidatePath('/ar/admin/bmc');
    revalidatePath('/en/admin/bmc');

    return {
      success: true,
      id: created.id,
    };
  } catch (error) {
    console.error('createCost error:', error);
    return {
      success: false,
      error: 'Failed to create cost',
    };
  }
}

export interface UpdateCostResult {
  success: boolean;
  error?: string;
}

export async function updateCost(
  id: string,
  data: {
    label?: string;
    amount?: number;
    description?: string | null;
    categoryKey?: string;
    costType?: CostType;
    isActive?: boolean;
    order?: number;
  }
): Promise<UpdateCostResult> {
  try {
    const session = await auth();

    if (
      !session?.user ||
      (session.user.role !== UserRole.ADMIN &&
        session.user.role !== UserRole.SUPER_ADMIN)
    ) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    // Check if cost exists
    const existing = await prisma.cost.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        error: 'Cost not found',
      };
    }

    const updateData: any = {};

    if (data.label !== undefined) updateData.name = data.label;
    if (data.amount !== undefined) updateData.amount = data.amount;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.costType !== undefined) updateData.type = data.costType;

    // If categoryKey is being updated, verify new category exists
    if (data.categoryKey) {
      const existingCategory = await prisma.category.findFirst({
        where: {
          costs: {
            some: { id }
          }
        }
      });

      if (existingCategory?.key !== data.categoryKey) {
        const category = await prisma.category.findUnique({
          where: { key: data.categoryKey },
        });

        if (!category) {
          return {
            success: false,
            error: `Category "${data.categoryKey}" not found`,
          };
        }
        updateData.categoryId = category.id;
      }
    }

    await prisma.cost.update({
      where: { id },
      data: updateData,
    });

    revalidatePath('/ar/admin/costs');
    revalidatePath('/en/admin/costs');
    revalidatePath('/ar/admin/bmc');
    revalidatePath('/en/admin/bmc');

    return {
      success: true,
    };
  } catch (error) {
    console.error('updateCost error:', error);
    return {
      success: false,
      error: 'Failed to update cost',
    };
  }
}

export interface DeleteCostResult {
  success: boolean;
  error?: string;
}

export async function deleteCost(id: string): Promise<DeleteCostResult> {
  try {
    const session = await auth();

    if (
      !session?.user ||
      (session.user.role !== UserRole.ADMIN &&
        session.user.role !== UserRole.SUPER_ADMIN)
    ) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    // Check if cost exists
    const existing = await prisma.cost.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        error: 'Cost not found',
      };
    }

    await prisma.cost.delete({
      where: { id },
    });

    revalidatePath('/ar/admin/costs');
    revalidatePath('/en/admin/costs');
    revalidatePath('/ar/admin/bmc');
    revalidatePath('/en/admin/bmc');

    return {
      success: true,
    };
  } catch (error) {
    console.error('deleteCost error:', error);
    return {
      success: false,
      error: 'Failed to delete cost',
    };
  }
}

export interface GetCostsAggregatedResult {
  success: boolean;
  costs?: {
    fixed: Record<string, Array<{
      id: string;
      label: string;
      amount: number;
      description: string | null;
      order: number;
    }>>;
    variable: Record<string, Array<{
      id: string;
      label: string;
      amount: number;
      description: string | null;
      order: number;
    }>>;
  };
  error?: string;
}

export async function getCostsAggregated(): Promise<GetCostsAggregatedResult> {
  try {
    const costs = await prisma.cost.findMany({
      include: {
        category: true,
      },
      orderBy: [
        { category: { key: 'asc' } },
        { createdAt: 'asc' },
      ],
    });

    const fixed: Record<string, Array<{
      id: string;
      label: string;
      amount: number;
      description: string | null;
      order: number;
    }>> = {};
    const variable: Record<string, Array<{
      id: string;
      label: string;
      amount: number;
      description: string | null;
      order: number;
    }>> = {};

    for (const cost of costs) {
      const categoryKey = cost.category?.key || '';
      const costData = {
        id: cost.id,
        label: cost.name,
        amount: cost.amount,
        description: cost.description,
        order: 0,
      };

      if (cost.type === CostType.FIXED) {
        if (!fixed[categoryKey]) {
          fixed[categoryKey] = [];
        }
        fixed[categoryKey]!.push(costData);
      } else {
        if (!variable[categoryKey]) {
          variable[categoryKey] = [];
        }
        variable[categoryKey]!.push(costData);
      }
    }

    return {
      success: true,
      costs: {
        fixed,
        variable,
      },
    };
  } catch (error) {
    console.error('getCostsAggregated error:', error);
    return {
      success: false,
      error: 'Failed to fetch aggregated costs',
    };
  }
}











