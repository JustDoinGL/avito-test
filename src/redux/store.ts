import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './theme/themeSlice'
import filmsReducer from './films/filmsSlice'

const store = configureStore({
	reducer: {
		theme: themeReducer,
		films: filmsReducer,
	}
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch