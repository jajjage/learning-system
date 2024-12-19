import { onAuthenticatedUser } from "@/actions/auth"
import { redirect } from "next/navigation"
import React from "react"
import Enroll from "./_components/Enroll"

const CourseRegisterPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>
}) => {
  const { user } = await onAuthenticatedUser()

  if (!user?.clerkId) {
    return redirect("/")
  }

  const { courseId } = await params

  return (
    <>
      <Enroll courseId={courseId} />
    </>
  )
}

export default CourseRegisterPage
