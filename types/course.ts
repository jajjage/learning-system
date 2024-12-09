export interface Course {
  id: string
  createdAt: Date
  updatedAt: Date
  userId: string
  title: string
  description: string | null
  price: number | null
  imageUrl: string | null
  isPublished: boolean
  categoryId: string | null
}
