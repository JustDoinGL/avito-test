import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


type TSeries = {
	page: number,
	id: string,
}

export const fetchSeries = createAsyncThunk<any, TSeries>(
	'series/fetchSeries',
	async function ({ id, page }, { rejectWithValue }) {
		try {
			const response = await axios.get(`https://api.kinopoisk.dev/v1.4/season?page=${page}&limit=10&movieId=${id}`, {
				headers: {
					'X-API-KEY': process.env.REACT_APP_TOKEN,
					'Accept': 'application/json',
				},
			});

			return response.data;
		} catch (error) {
			return rejectWithValue('Server error.')
		}
	}
)
