import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, PlayCircle, FileText } from "lucide-react"

type SampleContentProps = {
  role: "student" | "teacher"
}

export default function SampleContent({ role }: SampleContentProps) {
  const content =
    role === "student" ? <StudentSampleContent /> : <TeacherSampleContent />

  return (
    <Card className="mb-12 overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white">
        <CardTitle className="text-2xl">Sample Content</CardTitle>
        <CardDescription className="text-white/80">
          {role === "student"
            ? "Experience our free lessons and resources"
            : "Learn how to create engaging course content"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">{content}</CardContent>
    </Card>
  )
}

function StudentSampleContent() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 p-3 bg-[#f1f3f4] rounded-lg transition-all duration-200 hover:shadow-md">
        <PlayCircle className="h-5 w-5 text-[#1a73e8]" />
        <span className="text-[#202124] flex-grow">
          Introduction to Web Development
        </span>
        <Button
          variant="link"
          className="text-[#1a73e8] hover:text-[#4285f4] transition-colors duration-200"
        >
          Watch Now
        </Button>
      </div>
      <div className="flex items-center space-x-2 p-3 bg-[#f1f3f4] rounded-lg transition-all duration-200 hover:shadow-md">
        <FileText className="h-5 w-5 text-[#1a73e8]" />
        <span className="text-[#202124] flex-grow">
          JavaScript Basics: Variables and Functions
        </span>
        <Button
          variant="link"
          className="text-[#1a73e8] hover:text-[#4285f4] transition-colors duration-200"
        >
          Read Lesson
        </Button>
      </div>
      <div className="flex items-center space-x-2 p-3 bg-[#f1f3f4] rounded-lg transition-all duration-200 hover:shadow-md">
        <CheckCircle className="h-5 w-5 text-[#1a73e8]" />
        <span className="text-[#202124] flex-grow">HTML & CSS Quiz</span>
        <Button
          variant="link"
          className="text-[#1a73e8] hover:text-[#4285f4] transition-colors duration-200"
        >
          Take Quiz
        </Button>
      </div>
    </div>
  )
}

function TeacherSampleContent() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-[#202124]">
        Creating Your First Course
      </h3>
      <ol className="list-decimal list-inside space-y-2 text-[#202124]/70">
        <li>Define your course objectives</li>
        <li>Outline your course structure</li>
        <li>Create engaging video content</li>
        <li>Develop interactive quizzes and assignments</li>
        <li>Set up student progress tracking</li>
      </ol>
      <Button className="w-full bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-md hover:shadow-lg transition-all duration-200">
        View Full Guide
      </Button>
    </div>
  )
}
