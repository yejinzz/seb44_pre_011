import { Link, NavLink, useParams } from "react-router-dom";
import style from "./ProfileNav.module.css";

const ProfileNav = ({ tab, memberId, displayName }) => {
  return (
    <nav className={style.profile__btnWrap}>
      <Link
        to={`/users/${memberId}/${displayName}?tab=questions`}
        className={({ isActive }) =>
          `${style.btn_sub} ${isActive ? style.selected : ""}`
        }
      >
        <button
          className={`${style.btn_sub} ${
            tab === "questions" ? style.selected : ""
          }`}
        >
          Questions
        </button>
      </Link>

      <Link to={`/users/${memberId}/${displayName}?tab=answers`}>
        <button
          className={`${style.btn_sub} ${
            tab === "answers" ? style.selected : ""
          }`}
        >
          Answers
        </button>
      </Link>
    </nav>
  );
};

export default ProfileNav;
