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

export type CourseFormData = {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  language: string;
  thumbnail?: string;
};