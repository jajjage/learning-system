import React from "react"
import CreateCourse from "../_components/CreateCourse"
import { auth } from "@clerk/nextjs/server"
import { onAuthenticatedUser } from "@/actions/auth"

interface CourseProps {
  userId: string
}

const coursePage = async () => {
  const { userId } = await onAuthenticatedUser()
  if (!userId) {
    console.log("no user id")
  }

  return (
    <div>
      <CreateCourse userId={userId || ""} />
    </div>
  )
}

export default coursePage
