"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Course } from "@prisma/client"
import { cn } from "@/lib/utils"
import { usePriceMutation } from "@/hooks/course"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil } from "lucide-react"

interface PriceFormProps {
  initialData: Course
  courseId: string
}

const formSchema = z.object({
  price: z.coerce.number().min(0, "Price must be at least 0"),
})

export default function PriceForm({ initialData, courseId }: PriceFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || 0,
    },
  })

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const { mutate: updateCoursePrice } = usePriceMutation(courseId)
  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      updateCoursePrice(values.price, {
        onSuccess: () => setIsEditing(false),
      })
      router.refresh()
    } catch (error) {
      console.error("Failed to update course price:", error)
    }
  }

  return (
    <Card className="mt-6 bg-slate-100">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Course Price
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
                Edit price
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isEditing && (
          <p
            className={cn(
              "text-sm mt-2",
              !initialData.price && "text-slate-500 italic",
            )}
          >
            {initialData.price
              ? `$${initialData.price.toFixed(2)}`
              : "No price set"}
          </p>
        )}
        {isEditing && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        ref={inputRef}
                        type="number"
                        step="0.01"
                        disabled={isSubmitting}
                        placeholder="Set a price for your course"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Button disabled={!isValid || isSubmitting} type="submit">
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
