"use client"

import { useState, useEffect } from "react"
import { Pencil } from "lucide-react"
import { useCategoryMutation } from "@/hooks/course"
import { getCategories } from "@/actions/course"

interface Category {
  id: string
  name: string
}

interface CategoryFormProps {
  initialCategoryId: string | null
  courseId: string
}

export default function CategoryForm({
  initialCategoryId,
  courseId,
}: CategoryFormProps) {
  const [categoryId, setCategoryId] = useState(initialCategoryId)
  const [isEditing, setIsEditing] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  const { mutate: updateCategory, isPending } = useCategoryMutation(courseId)

  useEffect(() => {
    async function fetchCategories() {
      const fetchedCategories = await getCategories()
      setCategories(fetchedCategories)
    }
    fetchCategories()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateCategory(categoryId, {
      onSuccess: () => setIsEditing(false),
    })
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="font-medium flex items-center justify-between">
        <h3 className="text-lg">Course Category</h3>
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
        <p className="mt-2">
          {categories.find((cat) => cat.id === categoryId)?.name ||
            "No category set"}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4">
          <select
            value={categoryId || ""}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
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
