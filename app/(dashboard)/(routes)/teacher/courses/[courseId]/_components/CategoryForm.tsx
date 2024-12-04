"use client"
import { useCategoryMutation } from "@/hooks/course"
import { Pencil } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Course } from "@prisma/client"
import { useState } from "react"
import { ComboBox } from "@/components/global/ComboBox"

interface CategoryFormProps {
  initialData: Course
  courseId: string
  options: { label: string; value: string }[]
}
const categorySchema = z.object({
  categoryId: z.string().min(1), // Allow null values here
})

export default function CategoryForm({
  initialData,
  courseId,
  options,
}: CategoryFormProps) {
  const [isEditing, setIsEditing] = useState(false)

  const { mutate: updateCategory, isPending } = useCategoryMutation(courseId)

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryId: initialData?.categoryId || "",
    },
  })
  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    const category = values.categoryId ?? ""
    updateCategory(category, {
      onSuccess: () => setIsEditing(false),
    })
  }
  const selectedOption = options.find(
    (option) => option.value === initialData.categoryId,
  )
  return (
    <div className="mt-6 bg-slate-200 rounded-md border border-zinc-200 p-4">
      <div className="p-6">
        <div className="font-medium flex items-center justify-between">
          <h3 className="text-lg">Course Description</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm text-blue-600 hover:underline"
          >
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2 inline" />
                Edit
              </>
            )}
          </button>
        </div>
        {!isEditing ? (
          <p
            className={cn(
              "text-sm mt-2",
              !initialData.categoryId && "text-slate-400 italic",
            )}
          >
            {selectedOption?.label || "No category provided"}
          </p>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ComboBox {...field} options={options} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-cnter gap-x-2 mt-5">
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  )
}
