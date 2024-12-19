// This is the course page that the student sees when they click on a course from the course list
"use client"
import { VideoPlayer } from "./VideoPlayer"
import { Curriculum } from "./Curriculum"
import React, { useState } from "react"
import { CourseHeader } from "./CourseHeader"
import { CourseEnroll } from "@/types/course"
import { Chapter } from "@prisma/client"

const courseData = {
  title: "Course: Meditation for Relaxation",
  sections: [
    {
      title: "Introduction",
      items: [
        {
          title: "Tutor Introduction",
          duration: "2:30",
          isCompleted: true,
        },
        {
          title: "Your Space",
          duration: "3:45",
        },
        {
          title: "Meditation Schedule",
          duration: "4:00",
        },
      ],
    },
    {
      title: "Meditation",
      items: [
        {
          title: "Practical Exercise",
          duration: "10:00",
        },
        {
          title: "Meditation Series",
          duration: "15:00",
        },
        {
          title: "Creating your Om",
          duration: "5:30",
        },
        {
          title: "Listening to your Inner Spirit",
          duration: "8:00",
        },
        {
          title: "Finding your Calm",
          duration: "12:00",
        },
      ],
    },
    {
      title: "Meditation: The Theory",
      items: [
        {
          title: "Practical Exercise",
          duration: "10:00",
        },
        {
          title: "Meditation Series",
          duration: "15:00",
        },
        {
          title: "Creating your Om",
          duration: "5:30",
        },
        {
          title: "Listening to your Inner Spirit",
          duration: "8:00",
        },
        {
          title: "Meditation Series",
          duration: "15:00",
        },
      ],
    },
  ],
}

interface CourseProps {
  course: CourseEnroll | null
  userId: string
}

export default function Course({ course, userId }: CourseProps) {
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false)
  const [currentChapter, setCurrentChapter] = useState(
    course?.chapters?.[0] ?? null,
  )

  const handleChapterSelect = (chapter: any) => {
    const fullChapter = course?.chapters.find((c) => c.id === chapter.id)
    if (fullChapter) {
      setCurrentChapter(fullChapter)
      setIsCurriculumOpen(false) // Close curriculum on mobile after selection
    }
  }
  console.log(course?.id)
  return (
    <>
      <CourseHeader
        // user data and the course title from the database
        title={course?.title || ""}
        onToggleCurriculum={() => setIsCurriculumOpen(!isCurriculumOpen)}
      />
      <div className="relative flex flex-1 overflow-hidden">
        {/* chapter video  */}
        <div className="flex-1 overflow-auto">
          {currentChapter && (
            <VideoPlayer
              chapter={{
                ...currentChapter,
                userProgress: currentChapter.userProgress[0] || null,
              }}
            />
          )}
        </div>
        <Curriculum
          // chapters from the database
          chapters={
            course?.chapters.map((chapter) => ({
              ...chapter,
              userProgress: chapter.userProgress[0],
            })) || []
          }
          isOpen={isCurriculumOpen}
          onClose={() => setIsCurriculumOpen(false)}
          onChapterSelect={handleChapterSelect}
          currentChapterId={currentChapter?.id ?? ""}
        />
      </div>
    </>
  )
}
