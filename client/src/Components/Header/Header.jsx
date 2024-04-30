import style from "./Header.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Aside from "../navigation/Navigation";
import HeaderProfile from "./profile/HeaderProfile";
import { useRecoilValue } from "recoil";
import { loginState } from "../../store/atom/authState";
import Button from "../button/Button";
import SearchBar from "../searchBar/SearchBar";

const Header = ({ pathname }) => {
  const [menuView, setMenuView] = useState(false);
  const navArr = ["About", "Products", "For Teams"];

  const isLogin = useRecoilValue(loginState);
  const toggleDropdown = () => {
    setMenuView(!menuView);
  };

  return (
    <header>
      <nav className={style.headerWrapper}>
        <div className={style.leftContainer}>
          {(pathname === "/login" || pathname === "/signup") && (
            <>
              <MenuIcon className={style.menuIcon} onClick={toggleDropdown} />
              <div className={style.dropdownContainer}>
                {menuView && <Aside className={style.dropdown} />}
              </div>
            </>
          )}

          <Link to="/">
            <img
              className={style.logo}
              src={`${process.env.PUBLIC_URL}/img/logo-stackoverflow.png`}
              alt="logo"
            ></img>
          </Link>
        </div>

        <ul className={style.navList}>
          {navArr.map((nav, idx) => (
            <li key={idx}>
              <Link to="/">{nav}</Link>
            </li>
          ))}
        </ul>

        <div className={style.rightContainer}>
          <SearchBar />
          {isLogin ? (
            <HeaderProfile />
          ) : (
            <div className={style.buttonContainer}>
              <Link to="/login">
                <Button btnType="other">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
