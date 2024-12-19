// This is the course page that the student sees when they click on a course from the course list

import { onAuthenticatedUser } from "@/actions/auth"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Course from "../_components/Course"
import { getEnrollCourse } from "@/actions/course"
import { QueryClient } from "@tanstack/react-query"

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { user } = await onAuthenticatedUser()
  const { userId } = await auth()
  const client = new QueryClient()

  if (!user?.clerkId) {
    return redirect("/")
  }

  const { courseId } = await params

  const course = await client.fetchQuery({
    queryKey: ["course", courseId],
    queryFn: () => getEnrollCourse(courseId),
  })

  if (!course) {
    return redirect("/")
  }

  return (
    <>
      <Course course={course} />
    </>
  )
}
