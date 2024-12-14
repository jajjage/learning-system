"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CourseCard } from "./CourseCard"
import { SearchBar } from "./SearchBar"
import { CategoryFilter } from "./CategoryFilter"
import { Category, Course, Role } from "@prisma/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CourseWithCount } from "@/types/course"

interface CourseListProps {
  initialCourses: Course[]
  initialCategories: Category[]
  role: Role
}

export function CourseList({
  initialCourses,
  initialCategories,
  role,
}: CourseListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [courses, setCourses] = useState<Course[] | CourseWithCount[]>(
    initialCourses,
  )
  const [loading, setLoading] = useState(false)

  const categoryId = searchParams.get("categoryId") || ""
  const searchQuery = searchParams.get("search") || ""
  console.log("Courses fetched:", courses)
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
    router.push(`/${role.toLocaleLowerCase()}/courses?${params.toString()}`)
  }

  const handleCategorySelect = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (categoryId) {
      params.set("categoryId", categoryId)
    } else {
      params.delete("categoryId")
    }
    router.push(`/${role.toLocaleLowerCase()}/courses?${params.toString()}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center space-x-4">
        <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
        {role === "TEACHER" ? (
          <Button asChild>
            <Link href="/teacher/create">Create Course</Link>
          </Button>
        ) : (
          <div>student</div>
        )}
      </div>
      <div className="space-y-4">
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
            {courses.map((course) => {
              if (!("_count" in course)) {
                console.error("Invalid course data:", course)
                return null
              }
              return (
                <CourseCard
                  key={course.id}
                  course={course as CourseWithCount}
                  role={role}
                />
              )
            })}
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
