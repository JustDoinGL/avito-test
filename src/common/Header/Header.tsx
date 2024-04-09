import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import ThemeChange from "../../ui/themeChange/ThemeChange";
import LoginLogOut from "../../ui/loginLogOut/LoginLogOut";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { useWindowWidth } from "../../hooks/useResize";
import { useState } from "react";
import { useAppSelector } from "../../hooks/redux";

const Header = () => {
  const windowWidth = useWindowWidth();
  const [visible, setVisible] = useState(false);
  const { value: theme } = useAppSelector((state) => state.theme);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <header className={styles.header}>
      <Link to={"/"} className="link">
        Logo
      </Link>
      <nav className={styles.nav}>
        <Link to={"/link1"} className="link">
          Link 1
        </Link>
        <Link to={"/link2"} className="link">
          Link 2
        </Link>
      </nav>

      {windowWidth <= 768 ? (
        <>
          <MenuOutlined onClick={showDrawer} />
          <Drawer
            title="Menu"
            placement="top"
            onClose={onClose}
            open={visible}
            className={theme === "dark" ? `${styles.dark}` : ""}
          >
            <div className={styles.header__right}>
              <LoginLogOut />
              <ThemeChange />
            </div>
          </Drawer>
        </>
      ) : (
        <div className={styles.header__right}>
          <LoginLogOut />
          <ThemeChange />
        </div>
      )}
    </header>
  );
};

export default Header;
