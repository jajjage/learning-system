"use client"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Laptop, Smartphone } from "lucide-react"

export default function SharedFeatures() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>Explore More Features</CardTitle>
        <CardDescription>
          Discover additional functionalities available to all users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="customization">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="customization">Customization</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="responsive">Responsive</TabsTrigger>
          </TabsList>
          <TabsContent value="customization" className="mt-4">
            <h3 className="text-lg font-semibold mb-2">
              Personalize Your Experience
            </h3>
            <div className="flex items-center space-x-4">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src="/placeholder.svg?height=96&width=96"
                  alt="Profile picture"
                />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <div>
                <Input placeholder="John" className="mb-2" />
                <Input placeholder="Doe" className="mb-2" />
                <Button className="font-semibold bg-gradient-to-r from-purple-600 to-blue-500  text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md hover:shadow-primary/25">
                  Update Profile
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="search" className="mt-4">
            <h3 className="text-lg font-semibold mb-2">
              Search Our Course Catalog
            </h3>
            <div className="flex space-x-2">
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Search
              </Button>
            </div>
            {searchTerm && (
              <div className="mt-4">
                <p>Sample results for "{searchTerm}":</p>
                <ul className="list-disc list-inside mt-2">
                  <li>Introduction to {searchTerm}</li>
                  <li>Advanced {searchTerm} Techniques</li>
                  <li>{searchTerm} for Beginners</li>
                </ul>
              </div>
            )}
          </TabsContent>
          <TabsContent value="social" className="mt-4">
            <h3 className="text-lg font-semibold mb-2">
              Collaborative Learning Tools
            </h3>
            <div className="space-y-2">
              <p>✅ Discussion forums for each course</p>
              <p>✅ Group project workspaces</p>
              <p>✅ Peer review system</p>
              <p>✅ Virtual study rooms</p>
            </div>
          </TabsContent>
          <TabsContent value="responsive" className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Access on Any Device</h3>
            <div className="flex justify-around items-center">
              <div className="text-center">
                <Laptop className="w-16 h-16 mx-auto mb-2" />
                <p>Desktop</p>
              </div>
              <div className="text-center">
                <Smartphone className="w-16 h-16 mx-auto mb-2" />
                <p>Mobile</p>
              </div>
            </div>
            <p className="text-center mt-4">
              Our platform is fully responsive, ensuring a seamless experience
              across all devices.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
