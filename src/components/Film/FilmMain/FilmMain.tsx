import { useEffect } from "react";
import CarouselComponent from "../../../ui/CarouselComponent/CarouselComponent";
import styles from "./FilmMain.module.scss";
import { FilmMainProps } from "./FilmMain.type";
import { Image, Table } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchPhotoFilms } from "../../../redux/photoFilms/getPhotoFilms";
import { useWindowWidth } from "../../../hooks/useResize";
import { setIsEnd } from "../../../redux/photoFilms/photoFilmsSlice";

const FilmMain = ({ film, id }: FilmMainProps) => {
  const dispatch = useAppDispatch();
  const { page, photo, isEnd } = useAppSelector((state) => state.photoFilms);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    // dispatch(setIsEnd());
    if (id) {
      dispatch(fetchPhotoFilms({ id: id, page: page }));
    }
  }, []);

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

  const beforeChange = () => {
    if (id && !isEnd) dispatch(fetchPhotoFilms({ id: id, page: page }));
  };

  return (
    <>
      <div className={styles.main}>
        <h2 className={styles.h2}>Постеры:</h2>

        {photo.length > 0 ? (
          <CarouselComponent content={photo} beforeChange={beforeChange} />
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
    </>
  );
};

export default FilmMain;
