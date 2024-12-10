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
    <Card className="mb-12 overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white">
        <CardTitle className="text-2xl">Gamification Preview</CardTitle>
        <CardDescription className="text-white/80">
          Discover how we make learning fun and engaging
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#202124]">
              Your Badges
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-1 px-3"
              >
                <Trophy className="w-4 h-4 mr-1" /> Top Performer
              </Badge>
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-green-400 to-green-600 text-white py-1 px-3"
              >
                <Star className="w-4 h-4 mr-1" /> Quick Learner
              </Badge>
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-purple-400 to-purple-600 text-white py-1 px-3"
              >
                <Zap className="w-4 h-4 mr-1" /> Streak Master
              </Badge>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#202124]">
              Leaderboard
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-[#202124]/80">
              <li>Sarah J. - 1250 points</li>
              <li>Alex M. - 1100 points</li>
              <li className="font-semibold text-[#1a73e8]">You - 950 points</li>
              <li>Chris L. - 900 points</li>
              <li>Emma R. - 850 points</li>
            </ol>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#202124]">
              Challenges
            </h3>
            <ul className="space-y-2 text-[#202124]/80">
              <li className="flex items-center">
                <span className="w-4 h-4 mr-2 rounded-full bg-gradient-to-r from-[#1a73e8] to-[#4285f4]"></span>
                Complete 3 quizzes this week (2/3)
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 mr-2 rounded-full bg-gradient-to-r from-[#1a73e8] to-[#4285f4]"></span>
                Watch 5 video lessons (4/5)
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 mr-2 rounded-full bg-gradient-to-r from-[#1a73e8] to-[#4285f4]"></span>
                Participate in 2 forum discussions (1/2)
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
