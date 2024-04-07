import axios, { CancelTokenSource } from 'axios';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { Films } from '../../@types/films';
import { RETRIES } from '../../helpers/const';

let cancelToken: CancelTokenSource;

export const cancelFetchSearchFilms = createAction('films/cancelFetchSearchFilms');

type fetchFilmsArguments = {
  page: number;
  limit: number;
  query?: string;
};

export const fetchSearchFilms = createAsyncThunk<Films, fetchFilmsArguments>(
  'films/fetchSearchFilms',
  async ({ page = 1, limit = 10, query }, { rejectWithValue, dispatch, signal }) => {

    const baseURL = `https://api.kinopoisk.dev/v1.4/movie/search`;

    if(cancelToken) cancelToken.cancel();

    cancelToken = axios.CancelToken.source();

    signal.onabort = () => {
      if(cancelToken) cancelToken.cancel();
    };

    let retries = RETRIES;
    while (retries) {
      try {
        const response = await axios.get(baseURL, {
          params: {
            page,
            limit,
            query,
          },
          headers: {
            'X-API-KEY': process.env.REACT_APP_TOKEN,
            'Accept': 'application/json',
          },
          cancelToken: cancelToken.token
        });

        return response.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          dispatch(cancelFetchSearchFilms());
        } else {
          retries -= 1;
          if (!retries) return rejectWithValue('Server error.');
        }
      }
    }
  }
);