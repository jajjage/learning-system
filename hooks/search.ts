import { Course } from "@prisma/client"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { CourseWithCount } from "@/types/course"
import { fetchCourses } from "./course"

// Helper function to filter courses
const filterCourses = (
  courses: CourseWithCount[] | undefined,
  searchQuery: string,
  categoryId: string,
): CourseWithCount[] => {
  if (!courses) return []

  return courses.filter((course) => {
    const matchesSearch = searchQuery
      ? course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase())
      : true

    const matchesCategory = categoryId ? course.categoryId === categoryId : true

    return matchesSearch && matchesCategory
  })
}

export const useCachedOrFetchCourses = (
  searchQuery: string,
  categoryId: string,
  initialData?: CourseWithCount[],
) => {
  const queryClient = useQueryClient()

  // Always fetch initial data
  const initialQuery = useQuery({
    queryKey: ["courses", "", ""],
    queryFn: () => fetchCourses("", ""),
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  })

  // Always fetch filtered data if there are filters
  const filteredQuery = useQuery({
    queryKey: ["courses", searchQuery, categoryId],
    queryFn: () => fetchCourses(searchQuery, categoryId),
    initialData:
      initialData && !searchQuery && !categoryId ? initialData : undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  // Determine which data to use
  const shouldUseFiltered = !!(searchQuery || categoryId)
  const cachedData = queryClient.getQueryData<CourseWithCount[]>([
    "courses",
    "",
    "",
  ])

  let data: CourseWithCount[] | undefined
  let isLoading = false

  if (shouldUseFiltered) {
    if (filteredQuery.isLoading) {
      // If filtered query is loading, try to show cached filtered results
      data = filterCourses(cachedData, searchQuery, categoryId)
      isLoading = data.length === 0 // Only show loading if we don't have cached results
    } else {
      data = filteredQuery.data
      isLoading = false
    }
  } else {
    data = initialQuery.data
    isLoading = initialQuery.isLoading
  }

  return {
    data: data || [],
    isLoading,
    isError: shouldUseFiltered ? filteredQuery.isError : initialQuery.isError,
    error: shouldUseFiltered ? filteredQuery.error : initialQuery.error,
  }
}

// Type for the hook return value
export type UseCachedOrFetchCoursesReturn = ReturnType<
  typeof useCachedOrFetchCourses
>
