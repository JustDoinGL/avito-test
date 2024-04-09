/* eslint-disable react-hooks/exhaustive-deps */
import { Button, InputNumber } from "antd";
import InputText from "../../ui/inputText/InputText";
import styles from "./SearchFilms.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setCardSkeleton,
  setIsValueSearchChange,
  setLimit,
  setPage,
  setResetForm,
  setValueSearch,
} from "../../redux/films/filmsSlice";
import { useEffect, useState } from "react";
import { fetchFilmsFilter } from "../../redux/films/getFilterFilms";
import DropdownMenu from "./SettingsSearch/SettingsSearch";
import ModalUI from "../../ui/modalUI/ModalUI";
import { fetchSearchFilms } from "../../redux/films/getSearchFilms";

const SearchMain = () => {
  const dispatch = useAppDispatch();
  const {
    limit,
    valueSearch,
    isValueSearchChange,
    ageLint,
    cityLint,
    ageFilmLint,
    ratingLint,
  } = useAppSelector((state) => state.films);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(setCardSkeleton());
    let timerId: string | number | NodeJS.Timeout | undefined;
    if (isValueSearchChange || valueSearch) {
      timerId = setTimeout(() => {
        dispatch(setPage(1));
        dispatch(fetchSearchFilms({ page: 1, limit, query: valueSearch }));
      }, 1000);
    }

    return () => clearTimeout(timerId);
  }, [valueSearch]);

  const changeLimit = (value: number) => {
    dispatch(setLimit(value));
  };

  const changeValueSearch = (value: string) => {
    dispatch(setValueSearch(value));
  };

  const submitForm = () => {
    dispatch(setValueSearch(""));
    dispatch(setIsValueSearchChange(false));
    dispatch(setCardSkeleton());
    dispatch(setPage(1));
    dispatch(
      fetchFilmsFilter({
        page: 1,
        limit,
        year: ageFilmLint,
        ratingYear: ageLint,
        city: cityLint,
        rating: ratingLint,
      })
    );
  };

  const resetForm = () => {
    dispatch(setResetForm());
  };

  return (
    <div className={styles.container}>
      <InputText
        placeholder="Поиск по названию"
        type="text"
        className={styles.input}
        onChange={changeValueSearch}
        value={valueSearch}
      />
      <Button className={styles.button} type="primary" onClick={() => setIsModalVisible(true)}>
        Дополнительные настройки поиска
      </Button>
      <ModalUI
        submitForm={submitForm}
        resetFrom={resetForm}
        open={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="Настройки поиска"
      >
        <>
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
          <DropdownMenu />
        </>
      </ModalUI>
    </div>
  );
};

export default SearchMain;
