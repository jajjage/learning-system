"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function BackButton() {
  const router = useRouter()
  return (
    <div className="p-4 border-b">
      <Button onClick={() => router.back()} variant="ghost" className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to all Courses
      </Button>
    </div>
  )
}
