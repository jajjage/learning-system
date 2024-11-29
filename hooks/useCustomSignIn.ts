import { useAuth } from "@clerk/nextjs"

export const redirectToSignUp = async () => {
  const { signOut } = useAuth()

  // Sign out the user (clear the session)
  await signOut()
}
