"use client"

import React, { useState } from "react"
import { StarIcon, Play, Clock, Tag, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { CoursePreviewModal } from "./CoursePreviewModal"
import { CourseEnroll } from "@/types/course"

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
  courseId: string
  isEnrolled: boolean
  price?: number
  enrollmentLimit?: number
  currentEnrollments?: number
  description?: string
  children: React.ReactNode
  coursePreview: CourseEnroll
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
  isEnrolled,
  children,
  coursePreview,
}: CourseHeroProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

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
            onClick={() => setShowPreview(true)}
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            <Play className="w-4 h-4 mr-2" />
            Course Highlight
          </Button>
          {/* Course Preview */}
          <CoursePreviewModal
            isOpen={showPreview}
            onClose={() => setShowPreview(false)}
            course={coursePreview}
            isPurchased={false} // set to true if user has purchased
            isFree={isFree}
          />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-blue-500 text-white hover:bg-blue-600"
                disabled={isEnrolled}
              >
                {isEnrolled
                  ? "Already Enrolled"
                  : isOpen
                    ? "Enroll Now"
                    : "Join Waitlist"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogTitle>enroll</DialogTitle>
              {children}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
