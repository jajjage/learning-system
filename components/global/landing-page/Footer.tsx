"use client"

import React from "react"
import { GraduationCap, Facebook, Twitter, Instagram } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-[#1a73e8]" />
                <span className="text-xl font-bold text-[#202124]">
                  LuxePlatform
                </span>
              </Link>
            </div>
            <p className="mt-4 text-[#202124]/70">
              Empowering education through technology and innovation.
            </p>
          </div>
          <div>
            <h3 className="text-[#202124] font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-[#202124]/70 hover:text-[#1a73e8] transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#202124]/70 hover:text-[#1a73e8] transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#202124]/70 hover:text-[#1a73e8] transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#202124] font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-[#202124]/70 hover:text-[#1a73e8] transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#202124]/70 hover:text-[#1a73e8] transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#202124]/70 hover:text-[#1a73e8] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#202124] font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-[#202124]/70 hover:text-[#1a73e8] transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-[#202124]/70 hover:text-[#1a73e8] transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-[#202124]/70 hover:text-[#1a73e8] transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[#e8f0fe]">
          <p className="text-[#202124]/70 text-sm text-center">
            © 2024 LuxePlatform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
