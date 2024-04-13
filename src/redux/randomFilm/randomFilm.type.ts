import { FilmID } from "../../@types/filmId"
import { Status } from "../@types/enum"

export type RandomFilmState = {
  date: number[]
  selectedGenres: string[]
  selectedCities: string[]
  film: FilmID | null
  status: Status
}

export const initialState: RandomFilmState = {
  date: [1900, 2024],
  selectedGenres: [],
  selectedCities: [],
  film: null,
  status: Status.pending,
}
