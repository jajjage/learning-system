"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  ChevronDown,
  GalleryVerticalEnd,
  Home,
  LayoutDashboard,
  Settings,
  Users,
  BookOpen,
  GraduationCap,
  ClipboardList,
  Calendar,
} from "lucide-react"
import { Role } from "@prisma/client"

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Skeleton } from "@/components/ui/skeleton"
import { useUser } from "@clerk/nextjs"

interface MainSidebarProps {
  userDB:
    | {
        role: Role
        firstName: string
        lastName: string
        email: string
      }
    | undefined
}

export function MainSidebar({ userDB }: MainSidebarProps) {
  const pathname = usePathname()
  const { user } = useUser()

  const menuItems = {
    [Role.STUDENT]: [
      { icon: Home, label: "Home", href: "/dashboard" },
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
      { icon: BookOpen, label: "Courses", href: "/dashboard/courses" },
      { icon: Calendar, label: "Schedule", href: "/dashboard/schedule" },
      {
        icon: ClipboardList,
        label: "Assignments",
        href: "/dashboard/assignments",
      },
    ],
    [Role.TEACHER]: [
      { icon: Home, label: "Home", href: "/teacher" },
      { icon: LayoutDashboard, label: "Dashboard", href: "/teacher" },
      { icon: Users, label: "Students", href: "/teacher/students" },
      { icon: BookOpen, label: "Courses", href: "/teacher/courses" },
      {
        icon: ClipboardList,
        label: "Assignments",
        href: "/teacher/assignments",
      },
    ],
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">EduPortal</span>
                  <span className="text-xs text-muted-foreground capitalize">
                    {userDB?.role.toLowerCase()}
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="p-4">
          <Input type="search" placeholder="Search..." className="h-9" />
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        {user ? (
          <SidebarMenu>
            {userDB &&
              menuItems[userDB.role]?.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start",
                        pathname === item.href && "bg-muted font-medium",
                      )}
                      asChild
                    >
                      <Link href={item.href}>
                        <item.icon className="mr-2 size-4" />
                        {item.label}
                      </Link>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        ) : (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        )}
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-start p-0">
              {user ? (
                <Avatar>
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback>{user?.firstName?.[0]}</AvatarFallback>
                </Avatar>
              ) : (
                <Skeleton className="h-10 w-10 rounded-full" />
              )}
              <span className="ml-2 flex-1 text-left">
                {userDB ? (
                  <>
                    <span className="block text-sm font-medium">
                      {userDB.firstName}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {userDB.lastName}
                    </span>
                  </>
                ) : (
                  <>
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="mt-1 h-4 w-24" />
                  </>
                )}
              </span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <Button variant="outline" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </CollapsibleContent>
        </Collapsible>
      </SidebarFooter>
    </Sidebar>
  )
}
