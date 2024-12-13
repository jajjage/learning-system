import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Course } from "@prisma/client"
import { CourseWithCount } from "@/types/course"

// Extend the Course type to include chapter count

interface CourseCardProps {
  course: CourseWithCount
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative w-full pt-[56.25%]">
          <Image
            src={course.imageUrl || "/placeholder-course.jpg"}
            alt={course.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-lg"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <Badge variant="secondary" className="mb-2">
          {course.categoryId || "Uncategorized"}
        </Badge>
        <Link
          href={`/teacher/courses/${course.id}`}
          className="text-xl mb-2 line-clamp-2 hover:underline font-bold"
        >
          <CardTitle>{course.title}</CardTitle>
        </Link>
        <CardDescription className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {course.description || "No description available."}
        </CardDescription>
        <p className="text-sm font-medium text-muted-foreground">
          {course._count.chapters}{" "}
          {course._count.chapters === 1 ? "Chapter" : "Chapters"}
        </p>
      </CardContent>
      <CardFooter className="px-4 py-3 bg-secondary/50 text-secondary-foreground">
        <span className="text-sm font-medium truncate">
          Instructor: {course.userId}
        </span>
      </CardFooter>
    </Card>
  )
}
