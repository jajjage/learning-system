"use server";

import { prisma } from "@/utils/prisma";
import { currentUser } from "@clerk/nextjs/server";

type UserData = {
  clerkId: string
  email: string
  firstName: string
  lastName: string
  // Add any other fields you need
}

export const onAuthenticatedUser = async () => {
  try {
    const clerk = await currentUser()
    if (!clerk) return { status: 404 }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerk.id,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
      },
    })
    if (user)
      return {
        status: 200,
        id: user.id,
        image: clerk.imageUrl,
        username: `${user.firstname} ${user.lastname}`,
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

export const onSignUpUser = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  clerkId: string;
}) => {
  try {
    const createdUser = await prisma.user.create({
      data: {
        ...data,
      },
    })

    if (createdUser) {
      return {
        status: 200,
        message: "User successfully created",
        id: createdUser.id,
      }
    }

    return {
      status: 400,
      message: "User could not be created! Try again",
    }
  } catch (error) {
    return {
      status: 400,
      message: "Oops! something went wrong. Try again",
    }
  }
}

// export const onSignInUser = async (clerkId: string) => {
//   try {
//     const loggedInUser = await prisma.user.findUnique({
//       where: {
//         clerkId,
//       },
//       select: {
//         id: true,
//       },
//     })

//     if (loggedInUser) {
//       return {
//         status: 200,
//         message: "User successfully logged in",
//         id: loggedInUser.id,
//       }
//     }

//     return {
//       status: 400,
//       message: "User could not be logged in! Try again",
//     }
//   } catch (error) {
//     return {
//       status: 400,
//       message: "Oops! something went wrong. Try again",
//     }
//   }
// }

export async function onSignInUser(userData: UserData) {
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
          // Add any other fields you want to store
        },
      })
      isNewUser = true
    } else {
      // If the user exists, update their information
      dbUser = await prisma.user.update({
        where: { clerkId: userData.clerkId },
        data: {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          // Update any other fields you want to keep in sync
        },
      })
    }

    // Return the user data and whether it's a new user
    return { success: true, user: dbUser, isNewUser }
  } catch (error) {
    console.error('Error processing user:', error)
    return { success: false, error: 'Failed to process user' }
  }
}