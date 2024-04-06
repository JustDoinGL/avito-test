import { initialState } from './films.type'
import { Status } from '../@types/enum'
import { fetchFilms } from './getFilms'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Films } from '../../@types/films'
import { fetchFilm } from './getFilm'
import { fetchFilmsFilter } from './getFilterFilms'

const filmsSlice = createSlice({
	name: 'films',
	initialState,
	reducers: {
		setLimit: (state, action: PayloadAction<number>) => {
			state.limit = action.payload
		},
		setValueSearch: (state, action: PayloadAction<string>) => {
			state.valueSearch = action.payload
		}
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
			// film id
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
				const filmsData = action.payload.docs;
				state.isFull = filmsData.length === 0;
				if (!state.isFull) {
					state.films = filmsData
					state.page++;
				}
				state.status = Status.fulfilled;
				state.films = action.payload.docs;
				if (!state.isFull) {

					state.page++;
				}
				state.page = 2
				state.status = Status.fulfilled;
			})
			.addCase(fetchFilmsFilter.rejected, state => {
				state.status = Status.rejected
			})
	}
})

export default filmsSlice.reducer

export const { setLimit, setValueSearch } = filmsSlice.actions

