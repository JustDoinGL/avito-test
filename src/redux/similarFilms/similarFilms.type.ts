import { similarFilm } from '../../@types/similarFilms'
import { Status } from '../@types/enum'

type SimilarFilmsState = {
  status: Status
  page: number
  pages: number
  total: number
  isEnd: boolean
  filmsSimilar: similarFilm[]
  id: string
  content: string[]
}

export const initialState: SimilarFilmsState = {
  status: Status.fulfilled,
  page: 1,
  pages: 0,
  total: 0,
  isEnd: false,
  filmsSimilar: [],
  id: '',
  content: [],
}
