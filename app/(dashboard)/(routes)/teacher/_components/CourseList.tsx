"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CourseCard } from "./CourseCard"
import { SearchBar } from "./SearchBar"
import { CategoryFilter } from "./CategoryFilter"
import { Category, Course } from "@prisma/client"

interface CourseListProps {
  initialCourses: Course[]
  initialCategories: Category[]
}

export function CourseList({
  initialCourses,
  initialCategories,
}: CourseListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [loading, setLoading] = useState(false)

  const categoryId = searchParams.get("categoryId") || ""
  const searchQuery = searchParams.get("search") || ""

  useEffect(() => {
    const filterCourses = () => {
      setLoading(true)
      const filteredCourses = initialCourses.filter((course) => {
        const matchesSearch =
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description?.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesCategory = !categoryId || course.categoryId === categoryId
        return matchesSearch && matchesCategory
      })

      setCourses(filteredCourses)
      setLoading(false)
    }

    filterCourses()
  }, [categoryId, searchQuery, initialCourses])

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams)
    if (query) {
      params.set("search", query)
    } else {
      params.delete("search")
    }
    router.push(`/teacher/courses?${params.toString()}`)
  }

  const handleCategorySelect = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (categoryId) {
      params.set("categoryId", categoryId)
    } else {
      params.delete("categoryId")
    }
    router.push(`/teacher/courses?${params.toString()}`)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="max-w-md">
          <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
        </div>
        <CategoryFilter
          categories={initialCategories}
          selectedCategory={categoryId}
          onSelectCategory={handleCategorySelect}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {courses.length} course{courses.length !== 1 ? "s" : ""}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {!loading && courses.length === 0 && (
          <p className="text-center text-muted-foreground py-10">
            No courses found matching your criteria.
          </p>
        )}
      </div>
    </div>
  )
}
