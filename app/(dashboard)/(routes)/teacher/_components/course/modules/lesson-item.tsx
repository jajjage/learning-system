"use client";

import { Video, FileText, ListChecks } from 'lucide-react';
import type { Lesson } from '../types';

interface LessonItemProps {
  lesson: Lesson;
}

export function LessonItem({ lesson }: LessonItemProps) {
  const icons = {
    video: Video,
    text: FileText,
    quiz: ListChecks,
  };

  const Icon = icons[lesson.type];

  return (
    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-accent">
      <Icon className="h-4 w-4" />
      <span className="flex-1">{lesson.title}</span>
    </div>
  );
}