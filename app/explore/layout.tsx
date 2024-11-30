"use client"

import { Header } from "@/components/global/landing-page/Header"
import { usePathname } from "next/navigation"

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onPage={pathname} />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </div>
      </main>
    </div>
  )
}
