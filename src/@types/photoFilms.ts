export interface PhotoFilms {
  docs: Photo[]
  total: number
  limit: number
  page: number
  pages: number
}

export interface Photo {
  url: string
  createdAt: string
  height: number
  movieId: number
  previewUrl: string
  type: string
  updatedAt: string
  width: number
  id: string
}
