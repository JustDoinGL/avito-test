import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Doc, Films } from '../../@types/films'

type fetchFilmsArguments = {
	page: number
	limit: number
	query: string
}

export const fetchFilmsFilter = createAsyncThunk<Films, fetchFilmsArguments>(
	'films/fetchFilmsFilter',
	async ({ page = 1, limit = 10, query }, { rejectWithValue }) => {
		try {
			const response = await axios.get('https://api.kinopoisk.dev/v1.4/movie/search', {
				params: {
					limit,
					page,
					query
				},
				headers: {
					'X-API-KEY': process.env.REACT_APP_TOKEN,
					'Accept': 'application/json',
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue('Server error.');
		}
	}
)