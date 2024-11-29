"use client";

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image } from 'lucide-react';

interface MediaUploadProps {
  onUpload: (url: string) => void;
}

export function MediaUpload({ onUpload }: MediaUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // In a real application, you would upload the file to your storage service
    // For this example, we'll create an object URL
    const file = acceptedFiles[0];
    const url = URL.createObjectURL(file);
    onUpload(url);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
        transition-colors duration-200
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-input'}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2">
        {isDragActive ? (
          <Upload className="h-8 w-8 text-primary animate-bounce" />
        ) : (
          <Image className="h-8 w-8 text-muted-foreground" />
        )}
        <p className="text-sm text-muted-foreground">
          {isDragActive
            ? "Drop the file here"
            : "Drag and drop an image, or click to select"}
        </p>
      </div>
    </div>
  );
}