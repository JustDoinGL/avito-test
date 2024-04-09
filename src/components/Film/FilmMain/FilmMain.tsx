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
import ButtonTop from "../../../ui/ButtonTop/ButtonTop";
import { useInView } from "react-intersection-observer";

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

  useEffect(() => {
    if (id) {
      dispatch(resetPhotoContent(id));
      dispatch(resetReviewsContent(id));
      dispatch(fetchPhotoFilms({ id: id, page: pagePhoto }));
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
