import React from "react"
import { Footer } from "@/components/global/landing-page/Footer"
import { Header } from "@/components/global/landing-page/Header"

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header /> {/* Navbar */}
      <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100">
        {children} {/* Your sign-up form */}
      </main>
      <Footer /> {/* Footer */}
    </div>
  )
}
