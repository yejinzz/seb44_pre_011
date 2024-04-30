import React from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css";

const Navigation = () => {
  const asideDatas = [
    {
      name: "Questions",
      path: "/",
      icon: <QuestionMarkIcon />,
    },
    {
      name: "Tags",
      path: "/tags",
      icon: <LocalOfferIcon />,
    },
    { name: "Users", path: "/users", icon: <PeopleAltIcon /> },
  ];
  return (
    <nav id={style.sideNav}>
      <p>public</p>
      <ul>
        {asideDatas.map((data, idx) => (
          <>
            <li>
              <NavLink
                to={data.path}
                className={({ isActive }) =>
                  `${style.asideButton} ${isActive ? style.active : ""}`
                }
              >
                {data.icon}
                <span>{data.name}</span>
              </NavLink>
            </li>
          </>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
