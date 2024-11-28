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
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>Sample Content</CardTitle>
        <CardDescription>
          {role === "student"
            ? "Experience our free lessons and resources"
            : "Learn how to create engaging course content"}
        </CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  )
}

function StudentSampleContent() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <PlayCircle className="h-5 w-5 text-blue-500" />
        <span>Introduction to Web Development</span>
        <Button
          variant="link"
          className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
        >
          Watch Now
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <FileText className="h-5 w-5 text-green-500" />
        <span>JavaScript Basics: Variables and Functions</span>
        <Button
          variant="link"
          className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
        >
          Read Lesson
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <CheckCircle className="h-5 w-5 text-purple-500" />
        <span>HTML & CSS Quiz</span>
        <Button
          variant="link"
          className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
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
      <h3 className="text-lg font-semibold">Creating Your First Course</h3>
      <ol className="list-decimal list-inside space-y-2">
        <li>Define your course objectives</li>
        <li>Outline your course structure</li>
        <li>Create engaging video content</li>
        <li>Develop interactive quizzes and assignments</li>
        <li>Set up student progress tracking</li>
      </ol>
      <Button className="font-semibold bg-gradient-to-r from-purple-600 to-blue-500  text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md hover:shadow-primary/25">
        View Full Guide
      </Button>
    </div>
  )
}
