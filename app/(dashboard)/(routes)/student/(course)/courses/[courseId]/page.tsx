import { prisma } from "@/utils/prisma"
import { redirect } from "next/navigation"
import { EnrollmentCard } from "./_components/EnrollmentCard"

type CourseWithEnrollments = {
  id: string
  title: string
  price: number | null
  description: string | null
  maxEnrollment: number | null
  _count: { enrollments: number }
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = await params
  const course: CourseWithEnrollments | null = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      _count: {
        select: { enrollments: true },
      },
    },
  })

  if (!course) {
    redirect("/student")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <EnrollmentCard
        courseId={course.id}
        title={course.title}
        price={course.price || undefined}
        enrollmentLimit={course.maxEnrollment || undefined}
        currentEnrollments={course._count.enrollments}
        description={course.description || ""}
      />
    </div>
  )
}
