import axios, { CancelTokenSource } from 'axios';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { FilmID } from './../../@types/filmId';
import { RETRIES } from '../../helpers/const';

let cancelToken: CancelTokenSource;

export const cancelFetchFilm = createAction('films/cancelFetchFilm');

type fetchFilmArguments = {
  id: string
}

const makeRequest = async (id: string) => {
  const response = await axios.get(`https://api.kinopoisk.dev/v1.4/movie/random`, {
    headers: {
      'X-API-KEY': process.env.REACT_APP_TOKEN,
      'Accept': 'application/json',
    },
    cancelToken: cancelToken.token
  });

  return response.data;
}

export const fetchFilm = createAsyncThunk<FilmID, fetchFilmArguments>(
  'films/fetchFilm',
  async ({ id }, { rejectWithValue, dispatch, signal }) => {
    if(cancelToken) cancelToken.cancel();
    
    cancelToken = axios.CancelToken.source();
    
    signal.onabort = () => {
      if(cancelToken) cancelToken.cancel();
    };

    let retries = RETRIES;
    while (retries) {
      try {
        const response = await makeRequest(id);
        return response;
      } catch (error) {
        if (axios.isCancel(error)) {
          dispatch(cancelFetchFilm());
        } else {
          retries -= 1;
          if (!retries) return rejectWithValue('Server error.');
        }
      }
    }
  }
);