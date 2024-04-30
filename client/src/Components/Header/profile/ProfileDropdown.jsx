import React from "react";
import { NavLink } from "react-router-dom";
import Style from "./ProfileDropdown.module.css";
import { useSetRecoilState } from "recoil";
import { loginState } from "../../../store/atom/authState";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../../store/atom/authState";

const ProfileDropdown = () => {
  const setLoginState = useSetRecoilState(loginState);

  const handleLogout = () => {
    sessionStorage.removeItem("token"); // 토큰 삭제
    sessionStorage.removeItem("id"); //id 삭ㅔ
    setLoginState(false);
  };

  const isUserData = useRecoilValue(userDataState);

  return (
    <ul className={Style.menuContainer}>
      <li className={Style.menuItem}>
        <NavLink
          to={`/users/${isUserData.memberId}/${isUserData.displayName}?tab=questions`}
        >
          My page
        </NavLink>
      </li>
      <li className={Style.menuItem}>
        <NavLink to={`/users/edit/${isUserData.memberId}`}>
          Edit Profile
        </NavLink>
      </li>
      <li className={Style.menuItem} onClick={handleLogout}>
        <NavLink to="/">Logout</NavLink>
      </li>
    </ul>
  );
};
export default ProfileDropdown;
