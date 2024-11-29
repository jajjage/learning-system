"use client";

import { Button } from '@/components/ui/button';
import { Video, FileText, ListChecks } from 'lucide-react';

interface LessonActionsProps {
  onAddLesson: (type: 'video' | 'text' | 'quiz') => void;
}

export function LessonActions({ onAddLesson }: LessonActionsProps) {
  return (
    <div className="flex gap-2 mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onAddLesson('video')}
      >
        <Video className="h-4 w-4 mr-2" />
        Add Video
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onAddLesson('text')}
      >
        <FileText className="h-4 w-4 mr-2" />
        Add Text
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onAddLesson('quiz')}
      >
        <ListChecks className="h-4 w-4 mr-2" />
        Add Quiz
      </Button>
    </div>
  );
}