import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Registration } from '../../@types/registration'

type TRegistration = {
	email: string,
	password: string,
}

export const fetchRegistration = createAsyncThunk<Registration, TRegistration>(
	'registration/fetchRegistration',
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async function ({ email, password }, { rejectWithValue }) {
		try {
			const response = await axios.post('https://reqres.in/api/register', { "email": "eve.holt@reqres.in", "password": password })
			return response.data
		} catch (error) {
			return rejectWithValue('Server error.')
		}
	}
)
