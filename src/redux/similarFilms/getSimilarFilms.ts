import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { TSimilarFilms } from '../../@types/similarFilms';

type TSimilarFilmsProps = {
  page: number;
  similar: string[];
};

export const fetchSimilarFilms = createAsyncThunk<TSimilarFilms, TSimilarFilmsProps>(
  'similarFilms/fetchSimilarFilms',
  async ({ page, similar }, { rejectWithValue }) => {
    try {
      const genresParams = similar.map(genre => `genres.name=%2B${encodeURIComponent(genre)}`).join('&');
      const API_KEY = process.env.REACT_APP_TOKEN;

      const response = await axios.get(`https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=10&${genresParams}`, {
        headers: {
          'X-API-KEY': API_KEY,
          'Accept': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError) {
        return rejectWithValue(axiosError.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);