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
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>Community Interaction</CardTitle>
        <CardDescription>
          Connect with fellow learners and participate in discussions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Sample Discussion Forum
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="User avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm text-gray-500">
                    Can someone explain the concept of state in React?
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="User avatar"
                  />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Jane Smith</p>
                  <p className="text-sm text-gray-500">
                    State in React is like a component's memory. It's where you
                    store property values that belong to the component...
                  </p>
                </div>
              </div>
            </div>
            <Button className="mt-4 font-semibold bg-gradient-to-r from-purple-600 to-blue-500  text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md hover:shadow-primary/25">
              Join Discussion
            </Button>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Study Groups</h3>
            <ul className="space-y-2">
              <li>React Beginners - 15 members</li>
              <li>JavaScript Pros - 32 members</li>
              <li>Web Design Enthusiasts - 28 members</li>
            </ul>
            <Button
              variant="outline"
              className="mt-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
            >
              Browse All Groups
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
