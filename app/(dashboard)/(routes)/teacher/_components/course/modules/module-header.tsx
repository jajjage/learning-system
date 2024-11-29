"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GripVertical, Trash2 } from 'lucide-react';
import type { Module } from '../types';

interface ModuleHeaderProps {
  module: Module;
  onUpdate: (title: string) => void;
  onDelete: () => void;
  dragHandleProps: any;
}

export function ModuleHeader({ module, onUpdate, onDelete, dragHandleProps }: ModuleHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(module.title);

  const handleTitleSubmit = () => {
    setIsEditing(false);
    onUpdate(title);
  };

  return (
    <div className="flex flex-row items-center gap-4 py-3">
      <div {...dragHandleProps} className="cursor-move">
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>
      
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTitleSubmit();
          }}
          className="flex-1"
        >
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleSubmit}
            autoFocus
          />
        </form>
      ) : (
        <h3
          className="text-lg font-semibold flex-1 cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          {module.title}
        </h3>
      )}

      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}