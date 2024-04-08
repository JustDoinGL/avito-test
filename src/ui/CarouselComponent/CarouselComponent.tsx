import { Carousel } from "antd";
import styles from "./CarouselComponent.module.scss";
import { CarouselComponentProps } from "./CarouselComponent.type";
import Img from "../Img/Img";
import { useWindowWidth } from "../../hooks/useResize";
const CarouselComponent = ({ content }: CarouselComponentProps) => {
  const windowWidth = useWindowWidth();
  return (
    <Carousel
      autoplay
      className={styles.carousel}
      style={{
        width:
          windowWidth > 768
            ? `${windowWidth - 300 > 700 ? 700 : windowWidth - 300}px`
            : `${windowWidth - 50}px`,
        height:
          windowWidth > 768
            ? `${windowWidth - 300 > 700 ? 700 : windowWidth - 300}px`
            : `${windowWidth - 50}px`,
      }}
    >
      {Object.entries(content).map(([key, value], index) => (
        <div key={index} className={styles.imageContainer}>
          <Img
            className={`${styles.imageContainer} ${styles.image}`}
            width={
              windowWidth > 768
                ? windowWidth - 300 > 700
                  ? 700
                  : windowWidth - 300
                : windowWidth - 50
            }
            height={
              windowWidth > 768
                ? windowWidth - 300 > 700
                  ? 700
                  : windowWidth - 300
                : windowWidth - 50
            }
            src={value as string}
            alt={`carousel ${key}`}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
