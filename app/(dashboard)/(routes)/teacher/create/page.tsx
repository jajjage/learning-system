import React from "react"
import CreateCourse from "../_components/CreateCourse"
import { onAuthenticatedUser } from "@/actions/auth"
import { toast } from "react-hot-toast"
import { redirect } from "next/navigation"

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
