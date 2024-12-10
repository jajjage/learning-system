"use client"

import { Users, BookOpen, Star } from "lucide-react"

const testimonials = [
  {
    content:
      "This platform has transformed how I teach my classes. The tools are intuitive and my students love it!",
    author: "Sarah Johnson",
    role: "High School Teacher",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    content:
      "The interactive courses have made learning fun and engaging. I've improved my grades significantly!",
    author: "Michael Chen",
    role: "Student",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
]

const stats = [
  { icon: Users, label: "Students", value: "10,000+" },
  { icon: BookOpen, label: "Teachers", value: "500+" },
  { icon: Star, label: "Course Rating", value: "4.8/5" },
]

export function Testimonials() {
  return (
    <div
      id="testimonials"
      className="bg-gradient-to-b from-white to-[#e8f0fe] py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#202124] mb-4">
            What Our Users Say
          </h2>
          <p className="mt-4 text-xl text-[#202124]/70 max-w-3xl mx-auto">
            Trusted by educators and students worldwide
          </p>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
              >
                <div className="flex flex-col items-center">
                  <div className="bg-[#e8f0fe] p-4 rounded-full mb-6">
                    <stat.icon className="h-8 w-8 text-[#1a73e8]" />
                  </div>
                  <div className="text-3xl font-bold text-[#202124] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[#202124]/70">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <p className="text-[#202124] text-lg italic mb-6">
                {testimonial.content}
              </p>
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full border-2 border-[#1a73e8]"
                  src={testimonial.image}
                  alt={testimonial.author}
                />
                <div className="ml-4">
                  <div className="text-lg font-semibold text-[#202124]">
                    {testimonial.author}
                  </div>
                  <div className="text-[#202124]/70">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
