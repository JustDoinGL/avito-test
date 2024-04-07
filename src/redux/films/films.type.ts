import { AgeLint, CountryLint, FilmAgeLint, RatingLint, Status } from '../@types/enum';
import { FilmID } from './../../@types/filmId';
import { Doc } from '../../@types/films'

type FilmsState = {
	film: FilmID | null
	films: Doc[]
	status: Status
	isFull: boolean
	page: number
	limit: number
	favoriteFilms: number[]
	valueSearch: string
	ageLint: AgeLint
	cityLint: CountryLint
	ageFilmLint: FilmAgeLint
	ratingLint: RatingLint
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
	valueSearch: '',
	ageLint: AgeLint.Start,
	cityLint: CountryLint.Start,
	ageFilmLint: FilmAgeLint.Start,
	ratingLint: RatingLint.Start,
}

