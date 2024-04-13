import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RandomFilmState, initialState } from './randomFilm.type'
import { fetchRandomFilm } from './getRandomFilm'
import { Status } from '../@types/enum'
import { FilmID } from '../../@types/filmId'
import { fetchFilm } from '../films/getFilm'

const randomFilmSlice = createSlice({
  name: 'randomFilm',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<number[]>) => {
      state.date = action.payload;
    },
    setSelectedGenres: (state, action: PayloadAction<string[]>) => {
      state.selectedGenres = action.payload;
    },
    setSelectedContent: (state, action: PayloadAction<string[]>) => {
      state.selectedContent = []
      if (action.payload.length > 0) {
        state.selectedContent.push(action.payload[action.payload.length - 1]);
      }
    },
    setIsSearch: (state, action: PayloadAction<boolean>) => {
      state.isSearch = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomFilm.pending, (state: RandomFilmState) => {
        state.status = Status.pending;
      })
      .addCase(fetchRandomFilm.fulfilled, (state: RandomFilmState, action: PayloadAction<FilmID>) => {
        if (action.payload === null) {
          state.isSearch = true
          fetchRandomFilm({ date: [], selectedContent: [], selectedGenres: [] })
        }
        state.film = action.payload;
        state.status = Status.fulfilled;
      })
      .addCase(fetchRandomFilm.rejected, (state: RandomFilmState) => {
        state.status = Status.rejected;
      });
  },
});

export default randomFilmSlice.reducer;

export const { setDate, setSelectedContent, setSelectedGenres, setIsSearch } = randomFilmSlice.actions;