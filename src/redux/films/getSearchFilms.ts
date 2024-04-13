import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Films } from '../../@types/films'

type fetchFilmsArguments = {
  page: number
  limit: number
  query?: string
}

export const fetchSearchFilms = createAsyncThunk<Films, fetchFilmsArguments>(
  'films/fetchSearchFilms',
  async ({ page = 1, limit = 10, query }, { rejectWithValue }) => {
    const baseURL = `https://api.kinopoisk.dev/v1.4/movie/search`

    try {
      const response = await axios.get(baseURL, {
        params: {
          page,
          limit,
          query,
        },
        headers: {
          'X-API-KEY': process.env.REACT_APP_TOKEN,
          Accept: 'application/json',
        },
      })
      return response.data
    } catch (error) {
      console.error(error)
      return rejectWithValue('Server error.')
    }
  },
)
