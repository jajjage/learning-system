import { Star, Book, BarChart, Lock, Unlock, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
          <div className="absolute top-2 left-2 flex flex-wrap gap-2">
            {course.isEnrollmentOpen ? (
              <Badge variant="secondary" className="bg-green-500 text-white">
                Open
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-red-500 text-white">
                Closed
              </Badge>
            )}
            {course.isFree ? (
              <Badge variant="secondary" className="bg-blue-500 text-white">
                Free
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-yellow-500 text-black">
                Paid
              </Badge>
            )}
            {course.category?.name && (
              <Badge
                variant="secondary"
                className="bg-white/90 text-gray-800 hover:bg-white/80"
              >
                {course.category.name}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className="flex justify-between items-start mb-2">
          <Link
            href={
              role === "STUDENT"
                ? `/${role.toLowerCase()}/course/details/${course.id}/`
                : `/${role.toLowerCase()}/courses/edit/${course.id}/`
            }
          >
            <CardTitle className="text-xl line-clamp-2 hover:underline">
              {course.title}
            </CardTitle>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {course.isEnrollmentOpen ? (
                  <Unlock className="w-5 h-5 text-green-500" />
                ) : (
                  <Lock className="w-5 h-5 text-red-500" />
                )}
              </TooltipTrigger>
              <TooltipContent>
                {course.isEnrollmentOpen
                  ? "Course is open for enrollment"
                  : "Course is currently closed"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div
          className="text-sm text-muted-foreground mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: course.description || "No description available.",
          }}
        />
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
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
            {role === "STUDENT" && course.progress !== null && (
              <div className="flex items-center gap-2">
                <BarChart className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-muted-foreground">
                  {course.progress === 100
                    ? `${course.progress}% Completed`
                    : `${course.progress}% Complete`}
                </span>
              </div>
            )}
          </div>
          {/* {role === "STUDENT" && course.progress !== null && (
            <Progress value={course.progress} className="w-full" />
          )} */}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {course.isFree ? (
              <>
                <span className="text-lg font-bold">${(0).toFixed(2)}</span>
                <span className="text-sm text-muted-foreground line-through">
                  ${((course.price || 0) * 1.25).toFixed(2)}
                </span>
              </>
            ) : (
              <>
                <span className="text-lg font-bold">
                  ${(course.price || 0).toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ${((course.price || 0) * 1.25).toFixed(2)}
                </span>
              </>
            )}
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
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={`/placeholder.svg?height=24&width=24`} />
            </Avatar>
            <span className="text-sm font-medium truncate">
              {course.user.firstName} {course.user.lastName}
            </span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={
                    role === "STUDENT"
                      ? `/${role.toLowerCase()}/course/details/${course.id}/`
                      : `/${role.toLowerCase()}/courses/edit/${course.id}/`
                  }
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {role === "STUDENT" ? "View Course" : "Edit Course"}
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                {role === "STUDENT"
                  ? "Click to view course details"
                  : "Click to edit course"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  )
}
