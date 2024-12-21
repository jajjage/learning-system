"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, ChevronRight, Lock, CheckCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import MuxPlayer from "@mux/mux-player-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Chapter {
  id: string
  title: string
  description?: string
  position: number
  duration: string | null
  videoUrl: string
  isFree: boolean
  isPublished: boolean
  hasAccess: boolean
  muxData?: {
    playBackId: string | null
  }
}
;[]

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  course: {
    title: string
    chapters: Chapter[]
  }
  isPurchased?: boolean
  isFree: boolean
}

export function CoursePreviewModal({
  isOpen,
  onClose,
  course,
  isFree,
}: PreviewModalProps) {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null)

  // Sort and filter chapters
  const publishedChapters = course.chapters
    .sort((a, b) => a.position - b.position)
    .filter((chapter) => chapter.isPublished)

  // Select first free chapter by default
  useEffect(() => {
    const firstFreeChapter = publishedChapters.find((chapter) => chapter.isFree)
    if (firstFreeChapter) {
      setSelectedChapter(firstFreeChapter)
    }
  }, [course.chapters])

  const handleChapterSelect = (chapter: Chapter) => {
    if (!chapter.isFree && !chapter.hasAccess) return
    setSelectedChapter(chapter)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden">
        <DialogTitle className="p-4 text-lg font-bold">
          Course preview
        </DialogTitle>
        <div className="flex h-full max-h-[90vh]">
          {/* Video Section */}
          <div className="flex-1 relative">
            <div className="absolute top-2 right-2 z-10">
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {selectedChapter ? (
              <div className="flex flex-col h-full">
                <div className="relative aspect-video">
                  {!selectedChapter.isFree && !selectedChapter.hasAccess ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                      <div className="text-center">
                        <Lock className="h-12 w-12 mx-auto mb-2 text-slate-400" />
                        <p className="text-sm text-slate-400">
                          Purchase this course to access this chapter
                        </p>
                      </div>
                    </div>
                  ) : (
                    <MuxPlayer
                      key={selectedChapter.muxData?.playBackId}
                      playbackId={selectedChapter.muxData?.playBackId || ""}
                    />
                  )}
                </div>
                <div className="p-4 flex-1 overflow-y-auto">
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedChapter.title}
                  </h2>
                  {selectedChapter.description && (
                    <p className="text-sm text-muted-foreground">
                      {selectedChapter.description}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full bg-slate-800">
                <p className="text-sm text-slate-400">
                  Select a chapter to preview
                </p>
              </div>
            )}
          </div>

          {/* Chapters List */}
          <div className="w-80 border-l flex flex-col bg-muted/10">
            <div className="p-4 border-b">
              <h3 className="font-semibold">{course.title}</h3>
              <p className="text-sm text-muted-foreground">Course Preview</p>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-2">
                {publishedChapters.map((chapter) => {
                  const isAccessible = chapter.isFree || isFree
                  const isFreePreview = chapter.position === 0
                  const isLocked = !chapter.isFree && !chapter.hasAccess
                  return (
                    <button
                      key={chapter.id}
                      onClick={() => handleChapterSelect(chapter)}
                      className={cn(
                        "flex items-center gap-2 w-full p-2 rounded-md hover:bg-accent/50 text-sm",
                        selectedChapter?.id === chapter.id && "bg-accent",
                        isLocked && "cursor-not-allowed opacity-60",
                      )}
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border">
                        {isLocked ? (
                          <Lock className="h-3 w-3" />
                        ) : (
                          <ChevronRight className="h-3 w-3" />
                        )}
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex-1 flex items-start gap-1">
                          <span className="text-muted-foreground">
                            {chapter.position}.
                          </span>
                          {isAccessible ? (
                            <div className="truncate">
                              <span className="truncate cursor-pointer">
                                {chapter.title}
                              </span>
                              <span className="ml-1 text-xs text-muted-foreground">
                                {isFreePreview ? "(Free)" : "(Premium)"}
                              </span>
                            </div>
                          ) : (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="truncate">
                                  <span className="truncate cursor-pointer">
                                    {chapter.title}
                                  </span>
                                  <span className="ml-1 text-xs text-muted-foreground">
                                    (Premium)
                                  </span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="bg-gray-800 text-white p-2 rounded-md shadow-md">
                                You have to enroll to access the chapter.
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {chapter.duration}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
