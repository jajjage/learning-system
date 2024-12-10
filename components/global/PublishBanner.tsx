"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "react-hot-toast"

interface PublishBannerProps {
  initialIsPublished: boolean
  entityId: string
  entityTitle: string
  entityType: "course" | "chapter"
  onPublishToggle: (
    id: string,
    isPublished: boolean,
  ) => Promise<{ isPublished: boolean }>
}

export const PublishBanner = ({
  initialIsPublished,
  entityId,
  entityTitle,
  entityType,
  onPublishToggle,
}: PublishBannerProps) => {
  const [isPublished, setIsPublished] = useState(initialIsPublished)
  const [isLoading, setIsLoading] = useState(false)

  const handlePublishToggle = async () => {
    try {
      setIsLoading(true)
      const result = await onPublishToggle(entityId, !isPublished)
      setIsPublished(result.isPublished)
      toast.success(
        `${entityType === "course" ? "Course" : "Chapter"} ${result.isPublished ? "published" : "unpublished"} successfully`,
      )
    } catch (error) {
      console.error(`Error updating ${entityType} publish status:`, error)
      toast.error(`Failed to update ${entityType} status`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="border bg-slate-100 rounded-md p-4 flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        {isPublished ? (
          <>
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-sm font-medium text-green-600">
              This {entityType} is published
            </p>
          </>
        ) : (
          <>
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <p className="text-sm font-medium text-yellow-600">
              This {entityType} is not published
            </p>
          </>
        )}
      </div>
      <div className="flex items-center gap-x-2">
        {/* {isPublished && entityType === "course" && (
          <Button size="sm" variant="outline" asChild>
            <Link href={`/courses/${entityId}`}>View {entityType}</Link>
          </Button>
        )} */}
        <Button
          size="sm"
          variant={isPublished ? "outline" : "default"}
          onClick={handlePublishToggle}
          disabled={isLoading}
        >
          {isPublished ? "Unpublish" : "Publish"}
        </Button>
      </div>
    </div>
  )
}
