import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Reviews } from '../../@types/reviews'

type TReview = {
  page: number
  id: string
}

export const fetchReviews = createAsyncThunk<Reviews, TReview>(
  'reviews/fetchReviews',
  async function ({ id, page }, { rejectWithValue }) {
    try {
      const response = await axios.get(`https://api.kinopoisk.dev/v1.4/review?page=${page}&limit=10&movieId=${id}`, {
        headers: {
          'X-API-KEY': process.env.REACT_APP_TOKEN,
          Accept: 'application/json',
        },
      })

      return response.data
    } catch (error) {
      return rejectWithValue('Server error.')
    }
  },
)
