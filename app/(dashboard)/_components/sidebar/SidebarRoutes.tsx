"use client"

import { usePathname } from "next/navigation"
import { guestRoute, teacherRoute } from "./constant"
import SidebarItem from "./SidebarItem"

const SidebarRoutes = () => {
  const pathname = usePathname()

  const teacher = pathname.includes("/teacher")

  const routes = teacher ? teacherRoute : guestRoute

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.label}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}

export default SidebarRoutes
