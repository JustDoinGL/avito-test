interface ThemeState {
  value: 'light' | 'dark';
}

export const initialState: ThemeState = {
  value: localStorage.getItem('theme') ? (localStorage.getItem('theme') === 'dark' ? 'dark' : 'light') : 'dark'
};

