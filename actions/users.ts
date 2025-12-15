'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function getAllUsers() {
  const session = await auth();

  if (!session?.user || session.user.role !== UserRole.SUPER_ADMIN) {
    throw new Error('Unauthorized');
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      lastLogin: true,
      password: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return users;
}

export async function createUser(
  email: string,
  password: string | undefined,
  role: UserRole,
  name?: string
) {
  const session = await auth();

  if (!session?.user || session.user.role !== UserRole.SUPER_ADMIN) {
    throw new Error('Unauthorized');
  }

  // Cannot create SUPER_ADMIN via UI
  if (role === UserRole.SUPER_ADMIN) {
    throw new Error('Cannot create SUPER_ADMIN user');
  }

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Generate password if not provided
  let finalPassword: string;
  if (password && password.trim()) {
    finalPassword = password;
  } else {
    const { generateSecurePassword } = await import('@/helpers/generatePassword');
    finalPassword = generateSecurePassword(12);
  }

  await prisma.user.create({
    data: {
      email,
      password: finalPassword, // Plain text
      role,
      name: name || null,
      isActive: true,
    },
  });

  revalidatePath('/admin/users');
}

export async function updateUser(
  id: string,
  data: {
    name?: string;
    role?: UserRole;
    isActive?: boolean;
  }
) {
  const session = await auth();

  if (!session?.user || session.user.role !== UserRole.SUPER_ADMIN) {
    throw new Error('Unauthorized');
  }

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Cannot change SUPER_ADMIN role
  if (user.role === UserRole.SUPER_ADMIN && data.role && data.role !== UserRole.SUPER_ADMIN) {
    throw new Error('Cannot change SUPER_ADMIN role');
  }

  // Cannot create another SUPER_ADMIN
  if (data.role === UserRole.SUPER_ADMIN && user.role !== UserRole.SUPER_ADMIN) {
    throw new Error('Cannot assign SUPER_ADMIN role');
  }

  await prisma.user.update({
    where: { id },
    data,
  });

  revalidatePath('/admin/users');
}

export async function deleteUser(id: string) {
  const session = await auth();

  if (!session?.user || session.user.role !== UserRole.SUPER_ADMIN) {
    throw new Error('Unauthorized');
  }

  // Cannot delete self
  if (session.user.id === id) {
    throw new Error('Cannot delete your own account');
  }

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error('User not found');
  }

  await prisma.user.delete({
    where: { id },
  });

  revalidatePath('/admin/users');
}

export async function resetPassword(id: string, newPassword: string) {
  const session = await auth();

  if (!session?.user || session.user.role !== UserRole.SUPER_ADMIN) {
    throw new Error('Unauthorized');
  }

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error('User not found');
  }

  await prisma.user.update({
    where: { id },
    data: {
      password: newPassword, // Plain text
    },
  });

  revalidatePath('/admin/users');
}

export interface UpdateUserProfileResult {
  success: boolean;
  error?: string;
}

export async function updateUserProfile(data: {
  name?: string;
  profileImageUrl?: string;
  profileImagePublicId?: string;
}): Promise<UpdateUserProfileResult> {
  try {
    const session = await auth();

    if (!session?.user || !session.user.id) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    const userId = session.user.id;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        staff: {
          include: {
            application: {
              select: {
                id: true,
                profileImagePublicId: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    // Update user name if provided
    if (data.name !== undefined) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          name: data.name.trim() || null,
        },
      });
    }

    // Update profile image if user has Staff relation
    if (data.profileImageUrl !== undefined && data.profileImagePublicId !== undefined) {
      if (user.staff?.application) {
        // Delete old image from Cloudinary if exists
        if (user.staff.application.profileImagePublicId) {
          try {
            const { deleteImageFromCloudinary } = await import('@/lib/cloudinary');
            await deleteImageFromCloudinary(user.staff.application.profileImagePublicId);
          } catch (error) {
            console.error('Error deleting old image from Cloudinary:', error);
            // Continue even if deletion fails
          }
        }

        // Update Application with new image
        await prisma.application.update({
          where: { id: user.staff.application.id },
          data: {
            profileImageUrl: data.profileImageUrl,
            profileImagePublicId: data.profileImagePublicId,
          },
        });
      } else {
        // User doesn't have Staff relation - cannot update profile image
        // This is acceptable - they'll use fallback (Gravatar/initials)
      }
    }

    revalidatePath('/admin/settings');
    revalidatePath('/admin');

    return {
      success: true,
    };
  } catch (error: unknown) {
    console.error('updateUserProfile error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export interface UpdateUserPasswordResult {
  success: boolean;
  error?: string;
}

export async function updateUserPassword(data: {
  newPassword: string;
}): Promise<UpdateUserPasswordResult> {
  try {
    const session = await auth();

    if (!session?.user || !session.user.id) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    const userId = session.user.id;

    // Check if user exists (user is already authenticated via session)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
      },
    });

    if (!user) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    // Validate new password
    if (!data.newPassword || data.newPassword.trim().length < 6) {
      return {
        success: false,
        error: 'New password must be at least 6 characters long',
      };
    }

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: data.newPassword.trim(), // Plain text
      },
    });

    revalidatePath('/admin/settings');

    return {
      success: true,
    };
  } catch (error: unknown) {
    console.error('updateUserPassword error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to update password';
    return {
      success: false,
      error: errorMessage,
    };
  }
}


















