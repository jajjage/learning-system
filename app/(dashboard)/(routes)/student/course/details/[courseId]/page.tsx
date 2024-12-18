import { Separator } from "@/components/ui/separator"
import { BackButton } from "../_components/BackButton"
import { CourseHero } from "../_components/CourseHero"
import { CourseOverview } from "../_components/CourseOverview"
import { CourseReviews } from "../_components/CourseReviews"
import { CourseTutor } from "../_components/CourseTutor"
import { onAuthenticatedUser } from "@/actions/auth"
import { QueryClient } from "@tanstack/react-query"
import { redirect } from "next/navigation"
import { getCourseDetail } from "@/actions/course"
import { getUserByClerkId } from "@/hooks/clerk-user"
import { checkEnrollmentStatus, getEnrollCourse } from "@/actions/enrollments"
import { EnrollPopUp } from "../_components/EnrollPopUp"
import { User } from "lucide-react"

// would be back to use the actual data from the db
const CoursePage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>
}) => {
  const { user } = await onAuthenticatedUser()
  const client = new QueryClient()

  if (!user?.clerkId) {
    return redirect("/")
  }

  const { courseId } = await params
  // const cachedCourse = client.getQueryData(["course", courseId])

  const { isEnrolled } = await checkEnrollmentStatus(courseId)

  const course = await client.fetchQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseDetail(courseId),
  })
  const courseEnroll = await client.fetchQuery({
    queryKey: ["course", courseId],
    queryFn: () => getEnrollCourse(courseId),
  })

  if (!course) {
    return redirect("/")
  }
  const clerkUser = await getUserByClerkId(course.user.clerkId)

  const courseData = {
    title: course.title,
    rating: 4.8,
    reviewCount: course.totalRatings,
    duration: "12hr Course",
    description: course.description,
    imageUrl: course.imageUrl,
    isOpen: course.isEnrollmentOpen,
    isFree: course.isFree,
    category: course.category,
    level: "Beginner",
    startDate: course.startDate,
    endDate: course.endDate,
    certificateOffered: true,
    reviews: [
      {
        title: "Amazing Course!",
        rating: 5,
        text: "Highly Recommended course, the videos are easy to digest, this course helped me improve my whole meditation process!",
      },
      {
        title: "Nice Course, James is great",
        rating: 4,
        text: "Highly Recommended course, the videos are easy to digest, this course helped me improve my whole meditation process!",
      },
      {
        title: "Loved this Course",
        rating: 5,
        text: "Highly Recommended course, the videos are easy to digest, this course helped me improve my whole meditation process!",
      },
    ],
    tutor: {
      name: `${course.user.firstName} ${course.user.lastName}`,
      bio: `I practice in the Theravada Buddhist tradition, that has its roots in the earliest
        teachings of The Buddha.

        I trained in the Thai Forest Tradition, in the Western monastic lineage of the
        teacher Ajahn Chah.`,
      imageUrl: clerkUser.imageUrl,
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <BackButton />
      <CourseHero
        title={courseData.title}
        rating={courseData.rating}
        reviewCount={courseData.reviewCount}
        duration={courseData.duration}
        imageUrl={courseData.imageUrl || ""}
        isOpen={courseData.isOpen}
        isFree={courseData.isFree}
        category={courseData.category?.name || ""}
        level={courseData.level}
        courseId={course.id}
        isEnrolled={isEnrolled}
      >
        <EnrollPopUp
          courseId={courseEnroll?.id || ""}
          title={courseEnroll?.title || ""}
          price={courseEnroll?.price || undefined}
          enrollmentLimit={courseEnroll?.maxEnrollment || undefined}
          currentEnrollments={courseEnroll?._count.enrollments}
          description={courseEnroll?.description || ""}
          userData={user}
        />
      </CourseHero>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CourseOverview
              description={courseData.description || ""}
              startDate={
                courseData.startDate
                  ? courseData.startDate.toDateString()
                  : new Date().toDateString()
              }
              endDate={
                courseData.endDate
                  ? courseData.endDate.toDateString()
                  : new Date().toDateString()
              }
              certificateOffered={courseData.certificateOffered}
            />
            <Separator className="my-8" />
            <CourseReviews reviews={courseData.reviews} />
          </div>
          <div className="lg:col-span-1">
            <CourseTutor
              name={courseData.tutor.name}
              bio={courseData.tutor.bio}
              imageUrl={courseData.tutor.imageUrl}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursePage
