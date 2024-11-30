"use server"

import { prisma } from "@/utils/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { Role } from "@prisma/client"

type UserData = {
  clerkId: string
  email: string
  firstName: string
  lastName: string
  role: Role
  // Add any other fields you need
}

export const onAuthenticatedUser = async () => {
  try {
    const clerk = await currentUser()
    if (!clerk) return { status: "nm fjkgnqmo23" }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerk.id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    })
    if (user)
      return {
        status: 200,
        id: user.id,
        username: `${user.firstName} ${user.lastName}`,
      }
    return {
      status: 404,
    }
  } catch (error) {
    return {
      status: 400,
    }
  }
}

export const onSignInUser = async (data: { clerkId: string }) => {
  try {
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: data.clerkId },
    })

    if (dbUser) {
      return {
        status: 200,
        isNewUser: false,
        message: "Sign in Succesful!",
        id: dbUser.id,
      }
    } else {
      return {
        status: 400,
        message: "User with this detail not found",
      }
    }
  } catch (error) {
    return {
      status: 400,
      message: "Oops! something went wrong. Try again",
    }
  }
}

export async function onSignUpUser(userData: UserData) {
  try {
    // Check if the user already exists in the database
    let dbUser = await prisma.user.findUnique({
      where: { clerkId: userData.clerkId },
    })

    let isNewUser = false
    if (!dbUser) {
      // If the user doesn't exist, create a new user
      dbUser = await prisma.user.create({
        data: {
          clerkId: userData.clerkId,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role,
          // Add any other fields you want to store
        },
      })
      isNewUser = true
    } else {
      return {
        status: 400,
        message: "Already have an account",
        id: dbUser.id,
      }
    }

    // Return the user data and whether it's a new user
    return {
      status: 200,
      success: true,
      user: dbUser,
      isNewUser,
      message: "User successfully created",
    }
  } catch (error) {
    console.error("Error processing user:", error)
    return { success: false, error: "Failed to process user" }
  }
}
