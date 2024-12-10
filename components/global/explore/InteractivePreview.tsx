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
    <Card className="mb-12 overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white">
        <CardTitle className="text-2xl">Interactive Preview</CardTitle>
        <CardDescription className="text-white/80">
          Try out some of our key features
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs
          defaultValue={content[0].title.toLowerCase().replace(/\s+/g, "-")}
          className="w-full"
        >
          <TabsList className="w-full mb-6">
            {content.map((item) => (
              <TabsTrigger
                key={item.title}
                value={item.title.toLowerCase().replace(/\s+/g, "-")}
                className="flex-1 py-2 text-sm font-medium transition-all duration-200 hover:text-[#1a73e8]"
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
      <h3 className="text-xl font-semibold text-[#202124]">
        Introduction to React
      </h3>
      <p className="text-[#202124]/80">
        This module covers the basics of React, including components, props, and
        state.
      </p>
      <div className="flex flex-wrap gap-4">
        <Button className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-md hover:shadow-lg transition-all duration-200">
          Watch Video
        </Button>
        <Button
          variant="outline"
          className="border-[#1a73e8] text-[#1a73e8] hover:bg-[#1a73e8] hover:text-white transition-all duration-200"
        >
          Read Lesson
        </Button>
        <Button
          variant="outline"
          className="border-[#1a73e8] text-[#1a73e8] hover:bg-[#1a73e8] hover:text-white transition-all duration-200"
        >
          Take Quiz
        </Button>
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
      <h3 className="text-xl font-semibold text-[#202124]">Your Progress</h3>
      <Progress
        value={progress}
        className="w-full h-2 bg-[#f1f3f4]"
        // indicatorClassName="bg-gradient-to-r from-[#1a73e8] to-[#4285f4]"
      />
      <p className="text-[#202124]/80">Current progress: {progress}%</p>
      <Button
        onClick={() => setProgress(Math.min(100, progress + 10))}
        className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-md hover:shadow-lg transition-all duration-200"
      >
        Complete Lesson
      </Button>
    </div>
  )
}

function ContentCreationPreview() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-[#202124]">
        Create a New Lesson
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <Button className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-md hover:shadow-lg transition-all duration-200">
          Add Video
        </Button>
        <Button className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-md hover:shadow-lg transition-all duration-200">
          Add Quiz
        </Button>
        <Button className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-md hover:shadow-lg transition-all duration-200">
          Add Reading Material
        </Button>
        <Button className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-md hover:shadow-lg transition-all duration-200">
          Add Assignment
        </Button>
      </div>
    </div>
  )
}

function StudentAnalyticsPreview() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-[#202124]">
        Student Engagement Overview
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white">
            <CardTitle className="text-lg">Course Completion Rate</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <Progress
              value={75}
              className="w-full h-2 bg-[#f1f3f4]"
              // className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4]"
            />
            <p className="text-center mt-2 text-[#202124]">75%</p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white">
            <CardTitle className="text-lg">Average Quiz Score</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-4xl font-bold text-center text-[#1a73e8]">
              85%
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
