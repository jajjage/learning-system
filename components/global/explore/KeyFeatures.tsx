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
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>
          Key Features for {role === "student" ? "Students" : "Teachers"}
        </CardTitle>
        <CardDescription>
          Discover what makes our platform unique
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <span>{feature}</span>
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
