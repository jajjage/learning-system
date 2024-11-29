"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecentCourses } from "./recent-courses";
import { CreateCourseForm } from "./create-course-form";

export function CourseCreationDashboard() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Course Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage your educational content
          </p>
        </div>
        <Button size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Create Course
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="create">Create Course</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">12</CardTitle>
                <CardDescription>Total Courses</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">1,234</CardTitle>
                <CardDescription>Total Students</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">89%</CardTitle>
                <CardDescription>Average Rating</CardDescription>
              </CardHeader>
            </Card>
          </div>
          <RecentCourses />
        </TabsContent>

        <TabsContent value="create">
          <CreateCourseForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}