import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

type KeyFeaturesProps = {
  role: "student" | "teacher"
}

export default function KeyFeatures({ role }: KeyFeaturesProps) {
  const features = role === "student" ? studentFeatures : teacherFeatures

  return (
    <Card className="mb-12 overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white">
        <CardTitle className="text-2xl">
          Key Features for {role === "student" ? "Students" : "Teachers"}
        </CardTitle>
        <CardDescription className="text-white/80">
          Discover what makes our platform unique
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start space-x-2 p-3 bg-[#f1f3f4] rounded-lg transition-all duration-200 hover:shadow-md"
            >
              <CheckCircle className="h-5 w-5 text-[#1a73e8] mt-0.5 flex-shrink-0" />
              <span className="text-[#202124]">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

const studentFeatures = [
  "Personalized learning paths",
  "Interactive video lessons",
  "Real-time progress tracking",
  "Collaborative study groups",
  "Mobile-friendly platform",
  "Instant feedback on quizzes",
  "Certificates of completion",
  "24/7 access to course materials",
]

const teacherFeatures = [
  "Intuitive course creation tools",
  "Automated grading system",
  "Detailed student analytics",
  "Live virtual classroom",
  "Customizable course templates",
  "Integrated discussion forums",
  "Revenue sharing for course sales",
  "Professional development resources",
]
