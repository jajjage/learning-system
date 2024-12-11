import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getCategories, getCourses, getCourseSearch } from "@/actions/course"
import { onAuthenticatedUser } from "@/actions/auth"
import { QueryClient } from "@tanstack/react-query"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { CourseList } from "../_components/CourseList"

export default async function CoursesPage() {
  const { user } = await onAuthenticatedUser()
  const client = new QueryClient()

  if (!user?.clerkId) {
    return redirect("/")
  }

  const categoriesPromise = await client.fetchQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  })
  const coursesPromise = await client.fetchQuery({
    queryKey: ["categories"],
    queryFn: () => getCourseSearch(),
  })

  const [courses, categories] = await Promise.all([
    coursesPromise,
    categoriesPromise,
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-primary">Courses</h1>
        <Button asChild>
          <Link href="/teacher/create">Create Course</Link>
        </Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <CourseList initialCourses={courses} initialCategories={categories} />
      </Suspense>
    </div>
  )
}
