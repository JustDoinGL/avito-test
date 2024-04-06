import { Skeleton } from "../../ui/skeleton/Skeleton";
import styles from "./CardFilm.module.scss";
const CardFilmSkeleton = () => {
  return (
    <div className={styles.card__skeleton}>
      <Skeleton width={310} height={465} />
      <div className={styles.card__skeleton__title}>
        <Skeleton width={310} height={24} />
      </div>
      <div className={styles.card__skeleton__description}>
        <Skeleton width={310} height={77} />
      </div>
    </div>
  );
};

export default CardFilmSkeleton;
