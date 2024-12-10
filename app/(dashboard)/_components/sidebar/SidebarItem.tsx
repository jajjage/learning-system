import { cn } from "@/lib/utils"
import { type LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  href: string
}

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname()

  const isActive =
    (pathname === "/dashboard" && href === "/dashboard") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-x-2 text-[#202124] text-sm font-medium pl-6 py-4 hover:bg-[#f1f3f4] transition-colors",
        isActive && "bg-[#e8f0fe] text-[#1a73e8]",
      )}
    >
      <Icon size={20} className={cn(isActive && "text-[#1a73e8]")} />
      {label}
    </Link>
  )
}

export default SidebarItem
