"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import { usePriceMutation } from "@/hooks/course"

interface PriceFormProps {
  initialPrice: number | null
  courseId: string
}

export default function PriceForm({ initialPrice, courseId }: PriceFormProps) {
  const [price, setPrice] = useState(initialPrice)
  const [isEditing, setIsEditing] = useState(false)

  const { mutate: updatePrice, isPending } = usePriceMutation(courseId)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updatePrice(price, {
      onSuccess: () => setIsEditing(false),
    })
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="font-medium flex items-center justify-between">
        <h3 className="text-lg">Course Price</h3>
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
        <p className="mt-2">{price ? `$${price.toFixed(2)}` : "Free"}</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="number"
            value={price || ""}
            onChange={(e) =>
              setPrice(e.target.value ? Number(e.target.value) : null)
            }
            className="w-full p-2 border rounded-md"
            step="0.01"
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
