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
        <FilmMain film={film} id={id} />
      </div>
    );
  }
  return (
    <div className={`container ${styles.film}`}>
      <FilmHeaderSkeleton />
      {status === "rejected" && <div className="loader">
        <LoaderError status={status} />
      </div>}
    </div>
  );
};
export default FilmPage;
