import { Button } from "@/components/ui/button"
import Link from "next/link"

// Dummy data for courses
const courses = [
  {
    id: "1",
    title: "Introduction to React",
    enrollments: 150,
    rating: 4.5,
    status: "Published",
  },
  {
    id: "2",
    title: "Advanced JavaScript",
    enrollments: 120,
    rating: 4.8,
    status: "Draft",
  },
  {
    id: "3",
    title: "Python for Beginners",
    enrollments: 200,
    rating: 4.2,
    status: "Published",
  },
]

export default function CoursesPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Courses</h1>
        <Link href="/courses/create">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-500  text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md hover:shadow-primary/25">
            Create New Course
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))} */}
      </div>
    </div>
  )
}
