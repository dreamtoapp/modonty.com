'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { ALL_BMC_SECTION_IDS, BMC_SECTION_IDS, type BMCSectionId } from '@/lib/bmc-constants';
import type { BMCCanvas } from '@/lib/bmc-types';

export type { BMCSectionId };

export interface GetBMCCanvasSectionResult {
  success: boolean;
  section?: {
    id: string;
    sectionId: string;
    sectionData: any;
    isActive: boolean;
  };
  error?: string;
}

export async function getBMCCanvasSection(
  sectionId: BMCSectionId
): Promise<GetBMCCanvasSectionResult> {
  try {
    // Check if model exists (in case Prisma Client hasn't been regenerated)
    if (!prisma.bMCCanvas) {
      return {
        success: false,
        error: 'BMCCanvasSection model not found. Please run: npx prisma generate',
      };
    }

    const section = await prisma.bMCCanvas.findUnique({
      where: { sectionId },
    });

    if (!section) {
      return {
        success: false,
        error: `Section ${sectionId} not found`,
      };
    }

    return {
      success: true,
      section: {
        id: section.id,
        sectionId: section.sectionId,
        sectionData: section.content as any,
        isActive: true,
      },
    };
  } catch (error) {
    console.error('getBMCCanvasSection error:', error);
    return {
      success: false,
      error: 'Failed to fetch BMC canvas section',
    };
  }
}

export interface GetAllBMCCanvasSectionsResult {
  success: boolean;
  canvas?: BMCCanvas;
  error?: string;
}

export async function getAllBMCCanvasSections(): Promise<GetAllBMCCanvasSectionsResult> {
  try {
    // Check if model exists (in case Prisma Client hasn't been regenerated)
    if (!prisma.bMCCanvas) {
      console.log('[BMC Canvas] Model not found in Prisma Client');
      return {
        success: false,
        error: 'BMCCanvasSection model not found. Please run: npx prisma generate',
      };
    }

    const sections = await prisma.bMCCanvas.findMany();

    console.log(`[BMC Canvas] Found ${sections.length} sections in database`);
    if (sections.length > 0) {
      console.log('[BMC Canvas] Section IDs found:', sections.map(s => s.sectionId).join(', '));
    }

    if (sections.length === 0) {
      console.log('[BMC Canvas] No sections found in database, will fallback to JSON');
      return {
        success: false,
        error: 'No canvas sections found. Please run: pnpm seed:bmc-canvas',
      };
    }

    // Reconstruct BMCCanvas object from sections
    const canvas: Partial<BMCCanvas> = {};

    for (const section of sections) {
      const sectionId = section.sectionId as BMCSectionId;
      (canvas as any)[sectionId] = section.content;
      console.log(`[BMC Canvas] Loaded section: ${sectionId}`);
    }

    // Validate all required sections are present
    const missingSections = ALL_BMC_SECTION_IDS.filter(
      (id) => !canvas[id as keyof BMCCanvas]
    );

    if (missingSections.length > 0) {
      console.log(`[BMC Canvas] Missing required sections: ${missingSections.join(', ')}`);
      return {
        success: false,
        error: `Missing sections: ${missingSections.join(', ')}. Please run: pnpm seed:bmc-canvas`,
      };
    }

    console.log('[BMC Canvas] Successfully reconstructed canvas from database sections');
    return {
      success: true,
      canvas: canvas as BMCCanvas,
    };
  } catch (error) {
    console.error('[BMC Canvas] getAllBMCCanvasSections error:', error);
    return {
      success: false,
      error: 'Failed to fetch BMC canvas sections',
    };
  }
}

