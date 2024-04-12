import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchFilm } from "../../redux/films/getFilm";
import { useInView } from "react-intersection-observer";
import ButtonTop from "../../ui/buttonTop/ButtonTop";
import LoaderError from "../../ui/loaderError/LoaderError";
import { Status } from "../../redux/@types/enum";
import { CardFilm } from "../../components/CardFilm/CardFilm";

const FavoritesFilmPage = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const { ref, inView } = useInView();
  const { favoriteFilms, favoriteFilmsState } = useAppSelector(
    (store) => store.films
  );

  const filmsPerPage = 5;

  useEffect(() => {
    const loadFilms = async () => {
      const filmsToLoad = favoriteFilms.slice(
        currentPage * filmsPerPage,
        (currentPage + 1) * filmsPerPage
      );
      for (const filmId of filmsToLoad) {
        await dispatch(fetchFilm({ id: filmId.toString() }));
      }
      setCurrentPage(currentPage + 1);
    };

    loadFilms();
  }, [inView]);

  return (
    <div className="container">
      {favoriteFilmsState.map((film) => (
        <CardFilm film={film} key={film.id} />
      ))}
      <ButtonTop />
      {favoriteFilms.length === 0 && (
        <h2 className="h2">Избранные фильмы не выбраны</h2>
      )}
      {(currentPage + 1) * filmsPerPage < favoriteFilms.length && (
        <div ref={ref} className="loader">
          <LoaderError status={Status.pending} />
        </div>
      )}
    </div>
  );
};

export default FavoritesFilmPage;
