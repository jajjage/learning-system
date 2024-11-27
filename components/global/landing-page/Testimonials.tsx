import React from "react"
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
    <div id="testimonials" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary">
            What Our Users Say
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Trusted by educators and students worldwide
          </p>

          {/* Stats Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-secondary rounded-xl p-6 transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex flex-col items-center">
                  <stat.icon className="h-8 w-8 text-primary mb-3" />
                  <div className="text-2xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-primary/80">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-secondary/30 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow hover:shadow-primary/10"
            >
              <p className="text-gray-600 italic mb-6">{testimonial.content}</p>
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full"
                  src={testimonial.image}
                  alt={testimonial.author}
                />
                <div className="ml-4">
                  <div className="text-sm font-medium text-primary">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
