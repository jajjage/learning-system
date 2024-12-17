"use client"
import { Card } from "@/components/ui/card"
import { useUser } from "@clerk/nextjs"

interface CourseTutorProps {
  name: string
  bio: string
  imageUrl: string
}

export function CourseTutor({ name, bio, imageUrl }: CourseTutorProps) {
  const { user } = useUser()
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Course Tutor</h2>
      <div className="flex items-start gap-4">
        <img
          src={imageUrl}
          alt={name}
          className="rounded-full w-20 h-20 object-cover"
        />
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-600 mt-2">{bio}</p>
        </div>
      </div>
    </Card>
  )
}
