import axios, { CancelTokenSource } from 'axios'
import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { Films } from '../../@types/films'
import { AgeLint, CountryLint, FilmAgeLint, RatingLint } from '../../helpers/const'
import { getRatingKey, isStart } from '../../helpers/getKey'
import { RETRIES } from '../../helpers/const'

// let cancelToken: CancelTokenSource;

export const cancelFetchFilmsFilter = createAction('films/cancelFetchFilmsFilter')

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
  async ({ page = 1, limit = 10, year, ratingYear, city, rating }, { rejectWithValue, dispatch, signal }) => {
    const baseURL = `https://api.kinopoisk.dev/v1.4/movie`

    // if(cancelToken) cancelToken.cancel();

    // cancelToken = axios.CancelToken.source();

    // signal.onabort = () => {
    //   if(cancelToken) cancelToken.cancel();
    // };

    let retries = RETRIES
    while (retries) {
      try {
        const response = await axios.get(baseURL, {
          params: {
            limit: limit,
            page,
            year: year !== FilmAgeLint['1800-1900'] ? isStart(year, FilmAgeLint.Start) : '1900-1990',
            ageRating: isStart(ratingYear, AgeLint.Start),
            'rating.kp': getRatingKey(rating),
            'countries.name': isStart(city, CountryLint.Start),
          },
          headers: {
            'X-API-KEY': process.env.REACT_APP_TOKEN,
            Accept: 'application/json',
          },
          // cancelToken: cancelToken.token
        })
        return response.data
      } catch (error) {
        if (axios.isCancel(error)) {
          dispatch(cancelFetchFilmsFilter())
        } else {
          retries -= 1
          if (!retries) return rejectWithValue('Server error.')
        }
      }
    }
  },
)
