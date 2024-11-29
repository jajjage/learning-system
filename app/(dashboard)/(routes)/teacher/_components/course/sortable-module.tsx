"use client";

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ModuleHeader } from './modules/module-header';
import { LessonItem } from './modules/lesson-item';
import { LessonActions } from './modules/lesson-actions';
import type { Module, Lesson } from './types';

interface SortableModuleProps {
  module: Module;
  onUpdate: (module: Module) => void;
  onDelete: (moduleId: string) => void;
}

export function SortableModule({ module, onUpdate, onDelete }: SortableModuleProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: module.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleAddLesson = (type: 'video' | 'text' | 'quiz') => {
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: `New ${type} lesson`,
      type,
    };
    onUpdate({
      ...module,
      lessons: [...module.lessons, newLesson],
    });
  };

  const handleTitleUpdate = (newTitle: string) => {
    onUpdate({
      ...module,
      title: newTitle,
    });
  };

  return (
    <Card ref={setNodeRef} style={style}>
      <CardHeader>
        <ModuleHeader
          module={module}
          onUpdate={handleTitleUpdate}
          onDelete={() => onDelete(module.id)}
          dragHandleProps={{ ...attributes, ...listeners }}
        />
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {module.lessons.map((lesson) => (
            <LessonItem key={lesson.id} lesson={lesson} />
          ))}
        </div>

        <LessonActions onAddLesson={handleAddLesson} />
      </CardContent>
    </Card>
  );
}