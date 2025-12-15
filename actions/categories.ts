'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { UserRole, CategoryType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export interface GetCategoriesResult {
  success: boolean;
  categories?: Array<{
    id: string;
    key: string;
    label: string;
    parentKey: string | null;
    type: CategoryType;
    isActive: boolean;
    order: number;
  }>;
  error?: string;
}

export async function getCategories(type?: CategoryType): Promise<GetCategoriesResult> {
  try {
    const categories = await prisma.category.findMany({
      where: type ? { type } : {},
      orderBy: [
        { order: 'asc' },
        { label: 'asc' },
      ],
      select: {
        id: true,
        key: true,
        label: true,
        parentKey: true,
        type: true,
        isActive: true,
        order: true,
      },
    });

    return {
      success: true,
      categories,
    };
  } catch (error) {
    console.error('getCategories error:', error);
    return {
      success: false,
      error: 'Failed to fetch categories',
      categories: [],
    };
  }
}

export interface GetCategoryTreeResult {
  success: boolean;
  categories?: Array<{
    id: string;
    key: string;
    label: string;
    parentKey: string | null;
    type: CategoryType;
    isActive: boolean;
    order: number;
    children?: Array<{
      id: string;
      key: string;
      label: string;
      parentKey: string | null;
      type: CategoryType;
      isActive: boolean;
      order: number;
    }>;
  }>;
  error?: string;
}

export async function getCategoryTree(): Promise<GetCategoryTreeResult> {
  try {
    const allCategories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: [
        { order: 'asc' },
        { label: 'asc' },
      ],
      select: {
        id: true,
        key: true,
        label: true,
        parentKey: true,
        type: true,
        isActive: true,
        order: true,
      },
    });

    // Build tree structure
    const mainCategories = allCategories.filter(c => !c.parentKey);
    const subcategories = allCategories.filter(c => c.parentKey);

    const tree = mainCategories.map(main => ({
      ...main,
      children: subcategories
        .filter(sub => sub.parentKey === main.key)
        .sort((a, b) => a.order - b.order),
    }));

    return {
      success: true,
      categories: tree,
    };
  } catch (error) {
    console.error('getCategoryTree error:', error);
    return {
      success: false,
      error: 'Failed to fetch category tree',
      categories: [],
    };
  }
}

export interface CreateCategoryResult {
  success: boolean;
  error?: string;
}

export async function createCategory(data: {
  key: string;
  label: string;
  parentKey?: string | null;
  type: CategoryType;
  order?: number;
}): Promise<CreateCategoryResult> {
  try {
    const session = await auth();

    if (!session?.user || (session.user.role !== UserRole.ADMIN && session.user.role !== UserRole.SUPER_ADMIN)) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    // Check if key already exists
    const existing = await prisma.category.findUnique({
      where: { key: data.key },
    });

    if (existing) {
      return {
        success: false,
        error: 'Category with this key already exists',
      };
    }

    // If parentKey provided, verify parent exists
    if (data.parentKey) {
      const parent = await prisma.category.findUnique({
        where: { key: data.parentKey },
      });

      if (!parent) {
        return {
          success: false,
          error: 'Parent category not found',
        };
      }
    }

    await prisma.category.create({
      data: {
        key: data.key,
        label: data.label,
        parentKey: data.parentKey || null,
        type: data.type,
        order: data.order || 0,
        isActive: true,
      },
    });

    revalidatePath('/ar/admin/categories');
    revalidatePath('/ar/admin/costs');

    return {
      success: true,
    };
  } catch (error) {
    console.error('createCategory error:', error);
    return {
      success: false,
      error: 'Failed to create category',
    };
  }
}

export interface UpdateCategoryResult {
  success: boolean;
  error?: string;
}

export async function updateCategory(
  key: string,
  data: {
    label?: string;
    parentKey?: string | null;
    type?: CategoryType;
    order?: number;
    isActive?: boolean;
  }
): Promise<UpdateCategoryResult> {
  try {
    const session = await auth();

    if (!session?.user || (session.user.role !== UserRole.ADMIN && session.user.role !== UserRole.SUPER_ADMIN)) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    // Check if category exists
    const existing = await prisma.category.findUnique({
      where: { key },
    });

    if (!existing) {
      return {
        success: false,
        error: 'Category not found',
      };
    }

    // If parentKey provided, verify parent exists
    if (data.parentKey !== undefined && data.parentKey !== null) {
      const parent = await prisma.category.findUnique({
        where: { key: data.parentKey },
      });

      if (!parent) {
        return {
          success: false,
          error: 'Parent category not found',
        };
      }

      // Prevent circular reference
      if (data.parentKey === key) {
        return {
          success: false,
          error: 'Category cannot be its own parent',
        };
      }
    }

    await prisma.category.update({
      where: { key },
      data,
    });

    revalidatePath('/ar/admin/categories');
    revalidatePath('/ar/admin/costs');

    return {
      success: true,
    };
  } catch (error) {
    console.error('updateCategory error:', error);
    return {
      success: false,
      error: 'Failed to update category',
    };
  }
}

export interface DeleteCategoryResult {
  success: boolean;
  error?: string;
}

export async function deleteCategory(key: string): Promise<DeleteCategoryResult> {
  try {
    const session = await auth();

    if (!session?.user || (session.user.role !== UserRole.ADMIN && session.user.role !== UserRole.SUPER_ADMIN)) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    // Check if category exists
    const existing = await prisma.category.findUnique({
      where: { key },
      include: {
        children: true,
        transactions: true,
      },
    });

    if (!existing) {
      return {
        success: false,
        error: 'Category not found',
      };
    }

    // Check if category has children
    if (existing.children.length > 0) {
      return {
        success: false,
        error: 'Cannot delete category with subcategories. Delete subcategories first.',
      };
    }

    // Check if category is used in transactions
    if (existing.transactions.length > 0) {
      return {
        success: false,
        error: 'Cannot delete category that is used in transactions',
      };
    }

    await prisma.category.delete({
      where: { key },
    });

    revalidatePath('/ar/admin/categories');
    revalidatePath('/ar/admin/costs');

    return {
      success: true,
    };
  } catch (error) {
    console.error('deleteCategory error:', error);
    return {
      success: false,
      error: 'Failed to delete category',
    };
  }
}













