import React from "react"
// import { Toaster } from "react-hot-toast"
// import Sidebar from "./_components/sidebar/Sidebar"
import { MainNav } from "./_components/sidebar/MainNav"

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { MainSidebar } from "./_components/sidebar/main-sidebar"

const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <SidebarProvider>
        <div className="w-screen flex h-screen">
          <MainSidebar />
          <SidebarInset className="flex flex-col flex-grow">
            <MainNav />
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  )
}

export default UserLayout
