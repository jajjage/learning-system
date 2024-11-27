import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PersonalizedDashboard() {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>Personalized Dashboard Preview</CardTitle>
        <CardDescription>
          A glimpse of what your dashboard could look like after signing up
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Your Enrolled Courses
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Introduction to Web Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">Progress: 60%</p>
                  <Button size="sm" className="mt-2">
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    JavaScript Fundamentals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">Progress: 30%</p>
                  <Button size="sm" className="mt-2">
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Recommended Courses</h3>
            <ul className="list-disc list-inside">
              <li>Advanced React Techniques</li>
              <li>Node.js for Beginners</li>
              <li>CSS Animations Masterclass</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Upcoming Deadlines</h3>
            <ul className="list-disc list-inside">
              <li>JavaScript Quiz - Due in 2 days</li>
              <li>Web Development Project - Due in 1 week</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
