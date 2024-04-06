import { FilmID } from './../../@types/filmId';
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

type fetchFilmArguments = {
  id: string
}

export const fetchFilm = createAsyncThunk<FilmID, fetchFilmArguments>(
  'films/fetchFilm',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
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