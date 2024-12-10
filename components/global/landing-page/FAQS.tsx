"use client"

import React, { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How do I get started as a student?",
    answer:
      "Simply click the 'Start Learning' button and create your account. You'll have immediate access to our course catalog and can begin learning right away.",
  },
  {
    question: "What tools are available for teachers?",
    answer:
      "Teachers get access to course creation tools, student progress tracking, interactive assignments, and detailed analytics to monitor class performance.",
  },
  {
    question: "Are the courses self-paced?",
    answer:
      "Yes, most courses are self-paced, allowing you to learn at your own speed and revisit materials as needed.",
  },
  {
    question: "How do certifications work?",
    answer:
      "Upon completing a course, you'll receive a verified digital certificate that you can share on your resume or social media profiles.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div id="faq" className="bg-white py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-[#202124] mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#f8f9fa] rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-[#202124]">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-[#1a73e8]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#1a73e8]" />
                )}
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-48 py-4" : "max-h-0"
                }`}
              >
                <p className="text-[#202124]/80">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
