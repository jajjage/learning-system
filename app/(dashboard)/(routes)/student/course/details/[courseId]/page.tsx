import { Separator } from "@/components/ui/separator"
import { BackButton } from "../_components/BackButton"
import { CourseHero } from "../_components/CourseHero"
import { CourseOverview } from "../_components/CourseOverview"
import { CourseReviews } from "../_components/CourseReviews"
import { CourseTutor } from "../_components/CourseTutor"

export default function CoursePage() {
  const courseData = {
    title: "Meditation for Relaxation",
    rating: 4.8,
    reviewCount: 136,
    duration: "12hr Course",
    description: `Meditation is a mind and body practice that has a long history of use for
      increasing calmness and physical relaxation, improving psychological balance,
      coping with illness, and enhancing overall health and well-being.

      Mind and body practices focus on the interactions among the brain, mind, body,
      and behavior. On this course James will give you a full introduction on
      meditation and how it can be used to keep your calm and go about your
      everyday life in the best way possible.`,
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
      name: "James Onken",
      bio: `I practice in the Theravada Buddhist tradition, that has its roots in the earliest
        teachings of The Buddha.

        I trained in the Thai Forest Tradition, in the Western monastic lineage of the
        teacher Ajahn Chah.`,
      imageUrl: "/placeholder.svg?height=80&width=80",
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
      />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CourseOverview description={courseData.description} />
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
