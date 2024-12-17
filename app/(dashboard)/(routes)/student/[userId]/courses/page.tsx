import { onAuthenticatedUser } from "@/actions/auth"
import { AuthorizedAccess } from "@/components/global/AuthorizedAccess"
import { Role } from "@prisma/client"
import React from "react"

const MyCoursesPage = async () => {
  const { user } = await onAuthenticatedUser()

  if (!user || user.role !== Role.STUDENT) {
    return <AuthorizedAccess />
  }
  return <div>MyCoursesPage</div>
}

export default MyCoursesPage
