import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import ThemeChange from "../../ui/themeChange/ThemeChange";

const Header = () => {
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
        <ThemeChange />
      </nav>

      {/* <div className="hamburger">Hamburger</div> */}
    </header>
  );
};

export default Header;
