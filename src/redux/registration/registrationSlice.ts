import { UsersPasswordLogin, initialState } from './registration.type';
import { Status } from '../@types/enum';
import { TRegistration, fetchRegistration } from './getRegistration';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TForm } from '../../components/AuthForm/AuthForm.type';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registrationSlice = createSlice({
	name: 'registration',
	initialState,
	reducers: {
		clearToken: (state) => {
			state.token = null;
			localStorage.removeItem('token');
			state.email = ''
			state.name = ''
			state.password = ''
			state.password2 = ''
			state.isEmail = true
			state.isName = true
			state.isPassword = true
			state.isTwoPassword = true
			state.disabled = true
			state.isWrongPasswordOrLogin = false
		},
		isLoading: (state) => {
			state.disabled = true;
		},
		setDisabled: (state, action: PayloadAction<TForm>) => {
			if (action.payload === 'registration') {
				const isAllFieldsFilled = state.email.length > 0 && state.password.length > 0 && state.name.length > 0 && state.password2.length > 0;
				state.disabled = !(state.isPassword && state.isEmail && state.isName && state.isTwoPassword && isAllFieldsFilled);
			} else if (action.payload === 'entrance') {
				const isAllFieldsFilled = state.email.length > 0 && state.password.length > 0;
				state.disabled = !(state.isPassword && state.isEmail && isAllFieldsFilled);
			}

			if (state.status === Status.pending) {
				state.disabled = true;
			}
		},
		setAddNewUser: (state, action: PayloadAction<UsersPasswordLogin>) => {
			state.usersLogin.push(action.payload)
		},
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
			state.isWrongPasswordOrLogin = false
			state.isEmail = emailRegex.test(state.email);
		},
		setName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
			state.isName = state.name.length > 2;
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload;
			state.isPassword = action.payload.length > 8;
			state.isWrongPasswordOrLogin = false

			state.isTwoPassword = state.password === state.password2;
		},
		setPassword2: (state, action: PayloadAction<string>) => {
			state.password2 = action.payload;
			state.isTwoPassword = state.password === state.password2;
		},
		setIsWrongPassOrLogin: (state, action: PayloadAction<boolean>) => {
			state.isWrongPasswordOrLogin = action.payload
			state.disabled = false
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRegistration.pending, (state) => {
				state.disabled = true;
				state.status = Status.pending;
			})
			.addCase(fetchRegistration.fulfilled, (state, action) => {
				state.token = action.payload.token;
				localStorage.setItem('token', state.token);
				state.status = Status.fulfilled;
			})
			.addCase(fetchRegistration.rejected, (state) => {
				state.status = Status.rejected;
			});
	},
});

export default registrationSlice.reducer;

export const { clearToken, setAddNewUser, setIsWrongPassOrLogin, setDisabled, setEmail, setName, isLoading, setPassword, setPassword2 } = registrationSlice.actions;


