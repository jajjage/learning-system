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
import { cn } from "@/lib/utils"
import { Course } from "@prisma/client"
import { useState } from "react"
import { ComboBox } from "@/components/global/ComboBox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CategoryFormProps {
  initialData: Course
  courseId: string
  options: { label: string; value: string }[]
}

const categorySchema = z.object({
  categoryId: z.string().min(1),
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
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Course Category
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="ghost"
            className="flex items-center gap-x-2"
          >
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="h-4 w-4" />
                Edit category
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isEditing ? (
          <p
            className={cn(
              "text-sm",
              !initialData.categoryId && "text-slate-500 italic",
            )}
          >
            {selectedOption?.label || "No category selected"}
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
              <div className="flex justify-end gap-x-2 mt-4">
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}
