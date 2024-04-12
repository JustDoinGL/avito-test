import { initialState } from './similarFilms.type';
import { Status } from '../@types/enum';
import { fetchSimilarFilms } from './getSimilarFilms';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';


const similarFilmsSlice = createSlice({
	name: 'similarFilms',
	initialState,
	reducers: {
		resetSimilarFilmsContent: (state, action: PayloadAction<string>) => {
			if (state.id === action.payload) {
				state.filmsSimilar = []
				state.page = 1
			} else {
				state.id = action.payload
				state.filmsSimilar = []
				state.page = 1
			}
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload
		},
		setContent: (state, action: PayloadAction<string[]>) => {
			state.content = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSimilarFilms.pending, (state) => {
				state.status = Status.pending;
			})
			.addCase(fetchSimilarFilms.fulfilled, (state, action) => {
				state.filmsSimilar = [...state.filmsSimilar, ...action.payload.docs]
				state.pages = action.payload.pages
				state.total = action.payload.total
				state.page += 1
				state.status = Status.fulfilled;
			})
			.addCase(fetchSimilarFilms.rejected, (state) => {
				state.status = Status.rejected;
			});
	},
});

export default similarFilmsSlice.reducer;

export const { resetSimilarFilmsContent, setPage, setContent } = similarFilmsSlice.actions;


