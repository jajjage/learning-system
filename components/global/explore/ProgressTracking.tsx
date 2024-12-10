import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ProgressTracking() {
  return (
    <Card className="mb-12 overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white">
        <CardTitle className="text-2xl">Progress Tracking Demo</CardTitle>
        <CardDescription className="text-white/80">
          See how you can monitor your learning journey
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#202124]">
              Course Progress
            </h3>
            <Progress
              value={65}
              className="w-full h-2 bg-[#f1f3f4]"
              // className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4]"
            />
            <p className="text-sm text-[#202124]/70 mt-2">65% completed</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#202124]">
              Recent Achievements
            </h3>
            <ul className="list-disc list-inside space-y-2 text-[#202124]/70">
              <li>Completed "Introduction to React" module</li>
              <li>Earned "JavaScript Basics" certificate</li>
              <li>Finished 5 quizzes with 90%+ score</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#202124]">
              Learning Streak
            </h3>
            <p className="text-3xl font-bold text-[#1a73e8]">🔥 7 days</p>
            <p className="text-sm text-[#202124]/70 mt-1">
              Keep it up! You're on a roll!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
