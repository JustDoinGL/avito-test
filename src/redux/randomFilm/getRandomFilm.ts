import axios, { CancelTokenSource } from 'axios'
import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { FilmID } from '../../@types/filmId'
import { RETRIES } from '../../helpers/const'

let cancelToken: CancelTokenSource

export const cancelFetchFilm = createAction('films/cancelFetchFilm')

const makeRequest = async ({ selectedContent, selectedGenres, date }: fetchRandomFilmProps) => {
  const genresParamsCities =
    selectedContent.length > 0 ? selectedContent?.map((city) => `type=%2B${encodeURIComponent(city)}`).join('&') : ''
  const genresParamsDate = date.length > 0 ? `&releaseYears.end=${date[0]}-${date[1]}` : ''
  const genresParamsGenres =
    selectedGenres.length > 0
      ? selectedGenres.map((genre) => `genres.name=%2B${encodeURIComponent(genre)}`).join('&')
      : ''
  const response = await axios.get(
    `https://api.kinopoisk.dev/v1.4/movie/random?${genresParamsGenres}&${genresParamsCities}&${genresParamsDate}`,
    {
      headers: {
        'X-API-KEY': process.env.REACT_APP_TOKEN,
        Accept: 'application/json',
      },
      cancelToken: cancelToken.token,
    },
  )

  return response.data
}

type fetchRandomFilmProps = {
  selectedGenres: string[]
  selectedContent: string[]
  date: number[]
}

export const fetchRandomFilm = createAsyncThunk<FilmID, fetchRandomFilmProps>(
  'randomFilm/fetchRandomFilm',
  async ({ selectedContent, selectedGenres, date }, { rejectWithValue, dispatch, signal }) => {
    if (cancelToken) cancelToken.cancel()

    cancelToken = axios.CancelToken.source()

    signal.onabort = () => {
      if (cancelToken) cancelToken.cancel()
    }

    let retries = RETRIES
    while (retries) {
      try {
        const response = await makeRequest({ selectedContent, selectedGenres, date })
        return response
      } catch (error) {
        if (axios.isCancel(error)) {
          dispatch(cancelFetchFilm())
        } else {
          retries -= 1
          if (!retries) return rejectWithValue('Server error.')
        }
      }
    }
  },
)
