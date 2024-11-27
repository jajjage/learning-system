import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Zap } from "lucide-react"

export default function Gamification() {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>Gamification Preview</CardTitle>
        <CardDescription>
          Discover how we make learning fun and engaging
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Your Badges</h3>
            <div className="flex space-x-2">
              <Badge
                variant="secondary"
                className="text-yellow-600 bg-yellow-100"
              >
                <Trophy className="w-4 h-4 mr-1" /> Top Performer
              </Badge>
              <Badge
                variant="secondary"
                className="text-green-600 bg-green-100"
              >
                <Star className="w-4 h-4 mr-1" /> Quick Learner
              </Badge>
              <Badge
                variant="secondary"
                className="text-purple-600 bg-purple-100"
              >
                <Zap className="w-4 h-4 mr-1" /> Streak Master
              </Badge>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Leaderboard</h3>
            <ol className="list-decimal list-inside">
              <li>Sarah J. - 1250 points</li>
              <li>Alex M. - 1100 points</li>
              <li>You - 950 points</li>
              <li>Chris L. - 900 points</li>
              <li>Emma R. - 850 points</li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Challenges</h3>
            <ul className="space-y-2">
              <li>Complete 3 quizzes this week (2/3)</li>
              <li>Watch 5 video lessons (4/5)</li>
              <li>Participate in 2 forum discussions (1/2)</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
