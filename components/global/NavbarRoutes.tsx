"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import Link from "next/link"

const NavbarRoutes = () => {
  const pathname = usePathname()
  const router = useRouter()

  const isTeacherPage = pathname?.startsWith("/teacher")
  const isPlayerPage = pathname?.includes("/chapter")

  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <Link href="/dashboard">
          <Button className="font-semibold bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md hover:shadow-primary/25">
            <LogIn className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button className="font-semibold bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md hover:shadow-primary/25">
            Teacher mode
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}

export default NavbarRoutes
