import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { FallbackProps } from 'react-error-boundary'
import styles from './ErrorFallback.module.scss'

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate('/')
    resetErrorBoundary()
  }

  return (
    <div role='alert' className={styles.errorFallback}>
      <p className={styles.errorMessage}>Что-то пошло не так:</p>
      <pre className={styles.errorDetails}>{error.message}</pre>
      <div>
        <button onClick={handleGoBack} className={styles.button}>
          Вернуться назад
        </button>
      </div>
    </div>
  )
}

export default ErrorFallback
