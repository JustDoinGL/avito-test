import { Button, Slider } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setDate,
  setSelectedCities,
  setSelectedGenres,
} from "../../redux/randomFilm/randomFilmSlice";
import styles from "./RandomFilmPage.module.scss";
import TreeSelectContent from "../../ui/treeSelect/TreeSelect";
import { GenresArray } from "../../helpers/const";

const RandomFilmPage = () => {
  const dispatch = useAppDispatch();
  const { value: theme } = useAppSelector((state) => state.theme);
  const { date, selectedCities, selectedGenres } = useAppSelector(
    (state) => state.randomFilm
  );

  const onSliderChange = (value: number[]) => {
    dispatch(setDate(value));
  };

  const handleChangeGenres = (value: string[]) => {
    dispatch(setSelectedGenres(value));
  };

  const handleChangeCity = (value: string[]) => {
    dispatch(setSelectedCities(value));
  };

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.select}>
        <TreeSelectContent
          content={GenresArray}
          placeholder="Выберите жанр"
          handleChange={handleChangeGenres}
          selectedValues={selectedGenres}
        />
        <TreeSelectContent
          content={GenresArray}
          placeholder="Выберите Город"
          handleChange={handleChangeCity}
          selectedValues={selectedCities}
        />
      </div>
      <div className={styles.slider}>
        <Slider
          style={{ maxWidth: 300, width: "100%" }}
          className={theme === "dark" ? `${styles.dark}` : ""}
          range
          min={1900}
          max={2024}
          defaultValue={[1900, 2024]}
          onChange={onSliderChange}
          value={date}
        />
        <div>
          Выбранный промежуток: с {date[0]} до {date[1]}
        </div>
      </div>

      <Button>Подобрать фильм</Button>
    </div>
  );
};

export default RandomFilmPage;
