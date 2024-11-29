import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Sidebar from "./Sidebar"
import { DialogTitle } from "@/components/ui/dialog"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"

const MobileSidebar = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
          <Menu className="text-purple-600" />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-white">
          <VisuallyHidden.Root>
            <DialogTitle>Navigation Menu</DialogTitle>
          </VisuallyHidden.Root>
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileSidebar
