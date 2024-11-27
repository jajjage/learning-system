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
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>Progress Tracking Demo</CardTitle>
        <CardDescription>
          See how you can monitor your learning journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Course Progress</h3>
            <Progress value={65} className="w-full" />
            <p className="text-sm text-gray-500 mt-1">65% completed</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Recent Achievements</h3>
            <ul className="list-disc list-inside">
              <li>Completed "Introduction to React" module</li>
              <li>Earned "JavaScript Basics" certificate</li>
              <li>Finished 5 quizzes with 90%+ score</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Learning Streak</h3>
            <p className="text-2xl font-bold">🔥 7 days</p>
            <p className="text-sm text-gray-500">
              Keep it up! You're on a roll!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
