type RandomFilmState = {
	date: number[]
	selectedGenres: string[]
	selectedCities: string[]
}


export const initialState: RandomFilmState = {
	date: [1900, 2024],
	selectedGenres: [],
	selectedCities: []
}

