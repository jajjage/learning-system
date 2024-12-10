import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function PersonalizedDashboard() {
  return (
    <Card className="mb-12 overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white">
        <CardTitle className="text-2xl">
          Personalized Dashboard Preview
        </CardTitle>
        <CardDescription className="text-white/80">
          A glimpse of what your dashboard could look like after signing up
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#202124]">
              Your Enrolled Courses
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
                <CardHeader className="bg-[#f1f3f4]">
                  <CardTitle className="text-base text-[#202124]">
                    Introduction to Web Development
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <Progress value={60} className="w-full h-2 mb-2" />
                  <p className="text-sm text-[#202124]/70 mb-2">
                    Progress: 60%
                  </p>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
              <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
                <CardHeader className="bg-[#f1f3f4]">
                  <CardTitle className="text-base text-[#202124]">
                    JavaScript Fundamentals
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <Progress value={30} className="w-full h-2 mb-2" />
                  <p className="text-sm text-[#202124]/70 mb-2">
                    Progress: 30%
                  </p>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#202124]">
              Recommended Courses
            </h3>
            <ul className="list-disc list-inside space-y-2 text-[#202124]/70">
              <li>Advanced React Techniques</li>
              <li>Node.js for Beginners</li>
              <li>CSS Animations Masterclass</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#202124]">
              Upcoming Deadlines
            </h3>
            <ul className="list-disc list-inside space-y-2 text-[#202124]/70">
              <li>JavaScript Quiz - Due in 2 days</li>
              <li>Web Development Project - Due in 1 week</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
