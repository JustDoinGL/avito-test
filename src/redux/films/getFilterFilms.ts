import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Films } from '../../@types/films'
import { AgeLint, CountryLint, FilmAgeLint, RatingLint } from '../@types/enum'
import { getRatingKey, isStart } from '../../helpers/getKey'

type fetchFilmsArguments = {
	page: number
	limit: number
	year?: FilmAgeLint
	ratingYear?: AgeLint
	city?: CountryLint
	rating?: RatingLint
}

export const fetchFilmsFilter = createAsyncThunk<Films, fetchFilmsArguments>(
	'films/fetchFilmsFilter',
	async ({ page = 1, limit = 10, year, rating, city, ratingYear }, { rejectWithValue }) => {
		try {
			const response = await axios.get(`https://api.kinopoisk.dev/v1.4/movie`, {
				params: {
					limit: limit,
					page,
					year: year !== FilmAgeLint['1800-1900'] ? isStart(year, FilmAgeLint.Start) : '1900-1990',
					ageRating: isStart(ratingYear, AgeLint.Start),
					'rating.kp': getRatingKey(rating),
					"countries.name": isStart(city, CountryLint.Start),
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