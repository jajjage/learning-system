import { StarIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Review {
  title: string
  rating: number
  text: string
}

interface CourseReviewsProps {
  reviews: Review[]
}

export function CourseReviews({ reviews }: CourseReviewsProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Course Ratings & Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review, index) => (
          <Card key={index} className="p-4">
            <div className="flex mb-2">
              {/* i would implement the real rating from the database */}
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
            </div>
            <h3 className="font-semibold mb-2">{review.title}</h3>
            <p className="text-sm text-gray-600">{review.text}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
