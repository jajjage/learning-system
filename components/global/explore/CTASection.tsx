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
        <Button size="lg" className="w-full">
          {role === "student" ? "Sign Up as a Student" : "Join as a Teacher"}
        </Button>
        <Button variant="outline" size="lg" className="w-full">
          Start Exploring for Free
        </Button>
      </CardContent>
    </Card>
  )
}
