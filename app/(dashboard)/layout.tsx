import React from "react"
import { Toaster } from "react-hot-toast"
import Sidebar from "./_components/Sidebar"

const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
    </div>
  )
}

export default UserLayout
