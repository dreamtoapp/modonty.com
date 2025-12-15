import { getAllBMCCanvasSections, getBMCCanvasSection } from "@/actions/bmcCanvas";
import { BMCCanvasSectionEdit } from "@/components/bmc/BMCCanvasSectionEdit";
import { BMC_SECTION_IDS } from "@/lib/bmc-constants";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getBMCCanvasFromDatabase } from "@/actions/bmcCanvas";
import type { BMCCanvas } from "@/lib/bmc-types";
import { AlertCircle } from "lucide-react";

export default async function BMCCanvasEditPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Get canvas from database only (no JSON fallback)
  const canvas = await getBMCCanvasFromDatabase();

  if (!canvas) {
    return (
      <div className="min-h-screen p-4 lg:p-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">
              {locale === 'ar' ? 'تعديل لوحة نموذج العمل' : 'Edit BMC Canvas'}
            </h1>
          </div>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>
              {locale === 'ar' ? 'لا توجد بيانات' : 'No Data Found'}
            </AlertTitle>
            <AlertDescription>
              {locale === 'ar'
                ? 'لم يتم العثور على بيانات لوحة نموذج العمل في قاعدة البيانات. يرجى تشغيل: pnpm seed:bmc-canvas'
                : 'No BMC Canvas data found in database. Please run: pnpm seed:bmc-canvas'}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const sections = [
    {
      sectionId: BMC_SECTION_IDS.KEY_PARTNERS,
      label: 'KEY PARTNERS',
      description: locale === 'ar' ? 'الشخصيات والشركات الرئيسية التي تساعد في نجاح النموذج' : 'Key people and companies that help make the model work',
      data: canvas.keyPartners,
    },
    {
      sectionId: BMC_SECTION_IDS.KEY_ACTIVITIES,
      label: 'KEY ACTIVITIES',
      description: locale === 'ar' ? 'الأعمال الأساسية التي يجب القيام بها لجعل النموذج يعمل' : 'The most important things a company must do to make the model work',
      data: canvas.keyActivities,
    },
    {
      sectionId: BMC_SECTION_IDS.KEY_RESOURCES,
      label: 'KEY RESOURCES',
      description: locale === 'ar' ? 'الأصول الأكثر أهمية لجعل النموذج يعمل' : 'The most important assets required to make the model work',
      data: canvas.keyResources,
    },
    {
      sectionId: BMC_SECTION_IDS.VALUE_PROPOSITIONS,
      label: 'VALUE PROPOSITIONS',
      description: locale === 'ar' ? 'المنتجات والخدمات التي تخلق قيمة للعميل' : 'Products and services that create value for the customer',
      data: canvas.valuePropositions,
    },
    {
      sectionId: BMC_SECTION_IDS.CUSTOMER_RELATIONSHIPS,
      label: 'CUSTOMER RELATIONSHIPS',
      description: locale === 'ar' ? 'نوع العلاقة التي تريد إنشاءها مع العملاء' : 'The type of relationship you want to create with customers',
      data: canvas.customerRelationships,
    },
    {
      sectionId: BMC_SECTION_IDS.CHANNELS,
      label: 'CHANNELS',
      description: locale === 'ar' ? 'كيف تصل إلى عملائك وتوصل لهم القيمة' : 'How you reach your customers and deliver value',
      data: canvas.channels,
    },
    {
      sectionId: BMC_SECTION_IDS.CUSTOMER_SEGMENTS,
      label: 'CUSTOMER SEGMENTS',
      description: locale === 'ar' ? 'مجموعات الأشخاص أو الشركات التي تريد الوصول إليها' : 'Groups of people or companies you want to reach',
      data: canvas.customerSegments,
    },
    {
      sectionId: BMC_SECTION_IDS.COST_STRUCTURE,
      label: 'COST STRUCTURE',
      description: locale === 'ar' ? 'التكاليف الرئيسية لتشغيل النموذج' : 'The most important costs to operate the model',
      data: canvas.costStructure,
    },
    {
      sectionId: BMC_SECTION_IDS.REVENUE_STREAMS,
      label: 'REVENUE STREAMS',
      description: locale === 'ar' ? 'كيف تكسب المال من كل شريحة عملاء' : 'How you make money from each customer segment',
      data: canvas.revenueStreams,
    },
  ];

  return (
    <div className="min-h-screen p-4 lg:p-6">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            {locale === 'ar' ? 'تعديل لوحة نموذج العمل' : 'Edit BMC Canvas'}
          </h1>
          <p className="text-muted-foreground">
            {locale === 'ar'
              ? 'قم بتعديل أقسام لوحة نموذج العمل'
              : 'Edit the sections of the Business Model Canvas'}
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <BMCCanvasSectionEdit
              key={section.sectionId}
              sectionId={section.sectionId}
              sectionData={section.data}
              sectionLabel={section.label}
              sectionDescription={section.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}









