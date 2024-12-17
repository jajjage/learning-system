import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Clock, Calendar, Award } from "lucide-react"

interface CourseOverviewProps {
  description: string
  startDate: string
  endDate: string
  certificateOffered: boolean
}

export function CourseOverview({
  description,
  startDate,
  endDate,
  certificateOffered,
}: CourseOverviewProps) {
  return (
    <Card className="p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Course Overview</h2>
      <div
        className="text-gray-600"
        dangerouslySetInnerHTML={{
          __html: description || "No description",
        }}
      />
      <Separator className="my-8" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-blue-500" />
          <span>Start Date: {startDate}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-blue-500" />
          <span>End Date: {endDate}</span>
        </div>
        <div className="flex items-center">
          <Award className="h-5 w-5 mr-2 text-blue-500" />
          <span>
            {certificateOffered
              ? "Certificate of Completion Offered"
              : "No Certificate Offered"}
          </span>
        </div>
      </div>
    </Card>
  )
}
