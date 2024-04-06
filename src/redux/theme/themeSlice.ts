import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./theme.type";

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: (state) => {
			const newTheme = state.value === 'light' ? 'dark' : 'light';
			state.value = newTheme;
			localStorage.setItem('theme', newTheme);
		},

	},
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;