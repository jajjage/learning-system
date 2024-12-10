"use client"

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
    <div id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#202124] mb-4">
            Key Features
          </h2>
          <p className="mt-4 text-xl text-[#202124]/70 max-w-3xl mx-auto">
            Everything you need to succeed in your learning journey.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#e8f0fe] to-white rounded-2xl transform scale-[0.98] group-hover:scale-100 transition-transform duration-300 -z-10"></div>
              <feature.icon className="h-12 w-12 text-[#1a73e8] mb-6 transform group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold text-[#202124] mb-3">
                {feature.name}
              </h3>
              <p className="text-[#202124]/70 group-hover:text-[#202124] transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
