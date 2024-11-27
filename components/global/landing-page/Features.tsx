"use client"
import React from "react"
import { BookOpen, BarChart, Users, Award } from "lucide-react"

const features = [
  {
    name: "Interactive Courses",
    description:
      "Engage with dynamic content and learn at your own pace with our interactive course platform.",
    icon: BookOpen,
  },
  {
    name: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed analytics and progress indicators.",
    icon: BarChart,
  },
  {
    name: "Collaborative Learning",
    description:
      "Connect with peers and educators in a supportive learning environment.",
    icon: Users,
  },
  {
    name: "Certifications",
    description:
      "Earn recognized certificates upon completing courses and achieving milestones.",
    icon: Award,
  },
]

export function Features() {
  return (
    <div id="features" className="py-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary">Key Features</h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to succeed in your learning journey.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow hover:shadow-primary/10"
            >
              <div>
                <feature.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
