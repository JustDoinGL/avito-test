export interface TSeries {
  data: any
  docs: Series[]
  total: number
  limit: number
  page: number
  pages: number
}

export interface Series {
  movieId: number
  name: string
  enName: string
  number: number
  episodesCount: number
  episodes: Episode[]
  createdAt: string
  updatedAt: string
  source: string
  airDate: string
  description: string
  duration: number
  enDescription: string
  poster: Poster
  id: string
}

export interface Episode {
  number: number
  name: string
  enName: string
  still: Still
  duration: number
  date: any
  description: string
  airDate: string
  enDescription: string
}

export interface Still {
  url: string
  previewUrl: string
}

export interface Poster {
  url: string
  previewUrl: string
}
