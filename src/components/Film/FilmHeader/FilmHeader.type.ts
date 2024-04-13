import { Rating } from '../../../@types/filmId'

export type FilmHeaderProps = {
  slogan: string
  poster: string
  description: string
  rating: Rating
  name: string
  length: number
  year: number
  id: number
}
