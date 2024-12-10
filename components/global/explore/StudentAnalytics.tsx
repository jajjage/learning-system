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
    <Card className="mb-12 overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white">
        <CardTitle className="text-2xl">Student Analytics Preview</CardTitle>
        <CardDescription className="text-white/80">
          Gain insights into student performance and engagement
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#202124]">
              Course Engagement and Completion
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#202124" />
                <YAxis stroke="#202124" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="Engagement" fill="#1a73e8" />
                <Bar dataKey="Completion" fill="#4285f4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
              <CardHeader className="bg-[#f1f3f4]">
                <CardTitle className="text-base text-[#202124]">
                  Average Quiz Score
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-3xl font-bold text-[#1a73e8]">85%</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
              <CardHeader className="bg-[#f1f3f4]">
                <CardTitle className="text-base text-[#202124]">
                  Course Completion Rate
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-3xl font-bold text-[#1a73e8]">72%</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
              <CardHeader className="bg-[#f1f3f4]">
                <CardTitle className="text-base text-[#202124]">
                  Active Students
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-3xl font-bold text-[#1a73e8]">156</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
