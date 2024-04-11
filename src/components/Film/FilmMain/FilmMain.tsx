import { useEffect } from "react";
import { FilmMainProps } from "./FilmMain.type";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchPhotoFilms } from "../../../redux/photoFilms/getPhotoFilms";
import { fetchReviews } from "../../../redux/reviews/getReviews";
import ReviewCard from "./ReviewCard/ReviewCard";
import { resetPhotoContent } from "../../../redux/photoFilms/photoFilmsSlice";
import { resetReviewsContent } from "../../../redux/reviews/reviewsSlice";
import PosterCard from "./PosterCard/PosterCard";
import ActorsCard from "./ActorsCard/ActorsCard";
import LoaderError from "../../../ui/loaderError/LoaderError";
import ButtonTop from "../../../ui/buttonTop/ButtonTop";
import { useInView } from "react-intersection-observer";
import { resetSeriesContent } from "../../../redux/series/seriesSlice";
import { fetchSeries } from "../../../redux/series/getSeries";
import SeriesList from "./SeriesCard/SeriesCard";
import { resetSimilarFilmsContent, setContent } from "../../../redux/similarFilms/similarFilmsSlice";
import { fetchSimilarFilms } from "../../../redux/similarFilms/getSimilarFilms";
import SimilarFilmsCard from "./SimilarsFilmsCard/SimilarFilmsCard";

const FilmMain = ({ film, id }: FilmMainProps) => {
  const dispatch = useAppDispatch();
  const { ref, inView } = useInView();

  const { page: pagePhoto } = useAppSelector((state) => state.photoFilms);
  const { page: pageSimilarFilms } = useAppSelector((state) => state.similarFilms);
  const {
    page: pageReviews,
    comments,
    pages,
    status,
    isEnd,
  } = useAppSelector((state) => state.reviews);
  const { pages: pagesSeries } = useAppSelector(
    (state) => state.series
  );

  const similar = film.genres.map((genre) => genre.name)

  useEffect(() => {
    if (id) {
      dispatch(resetPhotoContent(id));
      dispatch(resetSeriesContent(id));
      dispatch(resetReviewsContent(id));
      dispatch(resetSimilarFilmsContent(id));
      dispatch(fetchPhotoFilms({ id: id, page: pagePhoto }));
      dispatch(fetchSeries({ id: id, page: 1 }));
      dispatch(fetchReviews({ id: id, page: pageReviews }));
      dispatch(fetchSimilarFilms({ similar, page: pageSimilarFilms }));

      dispatch(setContent(similar))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (id && inView && pageReviews < pages) {
      dispatch(fetchReviews({ id: id, page: pageReviews }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div>
      <PosterCard />
      <ActorsCard film={film} />
      {pagesSeries > 0 && <SeriesList />}

      {pageSimilarFilms > 0 && <SimilarFilmsCard />}

      <h2 className="h2">Комментарии</h2>
      {comments.length === 0 && <h3 className="h3">Комментариев нет...</h3>}
      {comments?.map((comment) => (
        <ReviewCard comment={comment} key={comment.id} />
      ))}
      <div ref={ref} className="loader">
        <LoaderError status={status} isFull={isEnd} />
      </div>
      <ButtonTop />
    </div>
  );
};

export default FilmMain;
