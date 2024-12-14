import { StarIcon, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CourseHeroProps {
  title: string
  rating: number
  reviewCount: number
  duration: string
}

export function CourseHero({
  title,
  rating,
  reviewCount,
  duration,
}: CourseHeroProps) {
  return (
    <div className="relative h-[250px] bg-blue-600 rounded-sm overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative z-10 container mx-auto px-4 py-16 text-white">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <div className="flex items-center gap-4 mb-6">
          <span className="flex items-center">
            <StarIcon className="h-5 w-5 text-yellow-400 inline" />
            {rating} ({reviewCount} reviews)
          </span>
          <span>{duration}</span>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            <Play className="w-4 h-4 mr-2" />
            Course Highlight
          </Button>
          <Button className="bg-blue-500 text-white hover:bg-blue-600">
            Begin Course
          </Button>
        </div>
      </div>
    </div>
  )
}
