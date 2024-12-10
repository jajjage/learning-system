"use client"

import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"

export function MainNav() {
  const pathname = usePathname()
  const { open } = useSidebar()
  const role = pathname.startsWith("/teacher") ? "teacher" : "student"

  return (
    <header className="sticky top-0 z-10 flex h-14 w-full items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="font-semibold">EduPortal</div>
      </div>
      {!open && (
        <Button variant="ghost" className="hidden sm:flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={
                role === "student"
                  ? "https://github.com/shadcn.png"
                  : "https://github.com/vercel.png"
              }
            />
            <AvatarFallback>{role === "student" ? "JD" : "TS"}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">
            {role === "student" ? "John Doe" : "Teacher Smith"}
          </span>
        </Button>
      )}
    </header>
  )
}
