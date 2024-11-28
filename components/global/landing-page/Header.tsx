import React from "react"
import { GraduationCap } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className="flex justify-between items-center space-x-2"
            >
              <GraduationCap className="h-8 w-8 text-purple-600" />
              <span className="text-xl bg-gradient-to-r from-purple-600 to-blue-500 font-bold bg-clip-text text-transparent">
                LuxePlatform
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:text-purple-600 bg-clip-text text-transparent transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:text-purple-600 bg-clip-text text-transparent transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#faq"
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:text-purple-600 bg-clip-text text-transparent transition-colors"
            >
              FAQ
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/sign-in">
              <button className="font-bold bg-gradient-to-r from-purple-600 to-blue-500 hover:text-purple-500 bg-clip-text text-transparent transition-colors">
                Sign In
              </button>
            </Link>
            <Link href="/sign-up">
              <button className="font-semibold bg-gradient-to-r from-purple-600 to-blue-500  text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md hover:shadow-primary/25">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
