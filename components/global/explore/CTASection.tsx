import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type CTASectionProps = {
  role: "student" | "teacher"
}

export default function CTASection({ role }: CTASectionProps) {
  return (
    <Card className="mb-12 overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white">
        <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
        <CardDescription className="text-white/80">
          Join our community of learners and educators today
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 flex flex-col space-y-4">
        <Link href={`/sign-up?role=${role.toLocaleUpperCase()}`}>
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-md hover:shadow-lg transition-all duration-200"
          >
            {role === "student" ? "Sign Up as a Student" : "Join as a Teacher"}
          </Button>
        </Link>
        <Link href="/explore">
          <Button
            variant="outline"
            size="lg"
            className="w-full border-[#1a73e8] text-[#1a73e8] hover:bg-[#1a73e8] hover:text-white transition-all duration-200"
          >
            Start Exploring for Free
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
