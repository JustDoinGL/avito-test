import AuthForm from '../../components/AuthForm/AuthForm'
import { useAppDispatch } from '../../hooks/redux'
import { clearToken } from '../../redux/registration/registrationSlice'
import BackLink from '../../ui/backLink/BackLink'
import styles from './SingUpPage.module.scss'

const SingUpPage = () => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(clearToken())
  }
  return (
    <div className={styles.container} data-testid='signup-page'>
      <div className={styles.form}>
        <BackLink onBack={handleClick} back={'/'} />
        <AuthForm form='entrance' />
      </div>
    </div>
  )
}

export { SingUpPage }
