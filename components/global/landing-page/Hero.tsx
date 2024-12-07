import React from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <div className="relative h-[500px] sm:h-[500px] md:h-[600px] pt-32 pb-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
          alt="Students learning"
          className="w-full h-screen object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-400 mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent sm:text-5xl md:text-6xl">
            <span className="block mb-2 ">Transform Your Learning</span>
            <span className="block ">Journey Today</span>
          </h1>
          <p className="mt-3 font-semibold max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Join our interactive platform where students and teachers come
            together to create an engaging learning experience. Start your
            educational journey with us.
          </p>
          <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-8 gap-4">
            <Link href="/explore">
              <button className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-full text-white hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                Explore Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
            <button className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-full text-white hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
              Watch Demo
            </button>
          </div>
          {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-1 h-12 rounded-full bg-white/20 relative">
              <div className="w-1 h-4 bg-white rounded-full absolute top-0 animate-scroll" />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
