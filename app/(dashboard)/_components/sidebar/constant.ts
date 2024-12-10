import {
  LayoutDashboard,
  Compass,
  Search,
  BookOpen,
  BarChart2,
} from "lucide-react"

export const guestRoutes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
  {
    icon: Search,
    label: "Search",
    href: "/item",
  },
]

export const teacherRoutes = [
  {
    icon: BookOpen,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart2,
    label: "Analytics",
    href: "/teacher/analytics",
  },
  {
    icon: Search,
    label: "Search",
    href: "/item",
  },
]
