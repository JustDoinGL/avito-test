export interface Reviews {
  docs: Review[]
  total: number
  limit: number
  page: number
  pages: number
}

export interface Review {
  id: number
  movieId: number
  title: string
  type: string
  review: string
  date: string
  author: string
  userRating: number
  authorId: number
  createdAt: string
  updatedAt: string
  reviewLikes?: number
  reviewDislikes?: number
}
