import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type CTASectionProps = {
  role: "student" | "teacher"
}

export default function CTASection({ role }: CTASectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ready to Get Started?</CardTitle>
        <CardDescription>
          Join our community of learners and educators today
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <Button
          size="lg"
          className="w-full font-semibold bg-gradient-to-r from-purple-600 to-blue-500  text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md hover:shadow-primary/25"
        >
          {role === "student" ? "Sign Up as a Student" : "Join as a Teacher"}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
        >
          Start Exploring for Free
        </Button>
      </CardContent>
    </Card>
  )
}
