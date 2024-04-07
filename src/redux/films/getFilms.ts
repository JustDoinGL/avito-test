import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Films } from '../../@types/films';
import { AgeLint, CountryLint, FilmAgeLint, RatingLint } from '../@types/enum';
import { getRatingKey, isStart } from '../../helpers/getKey';

type fetchFilmsArguments = {
    page: number;
    limit: number;
    year?: FilmAgeLint;
    ratingYear?: AgeLint;
    city?: CountryLint;
    rating?: RatingLint;
    query?: string;
};

export const fetchFilms = createAsyncThunk<Films, fetchFilmsArguments>(
    'films/fetchFilms',
    async ({ page = 1, limit = 10, year, ratingYear, city, rating, query='' }, { rejectWithValue }) => {
        const endpoint = query?.length > 0 ? '/search' : '';
        const baseURL = `https://api.kinopoisk.dev/v1.4/movie${endpoint}`;

        try {
            const response = await axios.get(baseURL, {
                params: {
                    page,
                    limit,
                    year: year !== FilmAgeLint['1800-1900'] ? isStart(year, FilmAgeLint.Start) : '1900-1990',
                    ageRating: isStart(ratingYear, AgeLint.Start),
                    'rating.kp': getRatingKey(rating),
                    "countries.name": isStart(city, CountryLint.Start),
                    query,
                },
                headers: {
                    'X-API-KEY': process.env.REACT_APP_TOKEN,
                    'Accept': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue('Server error.');
        }
    }
);