import axios, { CancelTokenSource } from 'axios'
import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { FilmID } from '../../@types/filmId'
import { RETRIES } from '../../helpers/const'

let cancelToken: CancelTokenSource

export const cancelFetchFilm = createAction('films/cancelFetchFilm')

const makeRequest = async () => {
  const response = await axios.get(`https://api.kinopoisk.dev/v1.4/movie/random`, {
    headers: {
      'X-API-KEY': process.env.REACT_APP_TOKEN,
      Accept: 'application/json',
    },
    cancelToken: cancelToken.token,
  })

  return response.data
}

export const fetchRandomFilm = createAsyncThunk<FilmID>(
  'randomFilm/fetchRandomFilm',
  async (_, { rejectWithValue, dispatch, signal }) => {
    if (cancelToken) cancelToken.cancel()

    cancelToken = axios.CancelToken.source()

    signal.onabort = () => {
      if (cancelToken) cancelToken.cancel()
    }

    let retries = RETRIES
    while (retries) {
      try {
        const response = await makeRequest()
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
