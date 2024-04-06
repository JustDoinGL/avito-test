import styles from "./CardFilm.module.scss";
import { CardFilmProps } from "./CardFilm.type";
import RateStar from "../../ui/rateStar/RateStar";
import { Link } from "react-router-dom";
import Img from "../../ui/Img/Img";

export const CardFilm = ({ film }: CardFilmProps) => {
  return (
    <Link to={`/${film.id}`} className={styles.filmCard}>
      <Img
        src={film.poster.url}
        alt={film.name}
        className={styles.filmCard__image}
        width={310}
        height={456}
      />
      <h2 className={styles.filmCard__title}>{film.name}</h2>
      <p className={styles.filmCard__description}>{film.shortDescription}</p>
      <div className={styles.filmCard__rating}>
        Рейтинг: {film.rating.kp.toFixed(1)}
        <RateStar rate={film.rating.kp} />
      </div>
    </Link>
  );
};
