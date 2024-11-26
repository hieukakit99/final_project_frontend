import { Link, useNavigate } from "react-router-dom";
import ArrowRight from "../Icons/ArrowRight";
import style from "./header.module.scss";
import HousePlus from "../Icons/HousePlus";
const Header = () => {
  const classes = {
    headerContainer: `${style.header__container}`,
    headerContent: `${style.header__content}`,
    headerBrand: `${style.header__brand}`,
    headerTitle: `${style.header__title}`,
    headerActions: `${style.header__actions}`,
    headerBtn: `${style.header__btn}`,
    headerBtnText: `${style.header__btn_text}`,
    headerIcon: `${style.header__icon}`,
    headerBtnIcon: `${style.header__btn_icon}`,
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  return (
    <header className={classes.headerContainer}>
      <div className={classes.headerContent}>
        <Link to="/" className={classes.headerBrand}>
          <span className={classes.headerIcon}>
            <HousePlus />
          </span>
          <h1 className={classes.headerTitle}>Quản Lý Nhân Sự</h1>
        </Link>
        <div className={classes.headerActions}>
          <Link to="#" className={classes.headerBtn} onClick={handleLogout}>
            {" "}
            <span className={classes.headerBtnText}>Logout</span>{" "}
            <span className={classes.headerBtnIcon}>
              {" "}
              <ArrowRight />{" "}
            </span>{" "}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
