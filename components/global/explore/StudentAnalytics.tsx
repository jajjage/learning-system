import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { name: "Week 1", Engagement: 65, Completion: 40 },
  { name: "Week 2", Engagement: 70, Completion: 55 },
  { name: "Week 3", Engagement: 80, Completion: 70 },
  { name: "Week 4", Engagement: 75, Completion: 85 },
]

export default function StudentAnalytics() {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>Student Analytics Preview</CardTitle>
        <CardDescription>
          Gain insights into student performance and engagement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Course Engagement and Completion
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Engagement" fill="#8884d8" />
                <Bar dataKey="Completion" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Average Quiz Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">85%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Course Completion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">72%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Active Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">156</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
