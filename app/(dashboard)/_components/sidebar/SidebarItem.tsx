import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  href: string
}

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathName = usePathname()
  const route = useRouter()

  const isActive =
    (pathName === "/dashboard" && href === "/dashboard") ||
    pathName === href ||
    pathName?.startsWith(`${href}/`)

  const onClick = () => {
    route.push(href)
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-purple-500 text-sm font-[500] pl-6 transition-all hover:text-purple-600 hover:bg-purple-300/10",
        isActive &&
          "text-purple-700 bg-gradient-to-r from-purple-300/45 to-blue-300/40 px-2 py-2 rounded-sm transition-colors hover:text-purple-900/100",
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-purple-500", isActive && "text-purple-700")}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-blue-700 h-full transition-all",
          isActive && "opacity-100",
        )}
      />
    </button>
  )
}

export default SidebarItem
