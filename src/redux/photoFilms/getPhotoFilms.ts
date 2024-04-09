import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { PhotoFilms } from '../../@types/photoFilms'

type fetchPhotoFilmsArg = {
  id: string,
  page: number
}

export const fetchPhotoFilms = createAsyncThunk<PhotoFilms, fetchPhotoFilmsArg>(
  'photoFilms/fetchPhotoFilms',
  async function ({ id, page }, { rejectWithValue }) {
    try {
      const response = await axios.get(`https://api.kinopoisk.dev/v1.4/image?page=${page}&limit=4&movieId=${id}`, {
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