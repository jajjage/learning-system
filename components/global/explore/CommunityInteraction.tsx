import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function CommunityInteraction() {
  return (
    <Card className="mb-12 overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white">
        <CardTitle className="text-2xl">Community Interaction</CardTitle>
        <CardDescription className="text-white/80">
          Connect with fellow learners and participate in discussions
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#202124]">
              Sample Discussion Forum
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-[#f1f3f4] rounded-lg">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="User avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-[#202124]">John Doe</p>
                  <p className="text-sm text-[#202124]/70">
                    Can someone explain the concept of state in React?
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-[#f1f3f4] rounded-lg">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="User avatar"
                  />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-[#202124]">Jane Smith</p>
                  <p className="text-sm text-[#202124]/70">
                    State in React is like a component's memory. It's where you
                    store property values that belong to the component...
                  </p>
                </div>
              </div>
            </div>
            <Button className="mt-4 bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-md hover:shadow-lg transition-all duration-200">
              Join Discussion
            </Button>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#202124]">
              Study Groups
            </h3>
            <ul className="space-y-2 text-[#202124]/70">
              <li className="flex items-center">
                <span className="w-2 h-2 mr-2 rounded-full bg-[#1a73e8]"></span>
                React Beginners - 15 members
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 mr-2 rounded-full bg-[#1a73e8]"></span>
                JavaScript Pros - 32 members
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 mr-2 rounded-full bg-[#1a73e8]"></span>
                Web Design Enthusiasts - 28 members
              </li>
            </ul>
            <Button
              variant="outline"
              className="mt-4 border-[#1a73e8] text-[#1a73e8] hover:bg-[#1a73e8] hover:text-white transition-all duration-200"
            >
              Browse All Groups
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
