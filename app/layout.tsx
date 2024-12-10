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
  const isDashboardRoute = pathname.startsWith("/dashboard") // Check if it's a dashboard route

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {/* Conditionally render Header */}
          {!isDashboardRoute && <Header />}
          <ToastProvider />
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
