import { useState, useEffect } from 'react'
import styles from './ButtonTop.module.scss'
import { ArrowUpOutlined } from '@ant-design/icons'

const ButtonTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <>
      {isVisible ? (
        <div className={styles.scroll}>
          <p onClick={scrollToTop}>
            <ArrowUpOutlined />
          </p>
        </div>
      ) : null}
    </>
  )
}

export default ButtonTop
