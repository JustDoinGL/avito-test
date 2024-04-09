import { initialState } from './series.type';
import { Status } from '../@types/enum';
import { fetchSeries } from './getSeries';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const seriesSlice = createSlice({
	name: 'series',
	initialState,
	reducers: {
		resetSeriesContent: (state, action: PayloadAction<string>) => {
			if (state.id === action.payload) {
				state.series = []
			} else {
				state.id = action.payload
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSeries.pending, (state) => {
				state.status = Status.pending;
			})
			.addCase(fetchSeries.fulfilled, (state, action) => {
				state.series = [...state.series, ...action.payload.docs]
				state.pages = action.payload.pages
				state.page += 1
				state.status = Status.fulfilled;
			})
			.addCase(fetchSeries.rejected, (state) => {
				state.status = Status.rejected;
			});
	},
});

export default seriesSlice.reducer;

export const { resetSeriesContent } = seriesSlice.actions;


