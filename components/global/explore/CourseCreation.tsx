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
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>Course Creation Tools</CardTitle>
        <CardDescription>
          Experience our intuitive course creation process
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="courseTitle">Course Title</Label>
            <Input
              id="courseTitle"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="e.g., Introduction to Python"
            />
          </div>
          <div>
            <Label htmlFor="courseDescription">Course Description</Label>
            <Textarea
              id="courseDescription"
              value={courseDescription}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setCourseDescription(e.target.value)
              }
              placeholder="Briefly describe your course"
            />
          </div>
          <div>
            <Label>Add Content</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button type="button" variant="outline">
                Add Video
              </Button>
              <Button type="button" variant="outline">
                Add Quiz
              </Button>
              <Button type="button" variant="outline">
                Add Assignment
              </Button>
              <Button type="button" variant="outline">
                Add Resources
              </Button>
            </div>
          </div>
          <Button type="submit">Create Sample Course</Button>
        </form>
      </CardContent>
    </Card>
  )
}
