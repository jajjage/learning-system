"use client";

import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableModule } from './sortable-module';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Lesson = {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz';
  content?: string;
};

export function CurriculumBuilder() {
  const [modules, setModules] = useState<Module[]>([]);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addModule = () => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      title: 'New Module',
      lessons: [],
    };
    setModules([...modules, newModule]);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setModules((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Course Curriculum</h3>
        <Button onClick={addModule} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Module
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={modules.map((m) => m.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {modules.map((module) => (
              <SortableModule
                key={module.id}
                module={module}
                onUpdate={(updatedModule) => {
                  setModules(modules.map((m) => 
                    m.id === updatedModule.id ? updatedModule : m
                  ));
                }}
                onDelete={(moduleId) => {
                  setModules(modules.filter((m) => m.id !== moduleId));
                }}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {modules.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No modules yet. Click &quot;Add Module&quot; to start building your curriculum.
        </div>
      )}
    </div>
  );
}