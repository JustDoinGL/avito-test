import { initialState } from './films.type'
import { AgeLint, CountryLint, FilmAgeLint, RatingLint, Status } from '../@types/enum'
import { fetchFilms } from './getFilms'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchFilm } from './getFilm'
import { fetchFilmsFilter } from './getFilterFilms'
import { fetchSearchFilms } from './getSearchFilms'

const filmsSlice = createSlice({
	name: 'films',
	initialState,
	reducers: {
		setLimit: (state, action: PayloadAction<number>) => {
			state.limit = action.payload
		},
		setValueSearch: (state, action: PayloadAction<string>) => {
			state.valueSearch = action.payload
		},
		setAgeLint: (state, action: PayloadAction<AgeLint>) => {
			state.ageLint = action.payload
		},
		setCityLint: (state, action: PayloadAction<CountryLint>) => {
			state.cityLint = action.payload
		},
		setAgeFilmLint: (state, action: PayloadAction<FilmAgeLint>) => {
			state.ageFilmLint = action.payload
		},
		setRatingLint: (state, action: PayloadAction<RatingLint>) => {
			state.ratingLint = action.payload
		},
		// setFavoritefilms: (state, action: PayloadAction<Films>) => {
		// 	const user = action.payload;
		// 	const index = state.favoritefilms.findIndex((userId) => userId === user.id);
		// 	if (index !== -1) {
		// 		state.favoritefilms = state.favoritefilms.filter((userId) => userId !== user.id);
		// 	} else {
		// 		state.favoritefilms.push(user.id);
		// 	}

		// 	localStorage.setItem('favoritefilms', JSON.stringify(state.favoritefilms));
		// },
		// clearFavoritefilms: (state) => {
		// 	state.favoritefilms = [];
		// 	localStorage.removeItem('favoritefilms');
		// }
	},
	extraReducers: builder => {
		builder
			// films
			.addCase(fetchFilms.pending, state => {
				state.status = Status.pending
			})
			.addCase(fetchFilms.fulfilled, (state, action) => {
				const filmsData = action.payload.docs;
				state.isFull = filmsData.length === 0;
				if (!state.isFull) {
					state.films = state.films.concat(filmsData);
					state.page++;
				}
				state.status = Status.fulfilled;
			})
			.addCase(fetchFilms.rejected, state => {
				state.status = Status.rejected
			})

			// filmid
			.addCase(fetchFilm.pending, state => {
				state.status = Status.pending
			})
			.addCase(fetchFilm.fulfilled, (state, action) => {
				state.film = action.payload;
				state.status = Status.fulfilled;
			})
			.addCase(fetchFilm.rejected, state => {
				state.status = Status.rejected
			})

			// filterFilms
			.addCase(fetchFilmsFilter.pending, state => {
				state.status = Status.pending
			})
			.addCase(fetchFilmsFilter.fulfilled, (state, action) => {
				state.isFull = false
				state.page = 1
				const filmsData = action.payload.docs;
				state.isFull = filmsData.length === 0;
				state.films = filmsData
				state.page++;
				state.status = Status.fulfilled;
			})
			.addCase(fetchFilmsFilter.rejected, state => {
				state.status = Status.rejected
			})

			// fetchSearchFilms
			.addCase(fetchSearchFilms.pending, state => {
				state.status = Status.pending
			})
			.addCase(fetchSearchFilms.fulfilled, (state, action) => {
				state.isFull = false
				state.page = 1
				const filmsData = action.payload.docs;
				state.isFull = filmsData.length === 0;
				state.films = filmsData
				state.page++;
				state.status = Status.fulfilled

			})
			.addCase(fetchSearchFilms.rejected, state => {
				state.status = Status.rejected
			})
	}
})

export default filmsSlice.reducer

export const { setLimit, setValueSearch, setRatingLint, setAgeFilmLint, setAgeLint, setCityLint } = filmsSlice.actions

