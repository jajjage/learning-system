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
    <Card className="mb-12 overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white">
        <CardTitle className="text-2xl">
          Guided Tour for {role === "student" ? "Students" : "Teachers"}
        </CardTitle>
        <CardDescription className="text-white/80">
          Explore the key features of our platform
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs
          defaultValue={content[0].title.toLowerCase().replace(/\s+/g, "-")}
        >
          <TabsList className="w-full mb-6">
            {content.map((item) => (
              <TabsTrigger
                key={item.title}
                value={item.title.toLowerCase().replace(/\s+/g, "-")}
                className="flex-1 py-2 text-sm font-medium transition-all duration-200 hover:text-[#1a73e8]"
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
                <h3 className="text-xl font-semibold mb-2 text-[#202124]">
                  {item.title}
                </h3>
                <p className="text-[#202124]/70 mb-4">{item.description}</p>
                <div className="relative h-64 bg-[#f1f3f4] rounded-lg overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=256&width=512&text=${item.title}`}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-all duration-200 hover:scale-105"
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
