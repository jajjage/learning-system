import { getCourse } from "@/actions/course"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import TitleForm from "../_components/TitleForm"
import DescriptionForm from "../_components/DescriptionForm"
import PriceForm from "../_components/PriceForm"
import ImageForm from "../_components/ImageForm"
import CategoryForm from "../_components/CategoryForm"

export default async function CourseEditPage({
  params,
}: {
  params: { courseId: string }
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/")
  }

  const course = await getCourse(params.courseId)

  if (!course) {
    redirect("/")
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Edit Your Course</h1>
        <p className="text-xl text-muted-foreground">
          Customize your course details below. Each section can be edited
          independently. Click on the edit button to make changes, and don't
          forget to save your updates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1">
          <TitleForm initialTitle={course.title} courseId={course.id} />
        </div>
        <div className="col-span-1 md:col-span-2">
          <DescriptionForm
            initialDescription={course.description}
            courseId={course.id}
          />
        </div>
        <div className="col-span-1">
          <PriceForm initialPrice={course.price} courseId={course.id} />
        </div>
        <div className="col-span-1 md:col-span-2">
          <ImageForm initialImageUrl={course.imageUrl} courseId={course.id} />
        </div>
        <div className="col-span-1">
          <CategoryForm
            initialCategoryId={course.categoryId}
            courseId={course.id}
          />
        </div>
      </div>
    </div>
  )
}
