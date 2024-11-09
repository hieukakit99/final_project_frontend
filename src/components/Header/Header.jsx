import ArrowRight from "../Icons/ArrowRight";
import Logo from "../Icons/Logo";
import style from "./header.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
  const classes = {
    headerContainer: `${style.header__container}`,
    headerContent: `${style.header__content}`,
    headerIcon: `${style.header__icon}`,
    headerBtn: `${style.header__btn}`,
  };

  return (
    <div className={classes.headerContainer}>
      <div className={classes.headerContent}>
        <Link to="/" className={classes.headerIcon}>
          <Logo />
        </Link>
        <div>
          <Link to="/sign-in" className={classes.headerBtn}>
            <span>Logout</span>
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Header;
