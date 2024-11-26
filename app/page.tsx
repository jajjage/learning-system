"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Users,
  BarChart3,
  Award,
  CheckCircle2,
  Zap,
  Brain,
  Layout,
} from "lucide-react"
import Link from "next/link"

function App() {
  const [activeTab, setActiveTab] = useState("features")

  const features = [
    {
      icon: <Layout className="h-6 w-6 text-primary" />,
      title: "Intuitive Dashboard",
      description: "Centralized control panel for managing courses, students.",
      href: "/dashboard",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      title: "Course Management",
      description: "Create and organize courses with rich multimedia content",
      href: "/dashboard",
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Student Engagement",
      description: "Foster interaction through discussions and live sessions",
      href: "/dashboard",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Advanced Analytics",
      description: "Track progress and performance with detailed insights",
      href: "/dashboard",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Education Director",
      content:
        "This LMS transformed how we deliver online education. The analytics are incredible!",
    },
    {
      name: "Michael Chen",
      role: "Corporate Trainer",
      content: "The most user-friendly platform I've used. Setup was a breeze!",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 z-0" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              Transform Your Teaching Experience
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              The all-in-one learning management system that makes online
              education simple, engaging, and effective.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg">
                Start Free Trial
                <Zap className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="features" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Link
                  key={index}
                  href={feature.href}
                  className="block" // Ensures the link covers the entire card
                  aria-label={`Learn more about ${feature.title}`}
                >
                  <Card
                    key={index}
                    className="border-2 hover:border-primary/50 transition-transform transform hover:scale-105 hover:shadow-lg"
                  >
                    <CardContent className="pt-6">
                      <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="testimonials">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-2">
                  <CardContent className="pt-6">
                    <p className="text-lg mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Stats Section */}
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10k+</div>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-muted-foreground">Courses Created</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of educators who are already transforming their
            teaching experience.
          </p>
          <Button size="lg" className="bg-primary">
            Start Your Free Trial
            <Brain className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App
