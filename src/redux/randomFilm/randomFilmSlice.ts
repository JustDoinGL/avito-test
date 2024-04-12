import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./randomFilm.type"

const randomFilmSlice = createSlice({
	name: 'randomFilm',
	initialState,
	reducers: {
		setDate: (state, action: PayloadAction<number[]>) => {
			state.date = action.payload
		},
		setSelectedGenres: (state, action: PayloadAction<string[]>) => {
			state.selectedGenres = action.payload
		},
		setSelectedCities: (state, action: PayloadAction<string[]>) => {
			state.selectedCities = action.payload
		},
	},

});

export default randomFilmSlice.reducer

export const { setDate, setSelectedCities, setSelectedGenres } = randomFilmSlice.actions