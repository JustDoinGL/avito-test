import { Carousel } from "antd";
import styles from "./CarouselComponent.module.scss";
import { CarouselComponentProps } from "./CarouselComponent.type";
import React from "react";
import Img from "../Img/Img";

const CarouselComponent: React.FC<CarouselComponentProps> = ({ content, beforeChange }) => {
  return (
    <Carousel dots={false} effect="fade" autoplay className={styles.carousel} afterChange={beforeChange} waitForAnimate={true}>
      {content.map((item) => (
        <div key={item.id} className={styles.imageContainer}>
          <Img
            className={`${styles.imageContainer} ${styles.image}`}
            src={item.url}
            alt={`carousel ${item.type}`}
          />
        </div>
      ))}
    </Carousel>
  );
};

function areEqual(
  prevProps: CarouselComponentProps,
  nextProps: CarouselComponentProps
) {
  return prevProps.content.length === nextProps.content.length;
}

export default React.memo(CarouselComponent, areEqual);
