import { getCategories, allCourses } from "@/actions/course"
import { onAuthenticatedUser } from "@/actions/auth"
import { QueryClient } from "@tanstack/react-query"
import { redirect } from "next/navigation"
import { Suspense } from "react"

import { AuthorizedAccess } from "@/components/global/AuthorizedAccess"
import { Role } from "@prisma/client"
import { CourseList } from "@/app/(dashboard)/_components/dashboard/CourseList"
import { fetchStudentCourses } from "@/hooks/course"

interface SearchParams {
  title?: string // Optional if not always present
  categoryId?: string // Optional if not always present
}

interface SearchParamsProps {
  searchParams: SearchParams // Directly typed as resolved data
}

export default async function CoursesPage({
  searchParams,
}: SearchParamsProps): Promise<JSX.Element> {
  const { user } = await onAuthenticatedUser()
  const client = new QueryClient()

  if (!user?.clerkId) {
    return redirect("/")
  }

  if (!user || user.role !== Role.STUDENT) {
    return <AuthorizedAccess />
  }

  const [courses, categories] = await Promise.all([
    client.fetchQuery({
      queryKey: ["courses", user.role, "", ""],
      queryFn: () => fetchStudentCourses("", ""),
    }),
    client.fetchQuery({
      queryKey: ["categories"],
      queryFn: () => getCategories(),
    }),
  ])

  return (
    <div className="space-y-6">
      <Suspense fallback={<div>Loading...</div>}>
        <CourseList
          initialCourses={courses ?? []}
          initialCategories={categories}
          role={user.role}
        />
      </Suspense>
    </div>
  )
}
