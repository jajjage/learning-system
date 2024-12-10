"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a73e8] to-[#4285f4]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
          alt="Students learning"
          className="w-full h-full object-cover object-center opacity-10"
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-center mb-6 text-white sm:text-6xl md:text-7xl">
            <span className="block mb-2">Transform Your Learning</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#fbbc04] to-[#ea4335]">
              Journey Today
            </span>
          </h1>
          <p className="mt-3 font-semibold max-w-md mx-auto text-xl text-white/90 sm:text-2xl md:mt-5 md:max-w-3xl">
            Join our interactive platform where students and teachers come
            together to create an engaging learning experience.
          </p>
          <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12 gap-6">
            <Link href="/explore">
              <button className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-[#1a73e8] bg-white hover:bg-[#e8f0fe] transition-all duration-300 transform hover:scale-105 shadow-lg">
                Explore Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
            <button className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-full text-white hover:bg-white hover:text-[#1a73e8] transition-all duration-300 transform hover:scale-105">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  )
}
