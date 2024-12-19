import { Check, ChevronRight, Clock, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface CurriculumProps {
  chapters: {
    id: string
    title: string
    position: number
    duration: string
    userProgress: {
      id: string
      userId: string
      isCompleted: boolean
    }[]
  }[]
  isOpen: boolean
  onClose: () => void
}

export function Curriculum({ chapters, isOpen, onClose }: CurriculumProps) {
  const content = (
    <div className="space-y-6 p-6">
      {chapters.map((section) => (
        <div key={section.title} className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">
            {section.title}
          </h4>
          <div className="space-y-1">
            {section.userProgress.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 rounded-sm p-2 text-sm font-normal",
                  item.isCompleted && "text-muted-foreground",
                )}
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full border">
                  {item.isCompleted ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </div>
              </Button>
            ))}
          </div>
          {/* <span className="flex-1 truncate text-left">{section.id}</span> */}
          <span className="flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            {section.duration}
          </span>
        </div>
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
          <SheetTitle>rm </SheetTitle>
          <div className="flex h-14 items-center justify-between border-b px-6">
            <h2 className="font-semibold">Course Curriculum</h2>
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
