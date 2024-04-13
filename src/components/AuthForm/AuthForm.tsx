import { FormEvent, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loading3QuartersOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { isLoading, setAddNewUser, setIsWrongPassOrLogin } from '../../redux/registration/registrationSlice'
import { Status } from '../../redux/@types/enum'
import { useFormControls } from '../../hooks/useFormControls'
import ErrorMessage from '../../ui/errorMessage/ErrorMessage'
import { AuthFormProps } from './AuthForm.type'
import styles from './AuthForm.module.scss'
import Item from './Item/Item'
import { fetchRegistration } from '../../redux/registration/getRegistration'

const AuthForm = ({ form }: AuthFormProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { disabled, email, password, status, usersLogin, isWrongPasswordOrLogin } = useAppSelector(
    (state) => state.registration,
  )
  const inputFields = useFormControls(form)

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      dispatch(isLoading())
      const userExists = usersLogin.some((user) => user.login === email && user.password === password)
      if (form === 'registration' && !userExists) {
        await dispatch(fetchRegistration({ email, password }))
        dispatch(setAddNewUser({ login: email, password }))
      } else {
        if (userExists) {
          await dispatch(fetchRegistration({ email, password }))
        } else {
          dispatch(setIsWrongPassOrLogin(true))
          return
        }
      }

      navigate('/', { replace: true })
    },
    [dispatch, email, password, form, navigate, usersLogin],
  )

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <h1 className={styles.title}>{form === 'registration' ? 'Регистрация' : 'Вход'}</h1>
          <Link to={form === 'registration' ? '/login' : '/auth'} className='link'>
            {form === 'registration' ? 'Есть аккаунт' : 'Зарегистрироваться'}
          </Link>
        </div>

        {status === Status.rejected && <ErrorMessage errorMessage={'Произошла ошибка'} />}

        {inputFields.map((field, index) => (
          <Item {...field} key={index} />
        ))}

        {isWrongPasswordOrLogin && <ErrorMessage errorMessage='Неправильная почта или пароль' />}

        <button className={styles.button} type='submit' disabled={disabled}>
          {form === 'registration' ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </form>
      {status === Status.pending && (
        <Modal>
          <Loading3QuartersOutlined width={50} height={50} />
        </Modal>
      )}
    </>
  )
}

export default AuthForm
