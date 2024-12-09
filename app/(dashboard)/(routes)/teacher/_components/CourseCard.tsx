import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { formatDate } from "@/lib/format"
import { CourseWithCount } from "@/types/course"
import { BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CourseCardProps {
  course: CourseWithCount
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="group hover:shadow-md transition overflow-hidden">
      <Link href={`/teacher/courses/${course.id}`}>
        <CardHeader className="p-0">
          <div className="aspect-video relative">
            <Image
              src={course.imageUrl || "/placeholder-course.jpg"}
              alt={course.title}
              fill
              className="object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-semibold group-hover:text-blue-700 transition line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-gray-500 mt-2 line-clamp-1">
            {course.description || "No description"}
          </p>
        </CardContent>
        <CardFooter className="p-4 flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            {course._count.chapters}{" "}
            {course._count.chapters === 1 ? "Chapter" : "Chapters"}
          </div>
          <div>
            {course.isPublished ? (
              <span className="text-green-600 font-semibold">Published</span>
            ) : (
              <span className="text-yellow-600 font-semibold">Draft</span>
            )}
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}