export async function getBMCCanvas(): Promise<BMCCanvas | null> {
  try {
    const result = await getAllBMCCanvasSections();

    if (result.success && result.canvas) {
      console.log('[BMC Canvas] Using canvas from database');
      return result.canvas;
    }

    // Fallback to JSON if database sections don't exist
    console.log('[BMC Canvas] Falling back to JSON file:', result.error);
    try {
      const bmcContent = await import('@/lib/bmc-content.json');
      console.log('[BMC Canvas] Loaded canvas from JSON file');
      return bmcContent.default.bmcCanvas as BMCCanvas;
    } catch (error) {
      console.error('[BMC Canvas] Failed to load from JSON:', error);
      return null;
    }
  } catch (error) {
    console.error('[BMC Canvas] getBMCCanvas error:', error);
    // Fallback to JSON
    try {
      const bmcContent = await import('@/lib/bmc-content.json');
      console.log('[BMC Canvas] Loaded canvas from JSON file (error fallback)');
      return bmcContent.default.bmcCanvas as BMCCanvas;
    } catch {
      return null;
    }
  }
}

export async function getBMCCanvasFromDatabase(): Promise<BMCCanvas | null> {
  try {
    const result = await getAllBMCCanvasSections();

    if (result.success && result.canvas) {
      console.log('[BMC Canvas] Using canvas from database (no fallback)');
      return result.canvas;
    }

    // No fallback - return null if database has no sections
    console.log('[BMC Canvas] No canvas data in database:', result.error);
    return null;
  } catch (error) {
    console.error('[BMC Canvas] getBMCCanvasFromDatabase error:', error);
    return null;
  }
}

export interface CreateBMCCanvasSectionResult {
  success: boolean;
  section?: {
    id: string;
    sectionId: string;
  };
  error?: string;
}

export async function createBMCCanvasSection(
  sectionId: BMCSectionId,
  sectionData: any
): Promise<CreateBMCCanvasSectionResult> {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== UserRole.SUPER_ADMIN && session.user.role !== UserRole.ADMIN) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    // Check if model exists (in case Prisma Client hasn't been regenerated)
    if (!prisma.bMCCanvas) {
      return {
        success: false,
        error: 'BMCCanvasSection model not found. Please run: npx prisma generate',
      };
    }

    const section = await prisma.bMCCanvas.upsert({
      where: { sectionId },
      update: {
        content: sectionData,
      },
      create: {
        sectionId,
        content: sectionData,
      },
    });

    console.log(`[BMC Canvas] Section ${sectionId} created successfully`);

    // Revalidate all routes that display canvas data
    revalidatePath('/admin/bmc/canvas');
    revalidatePath('/admin/bmc/canvas/edit');
    revalidatePath('/admin/bmc');

    return {
      success: true,
      section: {
        id: section.id,
        sectionId: section.sectionId,
      },
    };
  } catch (error: any) {
    console.error('[BMC Canvas] createBMCCanvasSection error:', error);
    return {
      success: false,
      error: error?.message || 'Failed to create BMC canvas section',
    };
  }
}

export interface UpdateBMCCanvasSectionResult {
  success: boolean;
  section?: {
    id: string;
    sectionId: string;
  };
  error?: string;
}

