import { Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function VideoPlayer() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
        <Button
          size="icon"
          className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 text-white hover:bg-white/30"
        >
          <Play className="h-8 w-8" fill="currentColor" />
          <span className="sr-only">Play</span>
        </Button>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            Introduction: Tutor Introduction
          </h2>
          <p className="text-muted-foreground">
            Learn about your tutor and get an overview of the course.
          </p>
        </div>
        <Card className="p-4">
          <h3 className="font-semibold">About your Tutor</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            I practice in the Theravada Buddhist tradition, that has its roots
            in the earliest teachings of The Buddha. I trained at the True
            Forest Tradition, at the Western monastic sangha of the Thai Forest
            Tradition.
          </p>
        </Card>
      </div>
    </div>
  )
}
