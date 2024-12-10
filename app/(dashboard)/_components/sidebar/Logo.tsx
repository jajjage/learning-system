import { GraduationCap } from "lucide-react"
import Link from "next/link"

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <GraduationCap className="h-8 w-8 text-[#1a73e8]" />
      <span className="text-xl font-bold bg-gradient-to-r from-[#1a73e8] to-[#4285f4] bg-clip-text text-transparent">
        LuxePlatform
      </span>
    </Link>
  )
}

export default Logo
