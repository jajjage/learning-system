"use client"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

type InteractivePreviewProps = {
  role: "student" | "teacher"
}

export default function InteractivePreview({ role }: InteractivePreviewProps) {
  const [progress, setProgress] = useState(0)

  const previewContent = {
    student: [
      { title: "Course Module", content: <CourseModulePreview /> },
      {
        title: "Progress Tracking",
        content: (
          <ProgressTrackingPreview
            progress={progress}
            setProgress={setProgress}
          />
        ),
      },
    ],
    teacher: [
      { title: "Content Creation", content: <ContentCreationPreview /> },
      { title: "Student Analytics", content: <StudentAnalyticsPreview /> },
    ],
  }

  const content = previewContent[role]

  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>Interactive Preview</CardTitle>
        <CardDescription>Try out some of our key features</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue={content[0].title.toLowerCase().replace(/\s+/g, "-")}
        >
          <TabsList>
            {content.map((item) => (
              <TabsTrigger
                key={item.title}
                value={item.title.toLowerCase().replace(/\s+/g, "-")}
              >
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {content.map((item) => (
            <TabsContent
              key={item.title}
              value={item.title.toLowerCase().replace(/\s+/g, "-")}
            >
              {item.content}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

function CourseModulePreview() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Introduction to React</h3>
      <p>
        This module covers the basics of React, including components, props, and
        state.
      </p>
      <div className="space-x-4">
        <Button className="font-semibold bg-gradient-to-r from-purple-600 to-blue-500  text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md hover:shadow-primary/25">
          Watch Video
        </Button>
        <Button variant="outline">Read Lesson</Button>
        <Button variant="outline">Take Quiz</Button>
      </div>
    </div>
  )
}

function ProgressTrackingPreview({
  progress,
  setProgress,
}: {
  progress: number
  setProgress: (value: number) => void
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Your Progress</h3>
      <Progress value={progress} className="w-full" />
      <p>Current progress: {progress}%</p>
      <Button onClick={() => setProgress(Math.min(100, progress + 10))}>
        Complete Lesson
      </Button>
    </div>
  )
}

function ContentCreationPreview() {
  const btStyle =
    "font-semibold bg-gradient-to-r from-purple-600 to-blue-500  text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md hover:shadow-primary/25"
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Create a New Lesson</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button className={btStyle}>Add Video</Button>
        <Button className={btStyle}>Add Quiz</Button>
        <Button className={btStyle}>Add Reading Material</Button>
        <Button className={btStyle}>Add Assignment</Button>
      </div>
    </div>
  )
}

function StudentAnalyticsPreview() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Student Engagement Overview</h3>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Course Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={75} className="w-full" />
            <p className="text-center mt-2">75%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Quiz Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center">85%</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
