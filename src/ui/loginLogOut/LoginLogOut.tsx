import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { clearToken } from '../../redux/registration/registrationSlice'
import { Button } from 'antd'
import styles from './LoginLogOut.module.scss'
import { LoginLogOutProps } from './LoginLogOut.type'
import { clearFavoriteFilms } from '../../redux/films/filmsSlice'

const LoginLogOut = ({ onClick }: LoginLogOutProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { token } = useAppSelector((store) => store.registration)

  const handleClickExit = () => {
    dispatch(clearToken())
    navigate('/')
    if (onClick) onClick()
    dispatch(clearFavoriteFilms())
  }

  const handleClickSignIn = () => {
    navigate('/login')
    if (onClick) onClick()
  }

  const handleClickSignUp = () => {
    navigate('/auth')
    if (onClick) onClick()
  }
  return (
    <>
      {token ? (
        <Button onClick={handleClickExit}>Выйти из аккаунта</Button>
      ) : (
        <div className={styles.container}>
          <Button onClick={handleClickSignIn}>Войти в аккаунт </Button>
          <Button onClick={handleClickSignUp}>Зарегистрироваться</Button>
        </div>
      )}
    </>
  )
}

export default LoginLogOut
