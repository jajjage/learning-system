import { onSignUpUser } from "@/actions/auth"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const CompleteOAuthAfterCallback = async () => {
  const user = await currentUser()
  if (!user) redirect("/sign-in")
  const complete = await onSignUpUser({
    firstName: user.firstName as string,
    lastName: user.lastName as string,
    email: user.emailAddresses[0]?.emailAddress as string,
    clerkId: user.id,
  })
  console.log()
  if (complete.status === 200) {
    redirect(`/dashboard`)
  }

  if (complete.status !== 200) {
    redirect("/sign-in")
  }
}

export default CompleteOAuthAfterCallback
