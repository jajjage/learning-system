"use client";

import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CoursePreviewProps {
  form: UseFormReturn<any>;
}

export function CoursePreview({ form }: CoursePreviewProps) {
  const values = form.getValues();

  return (
    <div className="max-w-4xl mx-auto">
      {values.thumbnail && (
        <div className="aspect-video rounded-lg overflow-hidden mb-6">
          <img
            src={values.thumbnail}
            alt={values.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">
                {values.title || "Course Title"}
              </CardTitle>
              <div className="flex gap-2">
                {values.category && (
                  <Badge variant="secondary">{values.category}</Badge>
                )}
                {values.difficulty && (
                  <Badge variant="secondary">{values.difficulty}</Badge>
                )}
                {values.language && (
                  <Badge variant="secondary">{values.language}</Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <div dangerouslySetInnerHTML={{ __html: values.description || "Course description" }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}