import { useWindowWidth } from "../../hooks/useResize";
import { Skeleton } from "../../ui/skeleton/Skeleton";
import styles from "./FilmHeader.module.scss";
const FilmHeaderSkeleton = () => {
  const windowWidth = useWindowWidth();
  const isLargeScreen = windowWidth > 768;
  const imageSize = isLargeScreen
    ? { width: 390, height: 585 }
    : { width: 300, height: 450 };

  return (
    <div className={styles.header}>
      <div className={styles.description__photo} style={{ marginTop: "70px" }}>
        <Skeleton width={imageSize.width} height={imageSize.height} />
        <div className={styles.info}>
          <div className={styles.card__skeleton__title}>
            <Skeleton width={310} height={90} />
          </div>
        </div>
        <div className={styles.card__skeleton__description}>
          <Skeleton width={500} height={100} />
        </div>
      </div>
    </div>
  );
};

export default FilmHeaderSkeleton;
