/**
 * Seed BMC Canvas Sections Script
 * 
 * Extracts bmcCanvas from bmc-content.json and creates BMCCanvasSection records in the database.
 * 
 * Usage:
 *   pnpm seed:bmc-canvas
 *   OR
 *   tsx scripts/seed-bmc-canvas.ts
 */

if (!process.env.DATABASE_URL) {
  try {
    require('dotenv').config();
  } catch {
    // dotenv not available, that's okay
  }
}

import { PrismaClient } from '@prisma/client';
import { BMC_SECTION_IDS } from '../lib/bmc-constants';
import type { BMCCanvas } from '../lib/bmc-types';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting BMC Canvas seed...');
  console.log('📋 Reading data from lib/bmc-content.json...');

  try {
    // Import the JSON file
    const bmcContent = await import('../lib/bmc-content.json');

    if (!bmcContent || !bmcContent.default) {
      throw new Error('Failed to import bmc-content.json');
    }

    const canvas: BMCCanvas = bmcContent.default.bmcCanvas;

    if (!canvas) {
      throw new Error('bmcCanvas not found in bmc-content.json');
    }

    console.log('✅ Successfully loaded bmcCanvas from JSON file');
    console.log(`📊 Preparing to seed ${Object.keys(BMC_SECTION_IDS).length} sections...`);

    // Seed each section - using BMC_SECTION_IDS to ensure all sections are covered
    const sections = [
      {
        sectionId: BMC_SECTION_IDS.KEY_PARTNERS,
        sectionData: canvas.keyPartners,
      },
      {
        sectionId: BMC_SECTION_IDS.KEY_ACTIVITIES,
        sectionData: canvas.keyActivities,
      },
      {
        sectionId: BMC_SECTION_IDS.KEY_RESOURCES,
        sectionData: canvas.keyResources,
      },
      {
        sectionId: BMC_SECTION_IDS.VALUE_PROPOSITIONS,
        sectionData: canvas.valuePropositions,
      },
      {
        sectionId: BMC_SECTION_IDS.CUSTOMER_RELATIONSHIPS,
        sectionData: canvas.customerRelationships,
      },
      {
        sectionId: BMC_SECTION_IDS.CHANNELS,
        sectionData: canvas.channels,
      },
      {
        sectionId: BMC_SECTION_IDS.CUSTOMER_SEGMENTS,
        sectionData: canvas.customerSegments,
      },
      {
        sectionId: BMC_SECTION_IDS.COST_STRUCTURE,
        sectionData: canvas.costStructure,
      },
      {
        sectionId: BMC_SECTION_IDS.REVENUE_STREAMS,
        sectionData: canvas.revenueStreams,
      },
    ];

    // Validate all sections have data
    const missingSections = sections.filter(s => s.sectionData === undefined || s.sectionData === null);
    if (missingSections.length > 0) {
      console.warn(`⚠️  Warning: ${missingSections.length} sections are missing data:`,
        missingSections.map(s => s.sectionId).join(', '));
    }

    let successCount = 0;
    let errorCount = 0;

    // Seed each section to database
    for (const section of sections) {
      try {
        if (section.sectionData === undefined || section.sectionData === null) {
          console.warn(`⚠️  Skipping ${section.sectionId} - no data found`);
          errorCount++;
          continue;
        }

        const result = await prisma.bMCCanvas.upsert({
          where: { sectionId: section.sectionId },
          update: {
            content: section.sectionData as any,
          },
          create: {
            sectionId: section.sectionId,
            content: section.sectionData as any,
          },
        });

        const dataType = Array.isArray(section.sectionData) ? 'array' : typeof section.sectionData;
        const dataSize = Array.isArray(section.sectionData)
          ? `${section.sectionData.length} items`
          : typeof section.sectionData === 'object'
            ? `${Object.keys(section.sectionData).length} keys`
            : 'value';

        console.log(`✅ Seeded section: ${section.sectionId} (${dataType}, ${dataSize})`);
        successCount++;
      } catch (sectionError: any) {
        console.error(`❌ Error seeding section ${section.sectionId}:`, sectionError?.message || sectionError);
        errorCount++;
      }
    }

    console.log('\n📊 Seed Summary:');
    console.log(`   ✅ Successfully seeded: ${successCount} sections`);
    if (errorCount > 0) {
      console.log(`   ❌ Failed: ${errorCount} sections`);
    }
    console.log(`\n✅ BMC Canvas seed completed! Total sections: ${sections.length}`);
  } catch (error: any) {
    console.error('❌ Error seeding BMC Canvas:', error);
    console.error('Error details:', error?.message || error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });








