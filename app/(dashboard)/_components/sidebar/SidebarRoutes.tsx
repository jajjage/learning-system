"use client"

import { guestRoute } from "./constant"
import SidebarItem from "./SidebarItem"

const SidebarRoutes = () => {
  const routes = guestRoute
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
