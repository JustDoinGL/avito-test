import {
  RatingLint,
  AgeLint,
  CountryLint,
  FilmAgeLint,
} from "../../../redux/@types/enum";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  setAgeFilmLint,
  setAgeLint,
  setCityLint,
  setRatingLint,
} from "../../../redux/films/filmsSlice";
import styles from "./SettingsSearch.module.scss";
import DropDownMenu from "../../../ui/dropDown/DropDownMenu";

const SettingsSearch = () => {
  const dispatch = useAppDispatch();
  const { ageFilmLint, ageLint, cityLint, ratingLint } = useAppSelector(
    (state) => state.films
  );

  return (
    <div className={styles.search__dropdown}>
      <DropDownMenu
        enumObj={AgeLint}
        selectedValue={ageLint}
        onSelect={(value) => dispatch(setAgeLint(value))}
      />
      <DropDownMenu
        enumObj={CountryLint}
        selectedValue={cityLint}
        onSelect={(value) => dispatch(setCityLint(value))}
      />
      <DropDownMenu
        enumObj={FilmAgeLint}
        selectedValue={ageFilmLint}
        onSelect={(value) => dispatch(setAgeFilmLint(value))}
      />
      <DropDownMenu
        enumObj={RatingLint}
        selectedValue={ratingLint}
        onSelect={(value) => dispatch(setRatingLint(value))}
      />
    </div>
  );
};

export default SettingsSearch;
