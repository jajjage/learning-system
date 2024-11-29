import { Courses } from "@/icons"
import { BarChart2, Compass, Layout, List } from "lucide-react"

export const guestRoute = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
  {
    icon: Layout,
    label: "Search",
    href: "/item",
  },
]

export const teacherRoute = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart2,
    label: "Analytics",
    href: "/teacher/analytics",
  },
  {
    icon: Layout,
    label: "Search",
    href: "/item",
  },
]
