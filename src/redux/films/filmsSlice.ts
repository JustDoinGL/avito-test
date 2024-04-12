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
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload
		},
		setLimit: (state, action: PayloadAction<number>) => {
			state.limit = action.payload
		},
		setIsValueSearchChange: (state, action: PayloadAction<boolean>) => {
			state.isValueSearchChange = action.payload
		},
		setValueSearch: (state, action: PayloadAction<string>) => {
			state.valueSearch = action.payload
			state.isValueSearchChange = true
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
		setResetForm: (state) => {
			state.ageFilmLint = FilmAgeLint.Start
			state.ageLint = AgeLint.Start
			state.cityLint = CountryLint.Start
			state.ratingLint = RatingLint.Start
		},
		setParams: (state, action: PayloadAction<any>) => {
			state.page = Number(action.payload.page) ?? state.page;
			state.limit = Number(action.payload.limit) ?? state.limit;
			state.valueSearch = action.payload.valueSearch.length === 0 ? '' : action.payload.valueSearch
			state.ratingLint = action.payload.ratingLint.length === 0 ? RatingLint.Start : action.payload.ratingLint
			state.ageLint = action.payload.ageLint.length === 0 ? AgeLint.Start : action.payload.ageLint
			state.ageFilmLint = action.payload.ageFilmLint.length === 0 ? FilmAgeLint.Start : action.payload.ageFilmLint
			state.cityLint = action.payload.cityLint.length === 0 ? CountryLint.Start : action.payload.cityLint
		},
		setSearchWords: (state, action: PayloadAction<{ value: string }>) => {
			const isCopy = state.searchWords.some(word => word.value.toLocaleLowerCase() === action.payload.value.toLocaleLowerCase())
			if (action.payload.value.length > 0 && !isCopy) {
				if (state.searchWords.length < 20) {
					state.searchWords.push(action.payload)
				} else {
					state.searchWords.shift();
					state.searchWords.push(action.payload);
				}
			}
		},
		setCardSkeleton: (state, action: PayloadAction<boolean>) => {
			state.isCardSkeleton = action.payload
		},
		setFavoriteFilms: (state, action: PayloadAction<number>) => {
			const id = action.payload;
			const index = state.favoriteFilms.findIndex((filmId) => filmId === id);
			if (index !== -1) {
				state.favoriteFilms = state.favoriteFilms.filter((filmId) => filmId !== id);
				state.favoriteFilmsState = state.favoriteFilmsState.filter((film) => film.id !== id)
			} else {
				state.favoriteFilms.push(id);
			}

			localStorage.setItem('favoriteFilms', JSON.stringify(state.favoriteFilms));
		},
		clearFavoriteFilms: (state) => {
			state.favoriteFilms = [];
			localStorage.removeItem('favoriteFilms');
		}
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
				if (state.favoriteFilms.includes(action.payload.id)) {
					if (!state.favoriteFilmsState.some((el) => el.id === action.payload.id)) {
						state.favoriteFilmsState.push(action.payload)
					}
				}
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
				state.isCardSkeleton = false
			})
			.addCase(fetchFilmsFilter.rejected, state => {
				state.page = 1
				state.films = []
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
				state.films = filmsData
				state.isFull = filmsData.length === 0;
				state.page++;
				state.status = Status.fulfilled
				state.isCardSkeleton = false
			})
			.addCase(fetchSearchFilms.rejected, state => {
				state.page = 1
				state.films = []
				state.status = Status.rejected
			})
	}
})

export default filmsSlice.reducer

export const { setLimit, setIsValueSearchChange, setFavoriteFilms, clearFavoriteFilms, setSearchWords, setPage, setCardSkeleton, setResetForm, setParams, setValueSearch, setRatingLint, setAgeFilmLint, setAgeLint, setCityLint } = filmsSlice.actions

