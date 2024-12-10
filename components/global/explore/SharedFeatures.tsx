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
    <Card className="mb-12 overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white">
        <CardTitle className="text-2xl">Explore More Features</CardTitle>
        <CardDescription className="text-white/80">
          Discover additional functionalities available to all users
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="customization">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger
              value="customization"
              className="text-sm font-medium transition-all duration-200 hover:text-[#1a73e8]"
            >
              Customization
            </TabsTrigger>
            <TabsTrigger
              value="search"
              className="text-sm font-medium transition-all duration-200 hover:text-[#1a73e8]"
            >
              Search
            </TabsTrigger>
            <TabsTrigger
              value="social"
              className="text-sm font-medium transition-all duration-200 hover:text-[#1a73e8]"
            >
              Social
            </TabsTrigger>
            <TabsTrigger
              value="responsive"
              className="text-sm font-medium transition-all duration-200 hover:text-[#1a73e8]"
            >
              Responsive
            </TabsTrigger>
          </TabsList>
          <TabsContent value="customization">
            <h3 className="text-xl font-semibold mb-4 text-[#202124]">
              Personalize Your Experience
            </h3>
            <div className="flex items-center space-x-4">
              <Avatar className="w-24 h-24 border-2 border-[#1a73e8]">
                <AvatarImage
                  src="/placeholder.svg?height=96&width=96"
                  alt="Profile picture"
                />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Input
                  placeholder="John"
                  className="border-[#1a73e8] focus:ring-[#1a73e8]"
                />
                <Input
                  placeholder="Doe"
                  className="border-[#1a73e8] focus:ring-[#1a73e8]"
                />
                <Button className="w-full bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-md hover:shadow-lg transition-all duration-200">
                  Update Profile
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="search">
            <h3 className="text-xl font-semibold mb-4 text-[#202124]">
              Search Our Course Catalog
            </h3>
            <div className="flex space-x-2">
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-[#1a73e8] focus:ring-[#1a73e8]"
              />
              <Button className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-md hover:shadow-lg transition-all duration-200">
                Search
              </Button>
            </div>
            {searchTerm && (
              <div className="mt-4">
                <p className="text-[#202124]">
                  Sample results for "{searchTerm}":
                </p>
                <ul className="list-disc list-inside mt-2 text-[#202124]/70">
                  <li>Introduction to {searchTerm}</li>
                  <li>Advanced {searchTerm} Techniques</li>
                  <li>{searchTerm} for Beginners</li>
                </ul>
              </div>
            )}
          </TabsContent>
          <TabsContent value="social">
            <h3 className="text-xl font-semibold mb-4 text-[#202124]">
              Collaborative Learning Tools
            </h3>
            <div className="space-y-2 text-[#202124]/70">
              <p className="flex items-center">
                <span className="w-4 h-4 mr-2 rounded-full bg-gradient-to-r from-[#1a73e8] to-[#4285f4]"></span>
                Discussion forums for each course
              </p>
              <p className="flex items-center">
                <span className="w-4 h-4 mr-2 rounded-full bg-gradient-to-r from-[#1a73e8] to-[#4285f4]"></span>
                Group project workspaces
              </p>
              <p className="flex items-center">
                <span className="w-4 h-4 mr-2 rounded-full bg-gradient-to-r from-[#1a73e8] to-[#4285f4]"></span>
                Peer review system
              </p>
              <p className="flex items-center">
                <span className="w-4 h-4 mr-2 rounded-full bg-gradient-to-r from-[#1a73e8] to-[#4285f4]"></span>
                Virtual study rooms
              </p>
            </div>
          </TabsContent>
          <TabsContent value="responsive">
            <h3 className="text-xl font-semibold mb-4 text-[#202124]">
              Access on Any Device
            </h3>
            <div className="flex justify-around items-center">
              <div className="text-center">
                <Laptop className="w-16 h-16 mx-auto mb-2 text-[#1a73e8]" />
                <p className="text-[#202124]">Desktop</p>
              </div>
              <div className="text-center">
                <Smartphone className="w-16 h-16 mx-auto mb-2 text-[#1a73e8]" />
                <p className="text-[#202124]">Mobile</p>
              </div>
            </div>
            <p className="text-center mt-4 text-[#202124]/70">
              Our platform is fully responsive, ensuring a seamless experience
              across all devices.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
