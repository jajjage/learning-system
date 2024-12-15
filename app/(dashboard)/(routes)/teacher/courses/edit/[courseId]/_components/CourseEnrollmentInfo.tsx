"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar, Users, AlertCircle, Loader2 } from "lucide-react"
import { Course } from "@prisma/client"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { toast } from "react-hot-toast"
import { useUpdateCourseMutation } from "@/hooks/course"

interface CourseEnrollmentInfoProps {
  initialData: Course
  courseId: string
}

const formSchema = z.object({
  maxEnrollment: z.number().min(1, "Maximum enrollment must be at least 1"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  enrollmentDeadline: z.string().min(1, "Enrollment deadline is required"),
  isEnrollmentOpen: z.boolean(),
})

export default function CourseEnrollmentInfo({
  initialData,
  courseId,
}: CourseEnrollmentInfoProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const toggleEdit = () => setIsEditing((current) => !current)
  const { mutate: updateEnrollmentStatus, isPending } =
    useUpdateCourseMutation(courseId)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      maxEnrollment: initialData.maxEnrollment || 0,
      startDate: new Date(initialData.enrollmentDeadline || Date.now())
        .toISOString()
        .split("T")[0],
      endDate: new Date(initialData.enrollmentDeadline || Date.now())
        .toISOString()
        .split("T")[0],
      enrollmentDeadline: new Date(initialData.enrollmentDeadline || Date.now())
        .toISOString()
        .split("T")[0],
      isEnrollmentOpen: initialData.isEnrollmentOpen,
    },
  })

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])
  const { isSubmitting, isValid } = form.formState

  const startDate = initialData.startDate
    ? new Date(initialData.startDate).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0]

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      console.log(`this is the value i pass: ${values}`)
      updateEnrollmentStatus(values as unknown as Partial<Course>, {
        onSuccess: (data) => console.log(data),
      })

      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="mt-6 bg-slate-100">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Course Enrollment Information
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </CardTitle>
        <CardDescription>
          View and manage enrollment details for this course.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isEditing ? (
          <ul className="space-y-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <li className="flex items-center justify-between p-3 bg-white border rounded-md">
                    <div className="flex items-center gap-x-2">
                      <Users className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm font-medium">
                        Max Enrollment
                      </span>
                    </div>
                    <span className="text-sm">{initialData.maxEnrollment}</span>
                  </li>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Maximum number of students that can enroll in this course
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <li className="flex items-center justify-between p-3 bg-white border rounded-md">
                    <div className="flex items-center gap-x-2">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm font-medium">Course Dates</span>
                    </div>
                    <span className="text-sm">
                      {formatDate(startDate)} - {formatDate(startDate)}
                    </span>
                  </li>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Start and end dates for the course</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <li className="flex items-center justify-between p-3 bg-white border rounded-md">
                    <div className="flex items-center gap-x-2">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm font-medium">
                        Enrollment Deadline
                      </span>
                    </div>
                    <span className="text-sm">{formatDate(startDate)}</span>
                  </li>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Last day to enroll in the course</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <li className="flex items-center justify-between p-3 bg-white border rounded-md">
              <span className="text-sm font-medium">Enrollment Status</span>
              <span
                className={`text-sm font-semibold ${initialData.isEnrollmentOpen ? "text-green-600" : "text-red-600"}`}
              >
                {initialData.isEnrollmentOpen ? "Open" : "Closed"}
              </span>
            </li>
          </ul>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="maxEnrollment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Enrollment</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        ref={inputRef}
                        type="number"
                        step="0.01"
                        onChange={(e) => {
                          const value = parseFloat(e.target.value)
                          field.onChange(isNaN(value) ? "" : value) // Prevent NaN
                        }}
                        disabled={isSubmitting}
                        placeholder="Maximum Enrollment"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="enrollmentDeadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deadline Status</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isEnrollmentOpen"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Enrollment Status</FormLabel>
                      <FormDescription>
                        Toggle enrollment status for this course
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} type="submit">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}
