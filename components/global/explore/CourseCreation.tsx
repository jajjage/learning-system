"use client"

import { SetStateAction, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function CourseCreation() {
  const [courseTitle, setCourseTitle] = useState("")
  const [courseDescription, setCourseDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Course "${courseTitle}" created successfully!`)
  }

  return (
    <Card className="mb-12 overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white">
        <CardTitle className="text-2xl">Course Creation Tools</CardTitle>
        <CardDescription className="text-white/80">
          Experience our intuitive course creation process
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="courseTitle" className="text-[#202124]">
              Course Title
            </Label>
            <Input
              id="courseTitle"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="e.g., Introduction to Python"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="courseDescription" className="text-[#202124]">
              Course Description
            </Label>
            <Textarea
              id="courseDescription"
              value={courseDescription}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setCourseDescription(e.target.value)
              }
              placeholder="Briefly describe your course"
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-[#202124]">Add Content</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <Button
                type="button"
                className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                Add Video
              </Button>
              <Button
                type="button"
                className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                Add Quiz
              </Button>
              <Button
                type="button"
                className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                Add Assignment
              </Button>
              <Button
                type="button"
                className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                Add Resources
              </Button>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-md hover:shadow-lg transition-all duration-200"
          >
            Create Sample Course
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
