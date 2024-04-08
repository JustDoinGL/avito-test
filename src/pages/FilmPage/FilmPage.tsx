import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchFilm } from "../../redux/films/getFilm";
import styles from "./FilmPage.module.scss";
import LoaderError from "../../ui/loaderError/LoaderError";
import { FilmHeader, FilmHeaderSkeleton, FilmMain } from "../../components/Film";

const FilmPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { film, status } = useAppSelector((state) => state.films);

  useEffect(() => {
    if (id) {
      dispatch(fetchFilm({ id }));
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (film && status === "fulfilled") {
    return (
      <div className={`container ${styles.film}`}>
        <FilmHeader
          name={film?.name}
          slogan={film.slogan}
          poster={film.poster.url}
          description={film.description}
          rating={film.rating}
          length={film.movieLength}
          year={film.year}
        />
        <FilmMain film={film} />

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
  return (
    <div className={`container ${styles.film}`}>
      <FilmHeaderSkeleton />
      <div className="loader">
        <LoaderError status={status} />
      </div>
    </div>
  );
};
export default FilmPage;
