'use server';

import { prisma } from '@/lib/prisma';
import { applicationSchema, ApplicationFormData } from '@/lib/validations/application';
import { revalidatePath } from 'next/cache';

export interface SubmitApplicationResult {
  success: boolean;
  error?: string;
  applicationId?: string;
}

export async function submitApplication(
  data: ApplicationFormData
): Promise<SubmitApplicationResult> {
  try {
    // Validate data
    const validatedData = applicationSchema.parse(data);

    // Create application in database
    const application = await prisma.application.create({
      data: {
        applicantName: validatedData.applicantName,
        email: validatedData.email,
        phone: validatedData.phone,
        position: validatedData.position,
        yearsOfExperience: validatedData.yearsOfExperience,
        portfolioUrl: validatedData.portfolioUrl || null,
        githubUrl: validatedData.githubUrl || null,
        linkedinUrl: validatedData.linkedinUrl || null,
        skills: validatedData.skills,
        coverLetter: validatedData.coverLetter,
        cvUrl: validatedData.cvUrl,
        cvPublicId: validatedData.cvPublicId,
        profileImageUrl: validatedData.profileImageUrl,
        profileImagePublicId: validatedData.profileImagePublicId,
        locale: validatedData.locale,
        status: 'PENDING',
      },
    });

    // Revalidate admin applications page
    revalidatePath('/[locale]/admin/applications', 'page');

    return {
      success: true,
      applicationId: application.id,
    };
  } catch (error) {
    console.error('Application submission error:', error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: 'Failed to submit application. Please try again.',
    };
  }
}

