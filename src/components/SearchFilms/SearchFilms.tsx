import { InputNumber } from "antd";
import InputText from "../../ui/InputText/InputText";
import styles from "./SearchFilms.module.scss";
import { SearchFilmsProps } from "./SearchFilms.type";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setLimit, setValueSearch } from "../../redux/films/filmsSlice";
import { useEffect } from "react";
import { fetchFilmsFilter } from "../../redux/films/getFilterFilms";
const SearchMain = ({}: SearchFilmsProps) => {
  const dispatch = useAppDispatch();
  const { limit, valueSearch } = useAppSelector((state) => state.films);

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(fetchFilmsFilter({ page: 1, limit, query: valueSearch }));
    }, 1000);

    return () => clearTimeout(timerId);
  }, [limit, valueSearch]);

  const changeLimit = (value: number) => {
    dispatch(setLimit(value));
  };

  const changeValueSearch = (value: string) => {
    dispatch(setValueSearch(value));
  };

  return (
    <div className={styles.container}>
      <InputText
        className={styles.input}
        onChange={changeValueSearch}
        value={valueSearch}
      />
      <div>
        <label className={styles.label}>
          Количество подгружаемых фильмов :
        </label>
        <InputNumber
          className={styles.input__number}
          min={1}
          max={250}
          value={limit}
          onChange={(value) => {
            value && changeLimit(value);
          }}
        />
      </div>
    </div>
  );
};

export default SearchMain;
