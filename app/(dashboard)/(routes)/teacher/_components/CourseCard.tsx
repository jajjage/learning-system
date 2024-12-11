import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"
import { Course } from "@prisma/client"
import Image from "next/image"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative w-full pt-[56.25%]">
          <Image
            src={course.imageUrl || "/placeholder-course.jpg"}
            alt={course.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <Badge variant="secondary" className="mb-2">
          {course.categoryId}
        </Badge>
        <CardTitle className="text-xl mb-2 line-clamp-2">
          {course.title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {course.description}
        </CardDescription>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="w-4 h-4 mr-1" />
          {/* <span>{course.enrollmentCount || 0} students</span> */}
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 bg-secondary/50 text-secondary-foreground">
        <span className="text-sm font-medium truncate">
          Instructor: {course.title}
        </span>
      </CardFooter>
    </Card>
  )
}
