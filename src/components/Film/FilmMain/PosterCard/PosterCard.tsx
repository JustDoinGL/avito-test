import styles from "./PosterCard.module.scss";
import { useAppSelector } from "../../../../hooks/redux";
import CarouselComponent from "../../../../ui/carouselComponent/CarouselComponent";

const PosterCard = () => {
  const { photo, status } = useAppSelector((state) => state.photoFilms);
  return (
    <div className={styles.main}>
      <h2 className="h2">Постеры:</h2>
      {status !== "rejected" && photo.length > 0 ? (
        
        <CarouselComponent content={photo} />
      ) : (
        <h3 className="h3">Постеры не найдены...</h3>
      )}
    </div>
  );
};

export default PosterCard;
