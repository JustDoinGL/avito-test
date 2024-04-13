import { StarFilled, StarOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setFavoriteFilms } from '../../redux/films/filmsSlice'
import styles from './FeaturedContent.module.scss'
import { Link } from 'react-router-dom'

const FeaturedContent = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch()
  const [isRegister, setIsRegister] = useState(true)
  const { favoriteFilms } = useAppSelector((store) => store.films)
  const { token } = useAppSelector((store) => store.registration)

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault()
    if (!token) {
      setIsRegister(false)
      return
    }
    dispatch(setFavoriteFilms(id))
  }

  return (
    <div className={styles.container}>
      {isRegister ? (
        favoriteFilms.includes(id) ? (
          <h3 className={`h3 ${styles.star}`} onClick={handleClick}>
            Избранный <StarFilled style={{ color: 'gold' }} />
          </h3>
        ) : (
          <h3 className={`h3 ${styles.star}`} onClick={handleClick}>
            Сделать избранным <StarOutlined style={{ color: 'gold' }} />
          </h3>
        )
      ) : (
        <div className={styles.register}>
          <h3 className='h3'>В избранное могут добавить только зарегистрированные пользователи</h3>
          <Link to='/auth' className='link'>
            Зарегистрироваться
          </Link>
        </div>
      )}
    </div>
  )
}

export default FeaturedContent
