"use client"

import { usePathname } from "next/navigation"
import { UserButton, useUser } from "@clerk/nextjs"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { Role } from "@prisma/client"

interface MainNavProps {
  userDB:
    | {
        role: Role
        firstName: string
        email: string
        lastName: string
      }
    | undefined
}
export function MainNav({ userDB }: MainNavProps) {
  const pathname = usePathname()
  const { open } = useSidebar()
  const { isLoaded, user } = useUser()
  const role = pathname.startsWith("/teacher") ? "teacher" : "student"

  return (
    <header className="sticky top-0 z-10 flex h-14 w-full items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="font-semibold">EduPortal</div>
      </div>
      {!open && (
        <Button variant="ghost" className="hidden sm:flex items-center gap-2">
          {isLoaded ? (
            <>
              <Avatar className="h-6 w-6">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">
                {user?.fullName || "User"}
              </span>
            </>
          ) : (
            <>
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-5 w-20" />
            </>
          )}
        </Button>
      )}
    </header>
  )
}
