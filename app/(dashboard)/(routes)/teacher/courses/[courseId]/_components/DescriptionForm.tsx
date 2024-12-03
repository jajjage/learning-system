"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import { useDescriptionMutation } from "@/hooks/course"
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface DescriptionFormProps {
  initialData: {
    description: string | null
  }
  courseId: string
}
const descriptionSchema = z.object({
  description: z.string().nullable(), // Allow null values here
})

export default function DescriptionForm({
  initialData,
  courseId,
}: DescriptionFormProps) {
  const [isEditing, setIsEditing] = useState(false)

  const { mutate: updateDescription, isPending } =
    useDescriptionMutation(courseId)

  const form = useForm<z.infer<typeof descriptionSchema>>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: initialData,
  })
  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof descriptionSchema>) => {
    const description = values.description ?? ""
    updateDescription(description, {
      onSuccess: () => setIsEditing(false),
    })
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
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
        <p className="mt-2">
          {initialData.description || "No description provided"}
        </p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g 'Advanced web development'"
                      {...{ ...field, value: field.value ?? "" }} // Spread the rest of the field properties except value
                    />
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
  )
}
