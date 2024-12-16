import { Course, Role } from "@prisma/client"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { CourseWithCount } from "@/types/course"
import { fetchTeacherCourses, fetchStudentCourses } from "./course"

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
  role: Role,
  initialData?: CourseWithCount[], // Initial data is role-specific
) => {
  if (!role || (role !== "TEACHER" && role !== "STUDENT")) {
    throw new Error("Invalid role parameter")
  }

  const queryClient = useQueryClient()

  // Initial data query
  const initialQuery = useQuery({
    queryKey: ["courses", role, "", ""], // Include role in the query key
    queryFn: () =>
      role === "TEACHER"
        ? fetchTeacherCourses("", "")
        : fetchStudentCourses("", ""),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    initialData, // Use initialData when no filters are applied
  })

  // Filtered query
  const filteredQuery = useQuery({
    queryKey: ["courses", role, searchQuery, categoryId], // Include role in the query key
    queryFn: () =>
      role === "TEACHER"
        ? fetchTeacherCourses(searchQuery, categoryId)
        : fetchStudentCourses(searchQuery, categoryId),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    initialData:
      initialData && !searchQuery && !categoryId ? initialData : undefined, // Use initialData only if no filters
  })

  // Determine data based on filters
  const shouldUseFiltered = !!(searchQuery || categoryId)
  const cachedData = queryClient.getQueryData<CourseWithCount[]>([
    "courses",
    role,
    "",
    "",
  ])

  let data: CourseWithCount[] | undefined
  let isLoading = false

  if (shouldUseFiltered) {
    if (filteredQuery.isLoading) {
      // Show cached filtered results if available
      data = filterCourses(cachedData, searchQuery, categoryId)
      isLoading = data.length === 0 // Show loading only if no cached data
    } else {
      data = filteredQuery.data
      isLoading = false
    }
  } else {
    // Use initial query data when no filters are applied
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
