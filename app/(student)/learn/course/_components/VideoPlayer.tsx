"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Lock, Play } from "lucide-react"
import { markChapterCompleted } from "@/actions/user-progress"
import MuxPlayer from "@mux/mux-player-react"
import { toast } from "@/hooks/use-toast"

interface VideoPlayerProps {
  chapter: {
    id: string
    title: string
    videoUrl: string
    hasAccess: boolean
    muxData: {
      playBackId: string
    }
    userProgress?: {
      isCompleted: boolean
    } | null
    isFree: boolean
    isPublished: boolean
  }
  isPurchased?: boolean
}

export function VideoPlayer({
  chapter,
  isPurchased = false,
}: VideoPlayerProps) {
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const previousChapterId = useRef(chapter.id)

  const isLocked = !chapter.isFree && !chapter.hasAccess

  useEffect(() => {
    if (previousChapterId.current !== chapter.id) {
      setIsCompleted(false)
      previousChapterId.current = chapter.id
    }

    setIsCompleted(!!chapter.userProgress?.isCompleted)
  }, [chapter.id, chapter.userProgress])

  const onEnd = async () => {
    if (isLocked) return

    try {
      setIsLoading(true)
      const response = await markChapterCompleted(chapter.id)

      if (response.success) {
        setIsCompleted(true)
        toast({
          title: "Chapter completed!",
          description: "Your progress has been saved.",
          duration: 3000,
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark chapter as completed. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleManualComplete = async () => {
    if (!isCompleted && !isLoading && !isLocked) {
      await onEnd()
    }
  }

  if (!chapter.isPublished) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold">Chapter Not Available</h2>
        <p className="text-muted-foreground mt-2">
          This chapter is not yet published.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="relative">
        {isLocked ? (
          <div className="relative aspect-video mt-4 bg-slate-800 flex items-center justify-center">
            <div className="text-center">
              <Lock className="h-12 w-12 mx-auto mb-2 text-slate-500" />
              <h2 className="text-xl font-semibold mb-2">Premium Chapter</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Purchase the course to unlock this chapter
              </p>
              <Button variant="secondary">Get Access</Button>
            </div>
          </div>
        ) : (
          <div className="relative aspect-video mt-4">
            <MuxPlayer
              key={chapter.muxData?.playBackId}
              playbackId={chapter.muxData?.playBackId || ""}
              onEnded={onEnd}
              metadata={{
                video_title: chapter.title,
                chapter_id: chapter.id,
              }}
            />
          </div>
        )}

        {!isLocked && (
          <div className="absolute top-4 right-4">
            <Button
              onClick={handleManualComplete}
              disabled={isLoading || isCompleted}
              variant={isCompleted ? "ghost" : "secondary"}
              className="flex items-center gap-2"
            >
              {isCompleted ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Completed
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Mark as Complete
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-start justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold">
              {chapter.title}
              {!chapter.isFree && !isLocked && (
                <span className="ml-2 text-sm text-muted-foreground">
                  (Premium)
                </span>
              )}
            </h2>
            <p className="text-muted-foreground">
              Learn and practice meditation techniques for relaxation and
              mindfulness.
            </p>
          </div>
          {isCompleted && !isLocked && (
            <span className="flex items-center text-sm text-green-500">
              <CheckCircle className="w-4 h-4 mr-2" />
              Completed
            </span>
          )}
        </div>

        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Play className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">About your Tutor</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                I practice in the Theravada Buddhist tradition, that has its
                roots in the earliest teachings of The Buddha. I trained at the
                True Forest Tradition, at the Western monastic sangha of the
                Thai Forest Tradition.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
