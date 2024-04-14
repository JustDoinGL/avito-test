import { useWindowWidth } from '../../hooks/useResize'
import { Skeleton } from '../../ui/skeleton/Skeleton'
import styles from './CardFilm.module.scss'
const CardFilmSkeleton = () => {
  const windowWidth = useWindowWidth()
  return (
    <div className={styles.card__skeleton}>
      <Skeleton width={windowWidth > 420 ? 280 : 240} height={windowWidth > 420 ? 400 : 320} />
      <div className={styles.card__skeleton__title}>
        <Skeleton width={windowWidth > 420 ? 280 : 240} height={24} />
      </div>
      <div className={styles.card__skeleton__description}>
        <Skeleton width={windowWidth > 420 ? 280 : 240} height={77} />
      </div>
    </div>
  )
}

export default CardFilmSkeleton
