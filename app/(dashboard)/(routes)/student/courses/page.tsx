import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getCategories, getCourses } from "@/actions/course"
import { onAuthenticatedUser } from "@/actions/auth"
import { QueryClient } from "@tanstack/react-query"
import { redirect } from "next/navigation"
import { Suspense } from "react"

import { AuthorizedAccess } from "@/components/global/AuthorizedAccess"
import { Role } from "@prisma/client"
import { CourseList } from "../../teacher/_components/CourseList"

export default async function CoursesPage() {
  const { user } = await onAuthenticatedUser()
  const client = new QueryClient()

  if (!user?.clerkId) {
    return redirect("/")
  }

  if (!user || user.role !== Role.STUDENT) {
    return <AuthorizedAccess />
  }

  const categoriesPromise = await client.fetchQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  })
  const coursesPromise = await client.fetchQuery({
    queryKey: ["courses"],
    queryFn: () => getCourses(),
  })

  const [courses, categories] = await Promise.all([
    coursesPromise,
    categoriesPromise,
  ])

  return (
    <div className="space-y-6">
      <Suspense fallback={<div>Loading...</div>}>
        <CourseList
          initialCourses={courses ?? []}
          initialCategories={categories}
        />
      </Suspense>
    </div>
  )
}
