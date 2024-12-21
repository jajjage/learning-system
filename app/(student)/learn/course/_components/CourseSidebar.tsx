"use client"

import {
  BookOpen,
  Grid,
  Home,
  MessageCircle,
  Play,
  Settings,
} from "lucide-react"
import { usePathname } from "next/navigation"

const navigation = [
  { icon: Home, href: "/" },
  { icon: BookOpen, href: "/student/courses" },
  { icon: Play, href: "/watch" },
  { icon: MessageCircle, href: "/community" },
  { icon: Settings, href: "/settings" },
]

export function CourseSidebar() {
  const pathname = usePathname()

  return (
    <aside className="bg-gradient-to-b from-blue-500 to-blue-400 text-white">
      <div className="flex h-full flex-col items-center py-4">
        <div className="mb-8">
          <Grid className="h-8 w-8" />
        </div>
        <nav className="flex flex-1 flex-col gap-4">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-white/10 ${
                pathname === item.href ? "bg-white/20" : ""
              }`}
            >
              <item.icon className="h-5 w-5" />
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
