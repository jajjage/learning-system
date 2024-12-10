import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Video, PenTool, FileQuestion } from "lucide-react"

export default function ContentLibrary() {
  return (
    <Card className="mb-12 overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white">
        <CardTitle className="text-2xl">Content Library Preview</CardTitle>
        <CardDescription className="text-white/80">
          Explore our repository of pre-made resources
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#202124]">
              Available Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
                <CardHeader className="flex flex-row items-center space-x-2 bg-[#f1f3f4]">
                  <FileText className="w-5 h-5 text-[#1a73e8]" />
                  <CardTitle className="text-base text-[#202124]">
                    Lesson Plans
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-[#202124]/70 mb-2">
                    50+ ready-to-use lesson plans across various subjects
                  </p>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Browse Plans
                  </Button>
                </CardContent>
              </Card>
              <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
                <CardHeader className="flex flex-row items-center space-x-2 bg-[#f1f3f4]">
                  <Video className="w-5 h-5 text-[#1a73e8]" />
                  <CardTitle className="text-base text-[#202124]">
                    Video Tutorials
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-[#202124]/70 mb-2">
                    100+ educational videos on key topics
                  </p>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    View Videos
                  </Button>
                </CardContent>
              </Card>
              <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
                <CardHeader className="flex flex-row items-center space-x-2 bg-[#f1f3f4]">
                  <PenTool className="w-5 h-5 text-[#1a73e8]" />
                  <CardTitle className="text-base text-[#202124]">
                    Interactive Exercises
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-[#202124]/70 mb-2">
                    200+ exercises to engage students
                  </p>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Explore Exercises
                  </Button>
                </CardContent>
              </Card>
              <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
                <CardHeader className="flex flex-row items-center space-x-2 bg-[#f1f3f4]">
                  <FileQuestion className="w-5 h-5 text-[#1a73e8]" />
                  <CardTitle className="text-base text-[#202124]">
                    Assessment Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-[#202124]/70 mb-2">
                    Quizzes, tests, and rubrics for evaluation
                  </p>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Access Tools
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#202124]">
              Featured Content
            </h3>
            <ul className="list-disc list-inside space-y-2 text-[#202124]/70">
              <li>STEM Project Ideas for Middle School</li>
              <li>Language Learning Games Collection</li>
              <li>Historical Timeline Interactive Map</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
