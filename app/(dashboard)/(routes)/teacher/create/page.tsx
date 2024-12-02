import React from "react"
import CreateCourse from "../_components/CreateCourse"
import { auth } from "@clerk/nextjs/server"

interface CourseProps {
  userId: string
}

const coursePage = async () => {
  const { userId } = await auth()
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