export async function updateBMCCanvasSection(
  sectionId: BMCSectionId,
  sectionData: any
): Promise<UpdateBMCCanvasSectionResult> {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== UserRole.SUPER_ADMIN && session.user.role !== UserRole.ADMIN) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    // Check if model exists (in case Prisma Client hasn't been regenerated)
    if (!prisma.bMCCanvas) {
      return {
        success: false,
        error: 'BMCCanvasSection model not found. Please run: npx prisma generate',
      };
    }

    // Ensure data is properly serialized for MongoDB JSON field
    let serializedData: any = sectionData;
    try {
      // If it's already a plain object/array, Prisma will handle it
      // But ensure it's serializable
      if (typeof sectionData === 'object' && sectionData !== null) {
        // Deep clone to ensure clean serialization
        serializedData = JSON.parse(JSON.stringify(sectionData));
      }
    } catch (serializeError) {
      console.error('[BMC Canvas] Data serialization error:', serializeError);
      return {
        success: false,
        error: 'Invalid data format. Data must be JSON serializable.',
      };
    }

    // Log data being saved (truncated for large objects)
    const dataPreview = typeof serializedData === 'string'
      ? serializedData.substring(0, 100)
      : JSON.stringify(serializedData).substring(0, 100);
    console.log(`[BMC Canvas] Saving section ${sectionId}, data preview: ${dataPreview}...`);
    console.log(`[BMC Canvas] Data type: ${typeof serializedData}, isArray: ${Array.isArray(serializedData)}`);

    // Use upsert to create if doesn't exist, update if exists
    let section;
    try {
      console.log(`[BMC Canvas] Attempting upsert for section ${sectionId}...`);
      section = await prisma.bMCCanvas.upsert({
        where: { sectionId },
        update: {
          content: serializedData,
        },
        create: {
          sectionId,
          content: serializedData,
        },
      });
      console.log(`[BMC Canvas] Upsert completed for section ${sectionId}, ID: ${section.id}`);
      console.log(`[BMC Canvas] Section data saved, type: ${typeof section.content}, isArray: ${Array.isArray(section.content)}`);
    } catch (prismaError: any) {
      console.error('[BMC Canvas] Prisma upsert error:', prismaError);
      console.error('[BMC Canvas] Error code:', prismaError?.code);
      console.error('[BMC Canvas] Error meta:', prismaError?.meta);
      console.error('[BMC Canvas] Error message:', prismaError?.message);
      console.error('[BMC Canvas] Full error:', JSON.stringify(prismaError, null, 2));
      return {
        success: false,
        error: `Database error: ${prismaError?.message || 'Unknown error'}`,
      };
    }

    // Verify the saved data by reading it back
    const verifySection = await prisma.bMCCanvas.findUnique({
      where: { sectionId },
    });

    if (!verifySection) {
      console.error(`[BMC Canvas] CRITICAL: Section ${sectionId} not found after save!`);
      return {
        success: false,
        error: 'Data was not saved. Please try again.',
      };
    }

    // Verify the saved data
    const savedDataPreview = typeof verifySection.content === 'string'
      ? verifySection.content.substring(0, 100)
      : JSON.stringify(verifySection.content).substring(0, 100);
    console.log(`[BMC Canvas] Section ${sectionId} verified in database, saved data preview: ${savedDataPreview}...`);

    // Revalidate all routes that display canvas data
    revalidatePath('/admin/bmc/canvas');
    revalidatePath('/admin/bmc/canvas/edit');
    revalidatePath('/admin/bmc');

    // Final verification - read back from DB to confirm it's saved
    const finalCheck = await prisma.bMCCanvas.findUnique({
      where: { sectionId },
      select: { id: true, sectionId: true, content: true },
    });

    if (!finalCheck) {
      console.error(`[BMC Canvas] CRITICAL: Final verification failed - section ${sectionId} not in database`);
      return {
        success: false,
        error: 'Data save verification failed. Please check database connection.',
      };
    }

    console.log(`[BMC Canvas] Final verification passed for section ${sectionId}`);

    return {
      success: true,
      section: {
        id: section.id,
        sectionId: section.sectionId,
      },
    };
  } catch (error: any) {
    console.error('[BMC Canvas] updateBMCCanvasSection error:', error);
    console.error('[BMC Canvas] Error details:', {
      message: error?.message,
      code: error?.code,
      meta: error?.meta,
      sectionId,
      dataType: typeof sectionData,
      isArray: Array.isArray(sectionData),
      stack: error?.stack?.substring(0, 500),
    });
    return {
      success: false,
      error: error?.message || 'Failed to update BMC canvas section',
    };
  }
}

export interface DeleteBMCCanvasSectionResult {
  success: boolean;
  error?: string;
}

export async function deleteBMCCanvasSection(
  sectionId: BMCSectionId
): Promise<DeleteBMCCanvasSectionResult> {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== UserRole.SUPER_ADMIN && session.user.role !== UserRole.ADMIN) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    // Check if model exists (in case Prisma Client hasn't been regenerated)
    if (!prisma.bMCCanvas) {
      return {
        success: false,
        error: 'BMCCanvasSection model not found. Please run: npx prisma generate',
      };
    }

    await prisma.bMCCanvas.delete({
      where: { sectionId },
    });

    revalidatePath('/admin/bmc/canvas');
    revalidatePath('/admin/bmc');

    return {
      success: true,
    };
  } catch (error) {
    console.error('deleteBMCCanvasSection error:', error);
    return {
      success: false,
      error: 'Failed to delete BMC canvas section',
    };
  }
}









