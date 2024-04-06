import { Status } from '../@types/enum';

type RegistrationState = {
  token: string | null,
  name: string,
  email: string,
  password: string,
  status: Status,
  disabled: boolean,
  isEmail: boolean,
  isName: boolean,
  isPassword: boolean,
  isTwoPassword: boolean,
  password2: string
};

export const initialState: RegistrationState = {
  token: localStorage.getItem('token') || null,
  name: '',
  email: '',
  password: '',
  status: Status.fulfilled,
  disabled: true,
  isEmail: true,
  isName: true,
  isPassword: true,
  isTwoPassword: true,
  password2: ''
};