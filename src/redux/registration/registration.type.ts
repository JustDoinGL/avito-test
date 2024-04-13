import { Status } from '../@types/enum'

export type UsersPasswordLogin = {
  login: string
  password: string
}

type RegistrationState = {
  token: string | null
  name: string
  email: string
  password: string
  status: Status
  disabled: boolean
  isEmail: boolean
  isName: boolean
  isPassword: boolean
  isTwoPassword: boolean
  password2: string
  usersLogin: UsersPasswordLogin[]
  isWrongPasswordOrLogin: boolean
}

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
  password2: '',
  usersLogin: [{ password: 'admin1234', login: 'admin@mail.ru' }],
  isWrongPasswordOrLogin: false,
}
