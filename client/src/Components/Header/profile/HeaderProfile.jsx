import { useState } from "react";
import Style from "./HeaderProfile.module.css";
import { useRecoilValue } from "recoil";
import { loginState, userDataState } from "../../../store/auth";
import ProfileDropdown from "./ProfileDropdown";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const HeaderProfile = () => {
  const [dropdownView, setDropdownView] = useState(false);
  const isUserData = useRecoilValue(userDataState);
  const isLogin = useRecoilValue(loginState);

  const openDropdown = () => {
    setDropdownView(!dropdownView);
  };

  return (
    <>
      {isLogin ? (
        <div className={Style.profileContainer}>
          <img
            className={Style.defaultPicture}
            src={`${process.env.PUBLIC_URL}/img/test_img.jpg`}
            alt="default_profile"
            onClick={openDropdown}
          ></img>
          <div className={Style.dropdownContainer}>
            {dropdownView && <ProfileDropdown className={Style.MenuItem} />}
          </div>
          <p>{isUserData.displayName}</p>
        </div>
      ) : (
        <div className={Style.buttonContainer}>
          <Link to="/login">
            <Button
              variant="contained"
              sx={{
                fontSize: 12,
                backgroundColor: "#e3ecf3",
                color: "#1976D2",
                ":hover": {
                  color: "#e3ecf3",
                },
              }}
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="contained" sx={{ fontSize: 12 }}>
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};
export default HeaderProfile;
