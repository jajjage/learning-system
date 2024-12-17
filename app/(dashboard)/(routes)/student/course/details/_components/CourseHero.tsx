import { StarIcon, Play, Clock, Tag, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CourseHeroProps {
  title: string
  rating: number
  reviewCount: number
  duration: string
  isOpen: boolean
  isFree: boolean
  category: string
  level: string
  imageUrl: string
}

export function CourseHero({
  title,
  rating,
  reviewCount,
  duration,
  isOpen,
  isFree,
  category,
  level,
  imageUrl,
}: CourseHeroProps) {
  return (
    <div className="relative h-[350px] bg-blue-600 rounded-b-3xl overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative z-10 container mx-auto px-4 py-16 text-white">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant={isOpen ? "secondary" : "destructive"}>
            {isOpen ? "Open for Enrollment" : "Closed"}
          </Badge>
          <Badge variant={isFree ? "secondary" : "outline"}>
            {isFree ? "Free" : "Paid"}
          </Badge>
        </div>
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <div className="flex items-center gap-4 mb-6">
          <span className="flex items-center">
            <StarIcon className="h-5 w-5 text-yellow-400 inline mr-1" />
            {rating} ({reviewCount} reviews)
          </span>
          <span className="flex items-center">
            <Clock className="h-5 w-5 mr-1" />
            {duration}
          </span>
          <span className="flex items-center">
            <Tag className="h-5 w-5 mr-1" />
            {category}
          </span>
          <span className="flex items-center">
            <DollarSign className="h-5 w-5 mr-1" />
            {isFree ? "Free" : "Paid"}
          </span>
        </div>
        <p className="mb-6">Level: {level}</p>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            <Play className="w-4 h-4 mr-2" />
            Course Highlight
          </Button>
          <Button className="bg-blue-500 text-white hover:bg-blue-600">
            {isOpen ? "Enroll Now" : "Join Waitlist"}
          </Button>
        </div>
      </div>
    </div>
  )
}
