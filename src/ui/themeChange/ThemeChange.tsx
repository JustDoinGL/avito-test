import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleTheme } from "../../redux/theme/themeSlice";

const ThemeChange = () => {
  const dispatch = useAppDispatch();
  const { value: theme } = useAppSelector((state) => state.theme);

  const clickHandler = () => {
    dispatch(toggleTheme());
  };

  return (
    <button onClick={clickHandler} className="theme-button">
      {theme === "light" ? (
        <SunOutlined style={{ fontSize: "24px" }} />
      ) : (
        <MoonOutlined style={{ fontSize: "24px" }} />
      )}
    </button>
  );
};

export default ThemeChange;
