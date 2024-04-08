import CarouselComponent from "../../../ui/CarouselComponent/CarouselComponent";
import styles from "./FilmMain.module.scss";
import { FilmMainProps } from "./FilmMain.type";

const FilmMain = ({ film }: FilmMainProps) => {
  return (
    <div className={styles.main}>
      {film.poster ? (
        <CarouselComponent content={film.poster} />
      ) : (
        <h2>Постеры не найдены...</h2>
      )}
    </div>
  );
};

export default FilmMain;
