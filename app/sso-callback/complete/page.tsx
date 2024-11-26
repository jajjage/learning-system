import { onSignInUser } from "@/actions/auth"
import SignInCompletionClient from "@/app/(auth)/_components/SignInCompletionClient"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const CompleteOAuthAfterCallback = async () => {
  const user = await currentUser()
  if (!user) redirect("/sign-in")
  const complete = await onSignInUser({
    firstName: user.firstName as string,
    lastName: user.lastName as string,
    email: user.emailAddresses[0]?.emailAddress as string,
    clerkId: user.id,
  })
  console.log()
  if (complete.status === 200) {
    return <SignInCompletionClient isNewUser={complete.isNewUser ?? false} />
  }

  if (complete.status !== 200) {
    redirect("/sign-in")
  }
}

export default CompleteOAuthAfterCallback
