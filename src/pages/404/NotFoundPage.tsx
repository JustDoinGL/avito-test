import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from './NotFoundPage.module.scss'

const NotFoundPage = () => {
  const [countdown, setCountdown] = useState(10)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1)
    }, 1000)

    const redirectTimer = setTimeout(() => {
      navigate('/')
    }, 10000)

    return () => {
      clearTimeout(redirectTimer)
      clearInterval(timer)
    }
  }, [navigate])

  return (
    <div className={styles.container} data-testid='not-found-page'>
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.errorMessage}>
        Страница не найдена. Вы будете перенаправлены на главную страницу через {countdown} секунд.
      </p>
      <Link to='/' className={styles.homeLink}>
        Вернуться на главную сейчас
      </Link>
    </div>
  )
}

export default NotFoundPage
