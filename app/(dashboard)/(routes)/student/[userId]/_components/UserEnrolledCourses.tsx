import { EnrolledCourseWithProgress } from "@/types/course"
import Link from "next/link"
import { format } from "date-fns"

export function UserEnrolledCourses({
  course,
}: {
  course: EnrolledCourseWithProgress
}) {
  return (
    <div className="border rounded-lg overflow-hidden">
      {course.imageUrl && (
        <div className="aspect-video relative">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="object-cover w-full"
          />
          {course.enrollmentStatus === "PENDING" && (
            <div className="absolute top-2 right-2">
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Pending
              </span>
            </div>
          )}
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold line-clamp-1">{course.title}</h3>
          {course.category && (
            <span className="text-xs text-gray-500">{course.category}</span>
          )}
        </div>
        <p className="text-sm text-gray-500 mb-4">
          By {course.instructor.firstName} {course.instructor.lastName}
        </p>
        {course.enrollmentStatus === "ACTIVE" && (
          <div>
            <div className="h-2 bg-gray-200 rounded mb-2">
              <div
                className="h-full bg-blue-600 rounded"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {course.courseProgress.completedChapters} of{" "}
                {course.courseProgress.totalChapters} chapters
              </p>
              <Link
                href={`/learn/course/${course.id}`}
                className="text-sm text-blue-600 hover:underline"
              >
                Continue
              </Link>
            </div>
          </div>
        )}
        {course.enrollmentStatus === "PENDING" && (
          <p className="text-sm text-gray-600">
            Enrolled on {format(new Date(course.enrolledAt), "MMM dd, yyyy")}
          </p>
        )}
      </div>
    </div>
  )
}
