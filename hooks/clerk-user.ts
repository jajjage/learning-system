import { clerkClient } from "@clerk/clerk-sdk-node"

const clerk = clerkClient

export async function getUserByClerkId(clerkId: string) {
  try {
    const user = await clerk.users.getUser(clerkId)
    console.log("User details:", user)
    return user
  } catch (error) {
    console.error("Error fetching user:", error)
    throw error
  }
}
