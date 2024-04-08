import styles from "./CardFilm.module.scss";
import { CardFilmProps } from "./CardFilm.type";
import RateStar from "../../ui/rateStar/RateStar";
import { Link } from "react-router-dom";
import Img from "../../ui/Img/Img";
import { useWindowWidth } from "../../hooks/useResize";

export const CardFilm = ({ film }: CardFilmProps) => {
  const width = useWindowWidth();
  return (
    <Link to={`/film/${film.id}`} className={styles.filmCard}>
      <Img
        src={film.poster.url}
        alt={film?.name || ""}
        className={styles.filmCard__image}
        width={width > 420 ? 310 : 240}
        height={width > 420 ? 465 : 360}
      />
      <h2 className={styles.filmCard__title}>{film.name}</h2>
      <p className={styles.filmCard__description}>
        {film.shortDescription && film.shortDescription}
      </p>
      <p className={styles.filmCard__description}>
        {film.year && `Дата выхода - ${film.year}`}
      </p>
      {film.countries && film.countries[0] && film.countries[0].name && (
        <p className={styles.filmCard__description}>
          {`Город - ${film.countries[0].name}`}
        </p>
      )}
      {film.rating && film.rating.kp && (
        <div className={styles.filmCard__rating}>
          Рейтинг: {film.rating.kp.toFixed(1)}
          <RateStar rate={film.rating.kp} />
        </div>
      )}
    </Link>
  );
};
