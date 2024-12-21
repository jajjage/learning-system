"use client"

import { Check, CheckCircle, ChevronRight, Clock, Lock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

interface Chapter {
  id: string
  title: string
  position: number
  duration: string
  videoUrl: string
  isFree: boolean
  isPublished: boolean
  hasAccess: boolean
  userProgress?: {
    id: string
    userId: string
    isCompleted: boolean
  } | null
}

interface CurriculumProps {
  chapters: Chapter[]
  isOpen: boolean
  onClose: () => void
  onChapterSelect: (chapter: Chapter) => void
  currentChapterId: string
  isPurchased?: boolean
  courseTitle: string
  courseIsFree: boolean
}

export function Curriculum({
  chapters,
  isOpen,
  onClose,
  onChapterSelect,
  currentChapterId,
  courseTitle,
  courseIsFree,
}: CurriculumProps) {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null)

  // Filter out unpublished chapters
  const publishedChapters = chapters
    .sort((a, b) => a.position - b.position)
    .filter((chapter) => chapter.isPublished)

  useEffect(() => {
    const currentChapter = publishedChapters.find(
      (chapter) => chapter.id === currentChapterId,
    )
    if (
      currentChapter &&
      (!selectedChapter || selectedChapter.id !== currentChapter.id)
    ) {
      setSelectedChapter(currentChapter)
    }
  }, [currentChapterId, publishedChapters])

  const handleChapterSelect = async (chapter: Chapter) => {
    if (!chapter.isFree && !chapter.hasAccess) {
      toast.error("Purchase the course to access this chapter.")
      setSelectedChapter(chapter)
      onChapterSelect(chapter)
    }
    setSelectedChapter(chapter)
    onChapterSelect(chapter)
  }
  console.log("isfree", courseIsFree)
  const content = (
    <div className="space-y-6 p-6">
      {publishedChapters.map((chapter) => {
        const isLocked = !chapter.isFree && !chapter.hasAccess

        return (
          <Button
            key={chapter.id}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2 rounded-sm p-2 text-sm font-normal hover:bg-accent/50",
              chapter.userProgress?.isCompleted && "text-muted-foreground",
              chapter.id === currentChapterId &&
                "bg-accent text-accent-foreground",
              isLocked && "cursor-not-allowed opacity-60",
            )}
            onClick={() => handleChapterSelect(chapter)}
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full border">
              {isLocked ? (
                <Lock className="h-3 w-3" />
              ) : chapter.userProgress?.isCompleted ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : chapter.id === currentChapterId ? (
                <div className="h-2 w-2 rounded-full bg-current" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </div>
            <div className="flex-1 flex items-center">
              <span className="text-muted-foreground mr-2">
                {chapter.position}.
              </span>
              <span className="truncate">
                {chapter.title}
                {!courseIsFree && !isLocked && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    (Premium)
                  </span>
                )}
              </span>
            </div>
            <span className="flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              {chapter.duration}
            </span>
          </Button>
        )
      })}
    </div>
  )

  return (
    <>
      <aside className="hidden w-80 border-l lg:block">
        <div className="flex h-14 items-center border-b px-6 font-semibold">
          Course Curriculum
        </div>
        <ScrollArea className="h-[calc(100vh-3.5rem)]">{content}</ScrollArea>
      </aside>

      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="w-80 p-0">
          <SheetTitle className="px-6 py-4">{courseTitle}</SheetTitle>
          <div className="flex h-14 items-center justify-left border-b px-6">
            <p>Course Curriculum</p>
          </div>
          <ScrollArea className="h-[calc(100vh-3.5rem)]">{content}</ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  )
}
