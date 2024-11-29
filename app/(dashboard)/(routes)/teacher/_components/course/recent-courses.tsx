"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Users, Star } from "lucide-react";

const recentCourses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript",
    students: 156,
    rating: 4.8,
    status: "Published",
    lastUpdated: "2024-03-20",
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    description: "Master advanced React concepts and patterns",
    students: 89,
    rating: 4.9,
    status: "Draft",
    lastUpdated: "2024-03-19",
  },
];

export function RecentCourses() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Recent Courses</h2>
      <div className="grid gap-4">
        {recentCourses.map((course) => (
          <Card key={course.id} className="hover:bg-accent/50 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </div>
                <Badge variant={course.status === "Published" ? "default" : "secondary"}>
                  {course.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {course.students} students
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  {course.rating}
                </div>
                <div className="flex items-center gap-1">
                  <Book className="h-4 w-4" />
                  Last updated: {course.lastUpdated}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}