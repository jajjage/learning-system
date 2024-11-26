import { LucideIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  href: string
}

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname()
  const route = useRouter()

  // const isActive =
  return <div>SidebarItem</div>
}

export default SidebarItem
