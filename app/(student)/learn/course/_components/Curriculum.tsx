"use client"

import { Check, CheckCircle, ChevronRight, Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { initializeChapterProgress } from "@/actions/user-progress"

interface Chapter {
  id: string
  title: string
  position: number
  duration: string
  videoUrl: string
  userProgress?: {
    id: string
    userId: string
    isCompleted: boolean
  }
}

interface CurriculumProps {
  chapters: Chapter[]
  isOpen: boolean
  onClose: () => void
  onChapterSelect: (chapter: Chapter) => void
  currentChapterId: string
}

export function Curriculum({
  chapters,
  isOpen,
  onClose,
  onChapterSelect,
  currentChapterId,
}: CurriculumProps) {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null)

  // Initialize progress when component mounts and when chapter changes
  useEffect(() => {
    const currentChapter = chapters.find(
      (chapter) => chapter.id === currentChapterId,
    )
    if (
      currentChapter &&
      (!selectedChapter || selectedChapter.id !== currentChapter.id)
    ) {
      setSelectedChapter(currentChapter)
      initializeChapterProgress(currentChapter.id)
    }
  }, [currentChapterId, chapters])

  const handleChapterSelect = async (chapter: Chapter) => {
    setSelectedChapter(chapter)
    onChapterSelect(chapter)
  }

  const content = (
    <div className="space-y-6 p-6">
      {chapters.map((chapter) => (
        <Button
          key={chapter.id}
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 rounded-sm p-2 text-sm font-normal hover:bg-accent/50",
            chapter.userProgress?.isCompleted && "text-muted-foreground",
            chapter.id === currentChapterId &&
              "bg-accent text-accent-foreground",
          )}
          onClick={() => handleChapterSelect(chapter)}
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full border">
            {chapter.userProgress?.isCompleted ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : chapter.id === currentChapterId ? (
              <div className="h-2 w-2 rounded-full bg-current" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </div>
          <span className="flex-1 truncate text-left">{chapter.title}</span>
          <span className="flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            {chapter.duration}
          </span>
        </Button>
      ))}
    </div>
  )

  return (
    <>
      {/* Desktop version */}
      <aside className="hidden w-80 border-l lg:block">
        <div className="flex h-14 items-center border-b px-6 font-semibold">
          Course Curriculum
        </div>
        <ScrollArea className="h-[calc(100vh-3.5rem)]">{content}</ScrollArea>
      </aside>

      {/* Mobile version */}
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="w-80 p-0">
          <SheetTitle className="px-6 py-4">Course Curriculum</SheetTitle>
          <div className="flex h-14 items-center justify-end border-b px-6">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-3.5rem)]">{content}</ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  )
}
