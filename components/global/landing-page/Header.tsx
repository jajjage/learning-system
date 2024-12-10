"use client"

import { GraduationCap } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

interface HeaderProps {
  onPage?: string
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isExplorePage = pathname === "/explore"

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-sm" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-[#1a73e8]" />
              <span
                className={`text-xl font-bold ${isScrolled ? "text-[#202124]" : "text-white"}`}
              >
                LuxePlatform
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            {["Features", "Testimonials", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`${isScrolled ? "text-[#202124]" : "text-white"} hover:text-[#1a73e8] transition-colors`}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            {isExplorePage ? (
              <>
                <Link href="/sign-up?role=STUDENT">
                  <button
                    className={`font-semibold ${isScrolled ? "bg-[#1a73e8] text-white" : "bg-white text-[#1a73e8]"} px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    Student
                  </button>
                </Link>
                <Link href="/sign-up?role=TEACHER">
                  <button
                    className={`font-semibold ${isScrolled ? "bg-white text-[#1a73e8]" : "bg-[#1a73e8] text-white"} px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    Teacher
                  </button>
                </Link>
              </>
            ) : (
              <Link href="/explore">
                <button
                  className={`font-semibold ${isScrolled ? "bg-[#1a73e8] text-white" : "bg-white text-[#1a73e8]"} px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                >
                  Get Started
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
