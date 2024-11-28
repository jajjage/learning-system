import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

type GuidedTourProps = {
  role: "student" | "teacher"
}

export default function GuidedTour({ role }: GuidedTourProps) {
  const tourContent = {
    student: [
      {
        title: "Sample Course Content",
        description: "Preview our engaging lessons and interactive materials.",
      },
      {
        title: "Learning Dashboard",
        description: "Track your progress and manage your learning journey.",
      },
    ],
    teacher: [
      {
        title: "Course Creation Tools",
        description:
          "Discover our intuitive tools for creating compelling courses.",
      },
      {
        title: "Student Engagement Analytics",
        description: "Gain insights into student performance and engagement.",
      },
    ],
  }

  const content = tourContent[role]

  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>
          Guided Tour for {role === "student" ? "Students" : "Teachers"}
        </CardTitle>
        <CardDescription>
          Explore the key features of our platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue={content[0].title.toLowerCase().replace(/\s+/g, "-")}
        >
          <TabsList>
            {content.map((item) => (
              <TabsTrigger
                key={item.title}
                value={item.title.toLowerCase().replace(/\s+/g, "-")}
              >
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {content.map((item) => (
            <TabsContent
              key={item.title}
              value={item.title.toLowerCase().replace(/\s+/g, "-")}
            >
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=256&width=512&text=${item.title}`}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
