import React from "react"
import { MainNav } from "./_components/sidebar/MainNav"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { MainSidebar } from "./_components/sidebar/main-sidebar"
import { onAuthenticatedUser } from "@/actions/auth"
import { auth, clerkClient } from "@clerk/nextjs/server"

const UserLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { user } = await onAuthenticatedUser()

  return (
    <>
      <SidebarProvider>
        <div className="w-full flex h-screen">
          <MainSidebar userDB={user} />
          <SidebarInset className="flex flex-col flex-grow overflow-hidden">
            <MainNav userDB={user} />
            <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  )
}

export default UserLayout
