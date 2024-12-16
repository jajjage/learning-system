"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { CourseCard } from "./CourseCard"
import { SearchBar } from "./SearchBar"
import { CategoryFilter } from "./CategoryFilter"
import { Category, Course, Role } from "@prisma/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CourseWithCount } from "@/types/course"
import { useCachedOrFetchCourses } from "@/hooks/search"

interface CourseListProps {
  initialCourses: CourseWithCount[]
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

  const categoryId = searchParams.get("categoryId") || ""
  const searchQuery = searchParams.get("search") || ""

  const { data: courses, isLoading } = useCachedOrFetchCourses(
    searchQuery,
    categoryId,
    initialCourses,
  )

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams)
    if (query) {
      params.set("search", query)
    } else {
      params.delete("search")
    }
    router.push(`/${role.toLowerCase()}/courses?${params.toString()}`)
  }

  const handleCategorySelect = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (categoryId) {
      params.set("categoryId", categoryId)
    } else {
      params.delete("categoryId")
    }
    router.push(`/${role.toLowerCase()}/courses?${params.toString()}`)
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
            Showing {courses?.length ?? 0} course
            {(courses?.length ?? 0) !== 1 ? "s" : ""}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses?.map((course) => (
              <CourseCard key={course.id} course={course} role={role} />
            ))}
          </div>
        )}

        {!isLoading && (!courses || courses.length === 0) && (
          <p className="text-center text-muted-foreground py-10">
            No courses found matching your criteria.
          </p>
        )}
      </div>
    </div>
  )
}
