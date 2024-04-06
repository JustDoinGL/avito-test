import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchFilm } from "../../redux/films/getFilm";
import styles from "./FilmPage.module.scss";
import FilmHeader from "../../components/FilmHeader/FilmHeader";

const FilmPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { film, status } = useAppSelector((state) => state.films);

  useEffect(() => {
    if (id) {
      dispatch(fetchFilm({ id }));
    }
  }, []);

  if (film) {
    return (
      <div className={`container ${styles.film}`}>
        <FilmHeader
          name={film.name}
          slogan={film.slogan}
          poster={film.poster.url}
          description={film.description}
          rating={film.rating}
          length={film.movieLength}
          year={film.year}
        />
        {/* <div className={styles.moviePage__actors}>
          Список актеров
          {film.persons?.map((el) => (
            <>{el.name}</>
          ))}
        </div>
        <div className={styles.moviePage__seasons}>
          Список сезонов и серий...
        </div>
        <div className={styles.moviePage__reviews}>Отзывы пользователей...</div>
        <div className={styles.moviePage__posters}>Карусель постеров...</div> */}
      </div>
    );
  }
  return null;
};
export default FilmPage;
