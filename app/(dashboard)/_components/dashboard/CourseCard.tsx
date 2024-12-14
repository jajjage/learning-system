import { Star, Book } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"
import { CourseWithCount } from "@/types/course"
import { Role } from "@prisma/client"

interface CourseCardProps {
  course: CourseWithCount
  role: Role
}

export function CourseCard({ course, role }: CourseCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative w-full pt-[56.25%]">
          <Image
            src={course.imageUrl || "/placeholder-course.jpg"}
            alt={course.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-lg"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge
              variant="secondary"
              className="bg-white/90 text-gray-800 hover:bg-white/80"
            >
              Bestseller
            </Badge>
            <Badge
              variant="secondary"
              className="bg-white/90 text-gray-800 hover:bg-white/80"
            >
              {course.category?.name || "Uncategorized"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        {role === "STUDENT" ? (
          <Link
            href={`/${role.toLocaleLowerCase()}/course/details/${course.id}/`}
          >
            <CardTitle className="text-xl mb-2 line-clamp-2 hover:underline">
              {course.title}
            </CardTitle>
          </Link>
        ) : (
          <Link
            href={`/${role.toLocaleLowerCase()}/courses/edit/${course.id}/`}
          >
            <CardTitle className="text-xl mb-2 line-clamp-2 hover:underline">
              {course.title}
            </CardTitle>
          </Link>
        )}

        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {course.description || "No description available."}
        </p>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
            <Star className="w-4 h-4 text-gray-300" />
          </div>
          <span className="text-sm text-muted-foreground">
            4.0 (75 Reviews)
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">
              ${(course.price || 0 * 1.25).toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              ${(course.price || 0 * 1.25).toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Book className="w-4 h-4" />
            <span>
              {course._count.chapters}{" "}
              {course._count.chapters === 1 ? "Chapter" : "Chapters"}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 bg-secondary/20 text-secondary-foreground">
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={`/placeholder.svg?height=24&width=24`} />
          </Avatar>
          <span className="text-sm font-medium truncate">
            {course.user.firstName} {course.user.lastName}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}
