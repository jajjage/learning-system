"use client"

import { useState } from "react"
import {
  RoleSelection,
  GuidedTour,
  InteractivePreview,
  SampleContent,
  ProgressTracking,
  Gamification,
  CommunityInteraction,
  CourseCreation,
  PersonalizedDashboard,
  StudentAnalytics,
  ContentLibrary,
  SharedFeatures,
  KeyFeatures,
  CTASection,
} from "@/components/global/explore"

type UserRole = "student" | "teacher" | null

export default function ExplorePage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
        Explore Our Learning Platform
      </h1>

      <RoleSelection
        selectedRole={selectedRole}
        onSelectRole={setSelectedRole}
      />

      {selectedRole && (
        <>
          <GuidedTour role={selectedRole} />
          <InteractivePreview role={selectedRole} />
          <SampleContent role={selectedRole} />
          {selectedRole === "student" && (
            <>
              <ProgressTracking />
              <Gamification />
              <CommunityInteraction />
              <PersonalizedDashboard />
            </>
          )}
          {selectedRole === "teacher" && (
            <>
              <CourseCreation />
              <StudentAnalytics />
              <ContentLibrary />
            </>
          )}
          <SharedFeatures />
          <KeyFeatures role={selectedRole} />
          <CTASection role={selectedRole} />
        </>
      )}
    </div>
  )
}
