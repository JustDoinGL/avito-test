export interface FilmID {
  lists: any[]
  id: number
  externalId: ExternalId
  name: string
  alternativeName: string
  enName: any
  names: Name[]
  type: string
  typeNumber: number
  year: number
  description: any
  shortDescription: any
  slogan: string
  status: any
  rating: Rating
  votes: Votes
  movieLength: number
  totalSeriesLength: any
  seriesLength: any
  ratingMpaa: any
  ageRating: any
  poster: Poster
  backdrop: Backdrop
  genres: Genre[]
  countries: Country[]
  budget: Budget
  fees: Fees
  premiere: Premiere
  ticketsOnSale: boolean
  sequelsAndPrequels: any[]
  watchability: Watchability
  top10: any
  top250: any
  isSeries: boolean
  audience: any[]
  deletedAt: any
  facts: any[]
  persons: Person[]
  spokenLanguages: any[]
  seasonsInfo: any[]
  collections: any[]
  productionCompanies: any[]
  similarMovies: any[]
  releaseYears: any[]
  createdAt: string
  updatedAt: string
  networks: any
}

export interface ExternalId {
  kpHD: any
}

export interface Name {
  name: string
  language?: string
  type: string
}

export interface Rating {
  kp: number
  imdb: number
  filmCritics: number
  russianFilmCritics: number
  await: number
}

export interface Votes {
  kp: number
  imdb: number
  filmCritics: number
  russianFilmCritics: number
  await: number
}

export interface Poster {
  url: string
  previewUrl: string
}

export interface Backdrop {
  url: any
  previewUrl: any
}

export interface Genre {
  name: string
}

export interface Country {
  name: string
}

export interface Budget {
  value: number
  currency: string
}

export interface Fees {
  world: World
  russia: Russia
  usa: Usa
}

export interface World {}

export interface Russia {}

export interface Usa {}

export interface Premiere {
  world: string
}

export interface Watchability {
  items: any[]
}

export interface Person {
  id: number
  photo: string
  name: string
  enName: string
  description?: string
  profession: string
  enProfession: string
}
