import { Card } from "@/components/ui/card"

interface CourseOverviewProps {
  description: string
}

export function CourseOverview({ description }: CourseOverviewProps) {
  return (
    <Card className="p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Course Overview</h2>
      <p className="text-gray-600">{description}</p>
    </Card>
  )
}
