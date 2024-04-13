import { FilmID } from '../../@types/filmId'
import { Status } from '../@types/enum'

export type RandomFilmState = {
  date: number[]
  selectedGenres: string[]
  selectedContent: string[]
  film: FilmID | null
  status: Status
  isSearch: boolean
}

export const initialState: RandomFilmState = {
  date: [1900, 2024],
  selectedGenres: [],
  selectedContent: [],
  film: null,
  status: Status.pending,
  isSearch: false,
}
