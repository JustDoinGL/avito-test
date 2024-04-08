import { initialState } from './photoFilms.type'
import { createSlice } from '@reduxjs/toolkit'
import { fetchPhotoFilms } from './getPhotoFilms'
import { Status } from '../@types/enum'

const photoFilmsSlice = createSlice({
	name: 'photoFilms',
	initialState,
	reducers: {
		setIsEnd: (state) => {
			state.isEnd = true
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPhotoFilms.pending, state => {
				state.status = Status.pending;
			})
			.addCase(fetchPhotoFilms.fulfilled, (state, action) => {
				if (!state.isEnd) {
					state.page = state.page + 1;
					state.photo = [...state.photo, ...action.payload.docs];
					state.total = action.payload.total;
					state.status = Status.fulfilled;
					if (state.total <= state.photo.length) {
						state.isEnd = true
					}
				}
			})
			.addCase(fetchPhotoFilms.rejected, state => {
				state.status = Status.rejected;
			})
	},
});

export default photoFilmsSlice.reducer

export const { setIsEnd, } = photoFilmsSlice.actions