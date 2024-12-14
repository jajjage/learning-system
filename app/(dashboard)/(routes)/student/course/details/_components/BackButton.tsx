import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BackButton() {
  return (
    <div className="p-4 border-b">
      <Button variant="ghost" className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to all Courses
      </Button>
    </div>
  )
}
