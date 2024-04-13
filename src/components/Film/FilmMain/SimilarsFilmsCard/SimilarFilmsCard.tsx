import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Carousel, Card, Space, Button } from 'antd'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { fetchSimilarFilms } from '../../../../redux/similarFilms/getSimilarFilms'
import { similarFilm } from '../../../../@types/similarFilms'
import styles from './SimilarFilmsCard.module.scss'
import { Skeleton } from '../../../../ui/skeleton/Skeleton'
import { useWindowWidth } from '../../../../hooks/useResize'
import { CarouselRef } from 'antd/es/carousel'

interface SimilarCardProps {
  similar: similarFilm
}

const SimilarCard: React.FC<SimilarCardProps> = ({ similar }) => {
  const windowWidth = useWindowWidth()
  return (
    <Card
      className={styles.card}
      style={{
        width: windowWidth <= 768 ? '100vw' : 300,
        height: 350,
        margin: '0 auto',
      }}
    >
      <Link to={`/film/${similar.id}`}>
        <Space direction='vertical' size='large' align='center'>
          {similar.poster.url ? (
            <img alt={`Poster for ${similar.name}`} src={similar.poster.url} style={{ maxHeight: 250 }} />
          ) : (
            <Skeleton width={300} height={450} />
          )}
          <Card.Meta title={similar.name} description={`${similar.movieLength} min`} />
        </Space>
      </Link>
    </Card>
  )
}

const SimilarFilmsCard: React.FC = () => {
  const dispatch = useAppDispatch()
  const windowWidth = useWindowWidth()
  const { page, filmsSimilar, total, content } = useAppSelector((state) => state.similarFilms)
  const carouselRef = useRef<CarouselRef>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleLoadMore = async () => {
    if (filmsSimilar.length < total) {
      await dispatch(fetchSimilarFilms({ page: page + 1, similar: content }))
    }
  }

  const handleBeforeChange = useCallback((to: number) => {
    setCurrentSlide(to)
  }, [])

  const handleChange = async (current: number) => {
    if (current >= filmsSimilar.length - 4 && filmsSimilar.length < total) {
      await handleLoadMore()
    } else {
      setCurrentSlide(current)
    }
  }

  const handlePrev = () => carouselRef.current?.prev()
  const handleNext = () => carouselRef.current?.next()

  const filteredFilms = filmsSimilar.slice(1)

  return (
    <div className={styles.container}>
      <h2 className='h2'>Похожий контент</h2>
      <Carousel
        beforeChange={handleBeforeChange}
        afterChange={handleChange}
        ref={carouselRef}
        className={styles.carousel}
        style={{
          width: '100%',
          maxWidth: '90vw',
          height: 400,
        }}
        autoplay={true}
        slidesToShow={windowWidth > 1024 ? 3 : windowWidth > 768 ? 2 : 1}
        initialSlide={currentSlide}
      >
        {filteredFilms.map((similar) => (
          <SimilarCard key={similar.id} similar={similar} />
        ))}
      </Carousel>
      <div className={styles.button}>
        <Button onClick={handlePrev} className={styles.button}>
          Назад
        </Button>
        <Button onClick={handleNext} className={styles.button}>
          Вперед
        </Button>
      </div>
    </div>
  )
}

export default SimilarFilmsCard
