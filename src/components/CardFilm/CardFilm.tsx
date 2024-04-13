import styles from './CardFilm.module.scss'
import { CardFilmProps } from './CardFilm.type'
import RateStar from '../../ui/rateStar/RateStar'
import { Link } from 'react-router-dom'
import Img from '../../ui/img/Img'
import { useWindowWidth } from '../../hooks/useResize'
import { useAppDispatch } from '../../hooks/redux'
import { setIsValueSearchChange } from '../../redux/films/filmsSlice'
import FeaturedContent from '../../common/FeaturedContent/FeaturedContent'
import { useMouseEnter } from '../../hooks/useMouseEnter'

export const CardFilm = ({ film }: CardFilmProps) => {
  const width = useWindowWidth()
  const dispatch = useAppDispatch()
  const { handleMouseEnter, handleMouseLeave, isHovering } = useMouseEnter()
  const { name, poster, shortDescription, year, countries, rating } = film
  const filmRating = rating?.kp

  return (
    <Link
      to={`/film/${film.id}`}
      className={`${styles.filmCard} ${isHovering ? styles.hover : ''}`}
      onClick={() => dispatch(setIsValueSearchChange(false))}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Img
        src={poster.url}
        alt={name || ''}
        className={styles.filmCard__image}
        width={width > 420 ? 310 : 240}
        height={width > 420 ? 465 : 360}
      />

      <h2 className={styles.filmCard__title}>{name}</h2>
      <div onMouseEnter={handleMouseLeave} onMouseLeave={handleMouseEnter}>
        <FeaturedContent id={film.id} />
      </div>

      {shortDescription && <p className={styles.filmCard__description}>{shortDescription}</p>}
      {year && <p className={styles.filmCard__description}>{`Дата выхода - ${year}`}</p>}

      {countries?.[0]?.name && <p className={styles.filmCard__description}>{`Город - ${countries[0].name}`}</p>}

      {filmRating && (
        <div className={styles.filmCard__rating}>
          Рейтинг: {filmRating.toFixed(1)}
          <RateStar rate={filmRating} />
        </div>
      )}
    </Link>
  )
}
