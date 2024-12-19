import { Bell, Menu, Search } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CourseHeaderProps {
  title: string
  onToggleCurriculum: () => void
}

export function CourseHeader({ title, onToggleCurriculum }: CourseHeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <form className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-[200px] pl-8"
          />
        </form>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onToggleCurriculum}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Curriculum</span>
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" alt="@user" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
