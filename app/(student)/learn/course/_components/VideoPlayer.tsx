"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { updateUserProgress } from "@/actions/user-progress"
import MuxPlayer from "@mux/mux-player-react"

interface VideoPlayerProps {
  chapter: {
    id: string
    title: string
    videoUrl: string
    muxData: {
      playBackId: string
    }
  }
  userId: string
}

export function VideoPlayer({ chapter, userId }: VideoPlayerProps) {
  useEffect(() => {
    if (userId && chapter.id) {
      updateUserProgress(userId, chapter.id)
    }
  }, [userId, chapter.id])

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="relative aspect-video mt-4">
        <MuxPlayer playbackId={chapter.muxData?.playBackId || ""} />
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{chapter.title}</h2>
          <p className="text-muted-foreground">
            Learn and practice meditation techniques for relaxation and
            mindfulness.
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
