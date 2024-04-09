/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import qs from "qs";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchFilms } from "../../redux/films/getFilms";
import { CardFilm } from "../../components/CardFilm/CardFilm";
import { useInView } from "react-intersection-observer";
import LoaderError from "../../ui/loaderError/LoaderError";
import CardFilmSkeleton from "../../components/CardFilm/CardFilmSkeleton";
import SearchMain from "../../components/SearchFilms/SearchFilms";
import ButtonTop from "../../ui/ButtonTop/ButtonTop";
import { useNavigate } from "react-router-dom";
import { getRatingKey, isStart } from "../../helpers/getKey";
import {
  AgeLint,
  CountryLint,
  FilmAgeLint,
  RatingLint,
} from "../../redux/@types/enum";
import { setParams } from "../../redux/films/filmsSlice";

const MainPage = () => {
  const { ref, inView } = useInView();
  const isMounted = useRef(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    films,
    status,
    isCardSkeleton,
    page,
    limit,
    valueSearch,
    ageFilmLint,
    ageLint,
    cityLint,
    ratingLint,
    isFull,
  } = useAppSelector((state) => state.films);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setParams(params));
      dispatch(
        fetchFilms({
          page: Number(params.page) || 1,
          limit: Number(params.limit) || 10,
          query:
            params?.valueSearch?.length === 0
              ? ""
              : (params.valueSearch as string),
          rating:
            params.ratingLint?.length === 0
              ? RatingLint.Start
              : (params.ratingLint as RatingLint),
          ratingYear:
            params.ageLint?.length === 0
              ? AgeLint.Start
              : (params.ageLint as AgeLint),
          year:
            params.ageFilmLint?.length === 0
              ? FilmAgeLint.Start
              : (params.ageFilmLint as FilmAgeLint),
          city:
            params.cityLint?.length === 0
              ? CountryLint.Start
              : (params.cityLint as CountryLint),
        })
      );
    } else {
      dispatch(fetchFilms({ page: 1, limit: 10 }));
    }
  }, []);

  useEffect(() => {
    if (isCardSkeleton && inView && !isFull) {
      dispatch(
        fetchFilms({
          page: page,
          limit: limit,
          query: valueSearch,
          city: cityLint,
          year: ageFilmLint,
          ratingYear: ageLint,
          rating: ratingLint,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        page,
        limit,
        valueSearch,
        ageFilmLint: isStart(ageFilmLint, FilmAgeLint.Start),
        ageLint: isStart(ageLint, AgeLint.Start),
        cityLint: isStart(cityLint, CountryLint.Start),
        ratingLint: getRatingKey(ratingLint),
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, valueSearch, ageFilmLint, ageLint, cityLint, ratingLint]);

  return (
    <div className="container">
      <SearchMain />
      {status === "pending" &&
        films.length === 0 &&
        isCardSkeleton &&
        Array.from({ length: 10 }).map((_, index) => (
          <CardFilmSkeleton key={index} />
        ))}
      {films?.map((film) => (
        <CardFilm film={film} key={film.id} />
      ))}
      <div ref={ref} className="loader">
        <LoaderError status={status} isFull={isFull} />
      </div>
      <ButtonTop />
    </div>
  );
};

export default MainPage;
