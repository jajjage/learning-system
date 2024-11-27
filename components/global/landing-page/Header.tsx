import React from "react"
import { GraduationCap } from "lucide-react"

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">EduPlatform</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#faq"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              FAQ
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-primary transition-colors">
              Sign In
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md hover:shadow-primary/25">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
