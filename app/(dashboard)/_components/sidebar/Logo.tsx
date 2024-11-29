import { GraduationCap } from "lucide-react"
import Link from "next/link"
import React from "react"

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Link href="/" className="flex justify-between items-center space-x-2">
        <GraduationCap className="h-8 w-8 text-purple-600" />
        <span className="text-xl bg-gradient-to-r from-purple-600 to-blue-500 font-bold bg-clip-text text-transparent">
          LuxePlatform
        </span>
      </Link>
    </div>
  )
}

export default Logo
