import FeaturedContent from '../../../common/FeaturedContent/FeaturedContent'
import { formatLength } from '../../../helpers/formatLengthMovie/formatLengthMovie'
import { useWindowWidth } from '../../../hooks/useResize'
import BackLink from '../../../ui/backLink/BackLink'
import Img from '../../../ui/img/Img'
import RateStar from '../../../ui/rateStar/RateStar'
import styles from './FilmHeader.module.scss'
import { FilmHeaderProps } from './FilmHeader.type'

const FilmHeader = (props: FilmHeaderProps) => {
  const { slogan, poster, description, id, rating, name, length, year } = props
  const windowWidth = useWindowWidth()
  const isLargeScreen = windowWidth > 768
  const imageSize = isLargeScreen ? { width: 390, height: 585 } : { width: 300, height: 450 }

  const renderRating = (label: string, value: number) => (
    <div className={styles.rating}>
      <p>
        {label} - {value}
      </p>
      <RateStar rate={value} />
    </div>
  )

  return (
    <div className={styles.header}>
      <BackLink />
      <div className={styles.description__photo}>
        <Img width={imageSize.width} height={imageSize.height} src={poster} alt={slogan} className={styles.poster} />
        <div className={styles.info}>
          {name && <h2 className={styles.h2}>{name}</h2>}
          <FeaturedContent id={id} />
          {year && <p>Год выхода - {year}</p>}
          {length && <p>Продолжительность: {formatLength(length)} </p>}
          {renderRating('Рейтинг критиков', rating.filmCritics)}
          {renderRating('Рейтинг зрителей', rating.imdb)}
        </div>
        {description && (
          <div>
            <h3 className={styles.h3}>Описание:</h3>
            <p className={styles.description}>{description}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FilmHeader
