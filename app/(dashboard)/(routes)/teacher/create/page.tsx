import React from "react"

import { onAuthenticatedUser } from "@/actions/auth"
import { toast } from "react-hot-toast"
import { redirect } from "next/navigation"
import CreateCourse from "@/app/(dashboard)/_components/dashboard/CreateCourse"

const coursePage = async () => {
  const { userId } = await onAuthenticatedUser()
  if (!userId) {
    toast.error("we must be user")
    redirect("/")
  }

  return (
    <div>
      <CreateCourse userId={userId || ""} />
    </div>
  )
}

export default coursePage
