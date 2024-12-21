import { onAuthenticatedUser } from "@/actions/auth"
import { getUserEnrolledCourses } from "@/actions/course"
import { AuthorizedAccess } from "@/components/global/AuthorizedAccess"
import { Role } from "@prisma/client"
import React from "react"
import { UserEnrolledCourses } from "../_components/UserEnrolledCourses"

const MyCoursesPage = async () => {
  const { user } = await onAuthenticatedUser()

  if (!user || user.role !== Role.STUDENT) {
    return <AuthorizedAccess />
  }

  const courses = await getUserEnrolledCourses()
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold">My Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courses.map((course) => (
          <UserEnrolledCourses key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}

export default MyCoursesPage
