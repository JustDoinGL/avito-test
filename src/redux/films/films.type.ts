import { FilmID } from './../../@types/filmId';
import { Doc } from '../../@types/films'
import { Status } from '../@types/enum'

type FilmsState = {
	film: FilmID | null
	films: Doc[]
	status: Status
	isFull: boolean
	page: number
	limit: number
	favoriteFilms: number[]
	valueSearch: string
}

const favoriteFilmsFromStorage = localStorage.getItem('favoriteFilms');
const defaultFavoriteFilms: number[] = favoriteFilmsFromStorage ? JSON.parse(favoriteFilmsFromStorage) : [];

export const initialState: FilmsState = {
	films: [],
	film: null,
	status: Status.pending,
	isFull: false,
	page: 1,
	favoriteFilms: defaultFavoriteFilms,
	limit: 10,
	valueSearch: ''
}

