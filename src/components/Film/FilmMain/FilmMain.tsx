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

const FilmMain = ({ film, id }: FilmMainProps) => {
  const dispatch = useAppDispatch();
  const { ref, inView } = useInView();

  const { page: pagePhoto } = useAppSelector((state) => state.photoFilms);
  const {
    page: pageReviews,
    comments,
    pages,
    status,
    isEnd,
  } = useAppSelector((state) => state.reviews);
  const { page: pageSeries, pages:pagesSeries } = useAppSelector((state) => state.series);

  useEffect(() => {
    if (id) {
      dispatch(resetPhotoContent(id));
      dispatch(resetSeriesContent(id));
      dispatch(resetReviewsContent(id));
      dispatch(fetchPhotoFilms({ id: id, page: pagePhoto }));
      dispatch(fetchSeries({ id: id, page: pageSeries }));
      dispatch(fetchReviews({ id: id, page: pageReviews }));
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
    <>
      <PosterCard />
      <ActorsCard film={film} />
      {pagesSeries > 0 && <SeriesList />}

      {comments?.map((comment) => (
        <ReviewCard comment={comment} key={comment.id} />
      ))}
      <div ref={ref} className="loader">
        <LoaderError status={status} isFull={isEnd} />
      </div>
      <ButtonTop />
    </>
  );
};

export default FilmMain;
