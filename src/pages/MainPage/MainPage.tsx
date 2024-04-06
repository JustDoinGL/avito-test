import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchFilms } from "../../redux/films/getFilms";
import { CardFilm } from "../../components/CardFilm/CardFilm";
import { useInView } from "react-intersection-observer";
import LoaderError from "../../ui/loaderError/LoaderError";
import CardFilmSkeleton from "../../components/CardFilm/CardFilmSkeleton";
import SearchMain from "../../components/SearchFilms/SearchFilms";

const MainPage = () => {
  const { ref, inView } = useInView();
  const dispatch = useAppDispatch();
  const { films, status, page, limit, valueSearch } = useAppSelector(
    (state) => state.films
  );

  useEffect(() => {
    if (inView || page === 1) {
      dispatch(fetchFilms({ page: page, limit: limit, query: valueSearch }));
    }
  }, [dispatch, inView, page]);

  return (
    <div className="container">
      <SearchMain />
      {status === "pending" &&
        films.length === 0 &&
        Array.from({ length: 10 }).map((_, index) => (
          <CardFilmSkeleton key={index} />
        ))}
      {films?.map((film) => (
        <CardFilm film={film} key={film.id} />
      ))}
      <div ref={ref} className="loader">
        <LoaderError status={status} />
      </div>
    </div>
  );
};

export default MainPage;
