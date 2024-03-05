import Style from "./Header.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Aside from "../Aside/Aside";
import HeaderProfile from "./profile/HeaderProfile";

const Header = ({ pathname }) => {
  const [menuView, setMenuView] = useState(false);

  const toggleDropdown = () => {
    setMenuView(!menuView);
  };

  return (
    <header id={Style.headerContainer}>
      <div className={Style.headerWrapper}>
        <div className={Style.leftContainer}>
          {(pathname === "/login" || pathname === "/signup") && (
            <>
              <MenuIcon className={Style.menuIcon} onClick={toggleDropdown} />

              <div className={Style.dropdownContainer}>
                {menuView && <Aside className={Style.dropdown} />}
              </div>
            </>
          )}

          <Link to="/">
            <img
              className={Style.logo}
              src={`${process.env.PUBLIC_URL}/img/logo-stackoverflow.png`}
              alt="logo"
            ></img>
          </Link>
        </div>

        <div className={Style.rightContainer}>
          <div className={Style.searchBarContainer}>
            <SearchIcon className={Style.searchIcon} />
            <input
              className={Style.searchBar}
              placeholder="Search..."
              type="text"
            />
          </div>
          <HeaderProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;
