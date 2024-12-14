"use client"

import { useState } from "react"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "react-hot-toast"

interface DeleteButtonProps {
  entityId: string
  courseId?: string
  entityType: "course" | "chapter"
  onDelete: (chapterId: string, courseId?: string) => Promise<void>
}

function DeleteButton({
  entityId,
  entityType,
  courseId,
  onDelete,
}: DeleteButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      await onDelete(entityId, courseId)
      toast.success(
        `${entityType === "course" ? "Course" : "Chapter"} deleted successfully`,
      )
      if (entityType === "chapter") {
        router.push(`/teacher/courses/${courseId}`)
      } else {
        router.refresh()
      }
    } catch (error) {
      toast.error(`Failed to delete ${entityType}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the{" "}
            {entityType}
            {entityType === "course" && " and all of its associated chapters"}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteButton
