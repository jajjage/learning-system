"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Dummy data for a single course
const dummyCourse = {
  id: "1",
  title: "Introduction to React",
  description:
    "Learn the basics of React, including components, state, and props.",
  category: "Programming",
  difficulty: "Beginner",
  price: 49.99,
  status: "Published",
}

export default function UpdateCoursePage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const [course, setCourse] = useState(dummyCourse)

  useEffect(() => {
    // In a real application, you would fetch the course data here
    // For now, we're using the dummy data
    setCourse(dummyCourse)
  }, [params.id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setCourse((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setCourse((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated course data to your backend
    console.log("Updated course:", course)
    router.push("/courses")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Update Course: {course.title}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={course.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={course.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            value={course.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select
            name="difficulty"
            value={course.difficulty}
            onValueChange={(value) => handleSelectChange("difficulty", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={course.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            name="status"
            value={course.status}
            onValueChange={(value) => handleSelectChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white"
        >
          Update Course
        </Button>
      </form>
    </div>
  )
}
