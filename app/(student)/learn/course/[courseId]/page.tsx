// This is the course page that the student sees when they click on a course from the course list

import { onAuthenticatedUser } from "@/actions/auth"
import { redirect } from "next/navigation"
import Course from "../_components/Course"
import { getEnrolledCourse } from "@/actions/course"
import { QueryClient } from "@tanstack/react-query"
import { AuthorizedAccess } from "@/components/global/AuthorizedAccess"
import { Role } from "@prisma/client"

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { user } = await onAuthenticatedUser()
  const client = new QueryClient()

  if (!user || user.role !== Role.STUDENT) {
    return <AuthorizedAccess />
  }

  if (!user?.clerkId) {
    return redirect("/")
  }

  const { courseId } = await params

  const course = await client.fetchQuery({
    queryKey: ["course", courseId],
    queryFn: () => getEnrolledCourse(courseId),
  })

  if (!course) {
    return redirect("/")
  }

  return (
    <>
      <Course course={course} userId={user.clerkId} />
    </>
  )
}
