"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import { useDescriptionMutation } from "@/hooks/course"

interface DescriptionFormProps {
  initialDescription: string
  courseId: string
}

export default function DescriptionForm({
  initialDescription,
  courseId,
}: DescriptionFormProps) {
  const [description, setDescription] = useState(initialDescription || "")
  const [isEditing, setIsEditing] = useState(false)

  const { mutate: updateDescription, isPending } =
    useDescriptionMutation(courseId)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateDescription(description, {
      onSuccess: () => setIsEditing(false),
    })
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="font-medium flex items-center justify-between">
        <h3 className="text-lg">Course Description</h3>
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
        <p className="mt-2">{description || "No description provided"}</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows={4}
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
