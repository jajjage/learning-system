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
    <div id="faq" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="grid gap-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-medium text-gray-900">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-48 py-4" : "max-h-0"
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
