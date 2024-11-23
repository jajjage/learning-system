"use server";

import { prisma } from "@/utils/prisma";

export async function createUser(userData: {
  firstName: string;
  lastName: string;
  email: string;
  clerkId: string;
}) {
  try {
    const user = await prisma.user.create({
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        clerkId: userData.clerkId,
      },
    });
    return { success: true, user };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: "Failed to create user" };
  }
}
