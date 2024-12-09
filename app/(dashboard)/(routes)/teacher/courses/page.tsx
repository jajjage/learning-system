import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CourseCard } from "../_components/CourseCard"
import { getCourses } from "@/actions/course"
import { onAuthenticatedUser } from "@/actions/auth"
import { QueryClient } from "@tanstack/react-query"
import { redirect } from "next/navigation"

export default async function CoursesPage() {
  const { user } = await onAuthenticatedUser()
  const client = new QueryClient()

  if (!user?.clerkId) {
    return redirect("/")
  }

  const userCourses = await client.fetchQuery({
    queryKey: ["course"],
    queryFn: () => getCourses(user.clerkId),
  })

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Courses</h1>
        <Link href="/teacher/create">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-500  text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md hover:shadow-primary/25">
            Create New Course
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userCourses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
