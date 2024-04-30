import { useState } from "react";
import Style from "./HeaderProfile.module.css";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../../store/atom/authState";
import ProfileDropdown from "./ProfileDropdown";

const HeaderProfile = () => {
  const [dropdownView, setDropdownView] = useState(false);
  const isUserData = useRecoilValue(userDataState);

  const openDropdown = () => {
    setDropdownView(!dropdownView);
  };

  return (
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
      <p className={Style.displayName}>{isUserData.displayName}</p>
    </div>
  );
};
export default HeaderProfile;
