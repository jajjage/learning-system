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
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>Content Library Preview</CardTitle>
        <CardDescription>
          Explore our repository of pre-made resources
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Available Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <CardTitle className="text-base">Lesson Plans</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-2">
                    50+ ready-to-use lesson plans across various subjects
                  </p>
                  <Button size="sm">Browse Plans</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center space-x-2">
                  <Video className="w-4 h-4" />
                  <CardTitle className="text-base">Video Tutorials</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-2">
                    100+ educational videos on key topics
                  </p>
                  <Button size="sm">View Videos</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center space-x-2">
                  <PenTool className="w-4 h-4" />
                  <CardTitle className="text-base">
                    Interactive Exercises
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-2">
                    200+ exercises to engage students
                  </p>
                  <Button size="sm">Explore Exercises</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center space-x-2">
                  <FileQuestion className="w-4 h-4" />
                  <CardTitle className="text-base">Assessment Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-2">
                    Quizzes, tests, and rubrics for evaluation
                  </p>
                  <Button size="sm">Access Tools</Button>
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Featured Content</h3>
            <ul className="list-disc list-inside">
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
