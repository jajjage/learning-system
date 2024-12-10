"use client"

import { usePathname } from "next/navigation"
import { guestRoutes, teacherRoutes } from "./constant"
import SidebarItem from "./SidebarItem"

const SidebarRoutes = () => {
  const pathname = usePathname()

  const isTeacher = pathname.includes("/teacher")

  const routes = isTeacher ? teacherRoutes : guestRoutes

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}

export default SidebarRoutes
