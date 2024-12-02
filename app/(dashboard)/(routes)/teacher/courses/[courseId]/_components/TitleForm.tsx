"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import { useTitleMutation } from "@/hooks/course"

interface TitleFormProps {
  initialTitle: string
  courseId: string
}

export default function TitleForm({ initialTitle, courseId }: TitleFormProps) {
  const [title, setTitle] = useState(initialTitle)
  const [isEditing, setIsEditing] = useState(false)

  const { mutate: updateTitle, isPending } = useTitleMutation(courseId)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateTitle(title, {
      onSuccess: () => setIsEditing(false),
    })
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="font-medium flex items-center justify-between">
        <h3 className="text-lg">Course Title</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm text-blue-600 hover:underline"
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2 inline" />
              Edit
            </>
          )}
        </button>
      </div>
      {!isEditing ? (
        <p className="mt-2">{title}</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <button
            type="submit"
            disabled={isPending}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            Save
          </button>
        </form>
      )}
    </div>
  )
}
