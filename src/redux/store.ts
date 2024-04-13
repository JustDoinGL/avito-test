import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './theme/themeSlice'
import filmsReducer from './films/filmsSlice'
import photoFilmsSlice from './photoFilms/photoFilmsSlice'
import reviewsSlice from './reviews/reviewsSlice'
import seriesSlice from './series/seriesSlice'
import registrationSlice from './registration/registrationSlice'
import similarFilmsSlice from './similarFilms/similarFilmsSlice'
import randomFilmSlice from './randomFilm/randomFilmSlice'

const store = configureStore({
  reducer: {
    theme: themeReducer,
    films: filmsReducer,
    photoFilms: photoFilmsSlice,
    reviews: reviewsSlice,
    series: seriesSlice,
    registration: registrationSlice,
    similarFilms: similarFilmsSlice,
    randomFilm: randomFilmSlice,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
