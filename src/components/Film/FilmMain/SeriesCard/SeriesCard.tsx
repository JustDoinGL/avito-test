import { Carousel, Card, Collapse, Space, Button } from "antd";
import { Series, Episode } from "../../../../@types/series";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import styles from "./SeriesCard.module.scss";
import { fetchSeries } from "../../../../redux/series/getSeries";
import React from "react";
import { useWindowWidth } from "../../../../hooks/useResize";
import { Skeleton } from "../../../../ui/skeleton/Skeleton";
const { Panel } = Collapse;

const EpisodeCard: React.FC<{ episodes: Episode[] }> = ({ episodes }) => (
  <Collapse accordion defaultActiveKey={["1"]}>
    {episodes.map((episode, index) => (
      <Panel header={episode.name} key={index}>
        <p>{episode.description}</p>
      </Panel>
    ))}
  </Collapse>
);

const SeriesCard: React.FC<{ series: Series }> = ({ series }) => {
  const windowWidth = useWindowWidth();
  return (
    <Card
      style={{
        width: windowWidth > 768 ? windowWidth - 150 : windowWidth - 35,
        height: 550,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      className={styles.card}
    >
      <Space direction="vertical" size="large" align="center">
        <img
          alt={`Poster for ${series.description}`}
          src={series.poster.previewUrl}
          style={{ maxHeight: "90%" }}
        />
        <Card.Meta title={series.name} description={series.description} />
        <EpisodeCard episodes={series.episodes} />
      </Space>
    </Card>
  );
};

const SeriesList = () => {
  const windowWidth = useWindowWidth();
  const dispatch = useAppDispatch();
  const carouselRef = React.useRef<any>(null);
  const { page, series, total, id } = useAppSelector((store) => store.series);

  const handleLoadMore = async () => {
    await dispatch(fetchSeries({ page: page, id: id }));
  };

  const handleChange = async (current: number) => {
    if (current === series.length - 1 && !(total <= series.length)) {
      await handleLoadMore();
      carouselRef.current.goTo(current, false);
    }
  };

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const handleNext = () => {
    carouselRef.current.next();
  };

  if (series.length > 0) {
    return (
      <div>
        <h2 className="h2">Серии</h2>
        <div className={styles.container}>
          <Carousel
            style={{
              width: windowWidth > 768 ? windowWidth - 150 : windowWidth - 35,
              height: 600,
            }}
            afterChange={handleChange}
            ref={carouselRef}
            className={styles.carousel}
          >
            {series.map((s) => (
              <SeriesCard key={s.id} series={s} />
            ))}
          </Carousel>
          <div className={styles.button}>
            <Button onClick={handlePrev}>Назад</Button>
            <Button onClick={handleNext}>Вперед</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.carousel}>
      <h2 className="h2">Серии</h2>
      <Skeleton
        width={windowWidth > 768 ? windowWidth - 150 : windowWidth - 15}
        height={500}
      />
    </div>
  );
};

export default SeriesList;
