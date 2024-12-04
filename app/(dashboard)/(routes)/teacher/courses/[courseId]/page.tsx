import { getCategories, getCourse } from "@/actions/course"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import TitleForm from "./_components/TitleForm"
import DescriptionForm from "./_components/DescriptionForm"
import PriceForm from "./_components/PriceForm"
import CategoryForm from "./_components/CategoryForm"
import ImageForm from "./_components/ImageForm"
import { IconBadge } from "@/components/global/IconBadge"
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecksIcon as ListCheck,
} from "lucide-react"
import AttachmentForm from "./_components/AttachmentForm"

interface PageProps {
  params: {
    courseId: string
  }
}

export default async function CourseEditPage({ params }: PageProps) {
  const { userId } = await auth()

  if (!userId) {
    return redirect("/")
  }

  const course = await getCourse(params.courseId)
  const categories = await getCategories()

  if (!course) {
    return redirect("/")
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.categoryId,
    course.price,
  ]
  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${totalFields})`

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Course Setup</h1>
            <p className="text-sm text-slate-600 mt-2">
              Complete all fields {completionText}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize Your Course</h2>
            </div>
            <div className="space-y-4 mt-8">
              <TitleForm initialData={course} courseId={course.id} />
              <DescriptionForm initialData={course} courseId={course.id} />
              <ImageForm initialData={course} courseId={course.id} />
              <CategoryForm
                initialData={course}
                courseId={course.id}
                options={categories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
              />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListCheck} />
                <h2 className="text-xl">Course Chapters</h2>
              </div>
              <div className="mt-4">TODO: Chapters</div>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell Your Course</h2>
              </div>
              <div className="mt-4">
                <PriceForm initialData={course} courseId={course.id} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Upload Attachment</h2>
              </div>
              <div className="mt-4">
                <AttachmentForm initialData={course} courseId={course.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
