"use client"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "react-hot-toast"
import { Header } from "@/components/global/landing-page/Header"

import ToastProvider from "@/components/providers/toaster"
import { ReactQueryProvider } from "@/react-query/provider"
import { usePathname } from "next/navigation"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname() // Get the current route
  const isStudentRoute = pathname.includes("/student") // Check if it's a dashboard route
  const isTeacherRoute = pathname.includes("/teacher")
  const isCourseRoute = pathname.includes("/course")

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ToastProvider />
          {/* Conditionally render Header */}
          {!isStudentRoute && !isTeacherRoute && !isCourseRoute && <Header />}
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
