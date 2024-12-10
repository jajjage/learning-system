"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import Link from "next/link"

const NavbarRoutes = () => {
  const pathname = usePathname()

  const isTeacherPage = pathname?.startsWith("/teacher")
  const isPlayerPage = pathname?.includes("/chapter")

  return (
    <div className="flex items-center gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <Link href="/dashboard">
          <Button
            variant="ghost"
            className="text-[#1a73e8] hover:bg-[#e8f0fe] hover:text-[#1a73e8]"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button className="bg-[#1a73e8] text-white hover:bg-[#4285f4] transition-colors">
            Teacher mode
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}

export default NavbarRoutes
