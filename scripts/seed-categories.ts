/**
 * Seed Categories Script
 * 
 * Extracts categories from finance-data.json and creates Category records in the database.
 * 
 * Usage:
 *   pnpm seed:categories
 *   OR
 *   tsx scripts/seed-categories.ts
 */

if (!process.env.DATABASE_URL) {
  try {
    require('dotenv').config();
  } catch {
    // dotenv not available, that's okay
  }
}

import { PrismaClient, CategoryType } from '@prisma/client';

const prisma = new PrismaClient();

// Category definitions extracted from finance-data.json structure
const mainCategories: Array<{
  key: string;
  label: string;
  type: CategoryType;
  order: number;
}> = [
    { key: 'leadership', label: 'فريق القيادة', type: 'EXPENSE' as CategoryType, order: 1 },
    { key: 'technical', label: 'الفريق التقني', type: 'EXPENSE' as CategoryType, order: 2 },
    { key: 'content', label: 'فريق المحتوى', type: 'EXPENSE' as CategoryType, order: 3 },
    { key: 'marketing-sales', label: 'التسويق والمبيعات', type: 'EXPENSE' as CategoryType, order: 4 },
    { key: 'operations', label: 'الفريق التشغيلي', type: 'EXPENSE' as CategoryType, order: 5 },
    { key: 'infrastructure', label: 'البنية التحتية والتقنية', type: 'EXPENSE' as CategoryType, order: 6 },
    { key: 'overhead', label: 'المصروفات الإدارية', type: 'EXPENSE' as CategoryType, order: 7 },
    { key: 'marketing', label: 'التسويق والإعلان', type: 'EXPENSE' as CategoryType, order: 8 },
  ];

const subcategories: Array<{
  key: string;
  label: string;
  parentKey: string;
  type: CategoryType;
  order: number;
}> = [
    // Infrastructure subcategories
    { key: 'hosting', label: 'الاستضافة', parentKey: 'infrastructure', type: 'EXPENSE' as CategoryType, order: 1 },
    { key: 'database', label: 'قاعدة البيانات', parentKey: 'infrastructure', type: 'EXPENSE' as CategoryType, order: 2 },
    { key: 'storage', label: 'التخزين', parentKey: 'infrastructure', type: 'EXPENSE' as CategoryType, order: 3 },
    { key: 'seo-tools', label: 'أدوات SEO', parentKey: 'infrastructure', type: 'EXPENSE' as CategoryType, order: 4 },
    { key: 'analytics', label: 'التحليلات', parentKey: 'infrastructure', type: 'EXPENSE' as CategoryType, order: 5 },
    { key: 'development', label: 'أدوات التطوير', parentKey: 'infrastructure', type: 'EXPENSE' as CategoryType, order: 6 },
    { key: 'monitoring', label: 'المراقبة', parentKey: 'infrastructure', type: 'EXPENSE' as CategoryType, order: 7 },
    { key: 'project-management', label: 'إدارة المشاريع', parentKey: 'infrastructure', type: 'EXPENSE' as CategoryType, order: 8 },
    { key: 'domain', label: 'النطاق و SSL', parentKey: 'infrastructure', type: 'EXPENSE' as CategoryType, order: 9 },
    { key: 'email', label: 'خدمة البريد الإلكتروني', parentKey: 'infrastructure', type: 'EXPENSE' as CategoryType, order: 10 },

    // Overhead subcategories
    { key: 'office', label: 'إيجار المكتب', parentKey: 'overhead', type: 'EXPENSE' as CategoryType, order: 1 },
    { key: 'utilities', label: 'المرافق والإنترنت', parentKey: 'overhead', type: 'EXPENSE' as CategoryType, order: 2 },
    { key: 'legal', label: 'التأمين والقانوني', parentKey: 'overhead', type: 'EXPENSE' as CategoryType, order: 3 },
    { key: 'misc', label: 'مصروفات إدارية متنوعة', parentKey: 'overhead', type: 'EXPENSE' as CategoryType, order: 4 },

    // Marketing subcategories
    { key: 'media', label: 'الإعلانات', parentKey: 'marketing', type: 'EXPENSE' as CategoryType, order: 1 },

    // Marketing-Sales subcategories
    { key: 'sales', label: 'المبيعات', parentKey: 'marketing-sales', type: 'EXPENSE' as CategoryType, order: 1 },
  ];

async function seedCategories() {
  try {
    console.log('🌱 Starting category seeding...\n');

    // Seed main categories
    console.log('Creating main categories...');
    for (const category of mainCategories) {
      try {
        const existing = await prisma.category.findUnique({
          where: { key: category.key },
        });

        if (existing) {
          console.log(`  ⏭️  Category "${category.key}" already exists, skipping...`);
          continue;
        }

        await prisma.category.create({
          data: {
            key: category.key,
            label: category.label,
            parentKey: null,
            type: category.type,
            order: category.order,
            isActive: true,
          },
        });

        console.log(`  ✅ Created category: ${category.key} - ${category.label}`);
      } catch (error: any) {
        console.error(`  ❌ Error creating category "${category.key}":`, error.message);
      }
    }

    console.log('\nCreating subcategories...');
    // Seed subcategories
    for (const subcategory of subcategories) {
      try {
        const existing = await prisma.category.findUnique({
          where: { key: subcategory.key },
        });

        if (existing) {
          console.log(`  ⏭️  Subcategory "${subcategory.key}" already exists, skipping...`);
          continue;
        }

        // Verify parent exists
        const parent = await prisma.category.findUnique({
          where: { key: subcategory.parentKey! },
        });

        if (!parent) {
          console.error(`  ❌ Parent category "${subcategory.parentKey}" not found for "${subcategory.key}", skipping...`);
          continue;
        }

        await prisma.category.create({
          data: {
            key: subcategory.key,
            label: subcategory.label,
            parentKey: subcategory.parentKey,
            type: subcategory.type,
            order: subcategory.order,
            isActive: true,
          },
        });

        console.log(`  ✅ Created subcategory: ${subcategory.key} - ${subcategory.label} (parent: ${subcategory.parentKey})`);
      } catch (error: any) {
        console.error(`  ❌ Error creating subcategory "${subcategory.key}":`, error.message);
      }
    }

    console.log('\n✅ Category seeding completed successfully!');
  } catch (error) {
    console.error('\n❌ Fatal error during category seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedCategories();

