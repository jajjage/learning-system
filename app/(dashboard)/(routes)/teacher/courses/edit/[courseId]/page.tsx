import {
  getCategories,
  getCourseEdit,
  updateCoursePublishStatus,
} from "@/actions/course"
import { redirect } from "next/navigation"
import TitleForm from "./_components/TitleForm"
import DescriptionForm from "./_components/DescriptionForm"
import PriceForm from "./_components/PriceForm"
import CategoryForm from "./_components/CategoryForm"
import ImageForm from "./_components/ImageForm"
import CourseEnrollmentInfo from "./_components/CourseEnrollmentInfo"
import { IconBadge } from "@/components/global/IconBadge"
import {
  ArrowLeft,
  CircleDollarSign,
  ClipboardPen,
  File,
  LayoutDashboard,
  ListChecksIcon as ListCheck,
  ListChecks,
} from "lucide-react"
import AttachmentForm from "./_components/AttachmentForm"
import ChapterForm from "./_components/ChapterForm"
import { onAuthenticatedUser } from "@/actions/auth"
import { QueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import Link from "next/link"
import { PublishBanner } from "@/components/global/PublishBanner"
import DeleteButton from "@/components/global/CourseDelete"
import { deleteCourse } from "@/actions/course"
import CourseAccessForm from "./_components/CourseAccessForm"

interface PageProps {
  params: {
    courseId: string
  }
}

export default async function CourseEditPage(context: {
  params: { courseId: string }
}) {
  const { userId } = await onAuthenticatedUser()
  const client = new QueryClient()

  if (!userId) {
    return redirect("/")
  }

  const resolvedParams = await context.params
  const course = await client.fetchQuery({
    queryKey: ["course", resolvedParams.courseId],
    queryFn: () => getCourseEdit(resolvedParams.courseId, userId),
  })

  const categories = await getCategories()

  if (!course) {
    toast.error("here")
    return redirect("/")
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.categoryId,
    course.price,
    course.maxEnrollment,
    course.startDate,
    course.endDate,
    course.enrollmentDeadline,

    course.chapters.some((chapter) => chapter.isPublished),
  ]
  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${totalFields})`
  const isComplete = requiredFields.every(Boolean)

  return (
    <>
      {isComplete && (
        <PublishBanner
          initialIsPublished={course.isPublished}
          entityId={course.id}
          entityTitle={course.title}
          entityType="course"
          onPublishToggle={updateCoursePublishStatus}
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <div className="w-full">
              <Link
                href={`/teacher/courses`}
                className="flex items-center text-sm hover:opacity-75 transsion mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Courses
              </Link>
            </div>
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <DeleteButton
            entityId={course.id}
            entityType="course"
            onDelete={deleteCourse}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
            <CourseAccessForm initialData={course} courseId={course.id} />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course chapters</h2>
              </div>
              <ChapterForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <AttachmentForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ClipboardPen} />
                <h2 className="text-xl">Enrollment & Dateline</h2>
              </div>
              <CourseEnrollmentInfo initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
