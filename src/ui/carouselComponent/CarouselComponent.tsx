import { Carousel } from 'antd'
import styles from './CarouselComponent.module.scss'
import { CarouselComponentProps } from './CarouselComponent.type'
import React from 'react'
import Img from '../img/Img'

const CarouselComponent: React.FC<CarouselComponentProps> = ({ content }) => {
  return (
    <Carousel dots={false} effect='fade' autoplay={true} className={styles.carousel} autoplaySpeed={2000}>
      {content.map((item) => (
        <div key={item.id} className={styles.imageContainer}>
          <p className={styles.text}>{item.createdAt}</p>
          <Img className={`${styles.imageContainer} ${styles.image}`} src={item.url} alt={`carousel ${item.type}`} />
        </div>
      ))}
    </Carousel>
  )
}

export default CarouselComponent
