import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './theme/themeSlice'
import filmsReducer from './films/filmsSlice'
import photoFilmsSlice from './photoFilms/photoFilmsSlice'

const store = configureStore({
	reducer: {
		theme: themeReducer,
		films: filmsReducer,
		photoFilms: photoFilmsSlice,
	}
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch