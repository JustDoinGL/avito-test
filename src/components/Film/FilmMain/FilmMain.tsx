import { useEffect } from "react";
import CarouselComponent from "../../../ui/CarouselComponent/CarouselComponent";
import styles from "./FilmMain.module.scss";
import { FilmMainProps } from "./FilmMain.type";
import { Image, Table } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchPhotoFilms } from "../../../redux/photoFilms/getPhotoFilms";
import { useWindowWidth } from "../../../hooks/useResize";
import Img from "../../../ui/Img/Img";
import { useInView } from "react-intersection-observer";
import { fetchReviews } from "../../../redux/reviews/getReviews";

const FilmMain = ({ film, id }: FilmMainProps) => {
  const dispatch = useAppDispatch();
  const { page, photo, isEnd, status } = useAppSelector(
    (state) => state.photoFilms
  );
  const {
    page: pageR,
    pages,
    comments,
  } = useAppSelector((state) => state.reviews);
  const windowWidth = useWindowWidth();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (id) {
      dispatch(fetchPhotoFilms({ id: id, page: page }));
    }
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(fetchPhotoFilms({ id: id, page: page }));
    }
  }, []);

  useEffect(() => {
    if (id && inView && pageR < pages) {
      dispatch(fetchReviews({ id: id, page: pageR }));
    }
  }, [inView]);

  const hasPagination = film.persons.length > 10;

  const columns = [
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: "Фото",
      dataIndex: "photo",
      key: "photo",
      render: (text: string) => (
        <Image width={windowWidth > 420 ? 80 : 40} src={text} />
      ),
    },
    {
      title: "Профессия",
      dataIndex: "profession",
      key: "profession",
      render: (text: string) => <p>{text}</p>,
    },
  ];

  // const b = (value: number) => {
  //   if (value % 4 === 0) {
  //     if (id && !isEnd)
  //       dispatch(fetchPhotoFilms({ id: id, page: page + 1 }));
  //   }
  // };

  return (
    <>
      <div className={styles.main}>
        <h2 className={styles.h2}>Постеры:</h2>

        {status === "fulfilled" && photo ? (
          <>
            {photo.length}
            <CarouselComponent content={photo} />
          </>
        ) : (
          <h3 className={styles.h3}>Постеры не найдены...</h3>
        )}
      </div>

      <div className={styles.persons}>
        <Table
          dataSource={film.persons}
          columns={columns}
          pagination={
            hasPagination ? { pageSize: 10, position: ["bottomCenter"] } : false
          }
        />
      </div>
      <div>
        {comments?.map((el) => (
          <div>{el.author}</div>
        ))}
      </div>

      <div ref={ref}></div>
    </>
  );
};

export default FilmMain;
