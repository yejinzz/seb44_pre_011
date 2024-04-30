import { Link } from "react-router-dom";
import style from "./Profile.module.css";
import Button from "../../button/Button";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";

const Profile = ({ user, memberId, displayName }) => {
  const id = sessionStorage.getItem("id");
  console.log(window.location.pathname);
  return (
    <div className={style.profile__box}>
      <div className={style.profile__wrap}>
        {user.userImage ? (
          <img
            alt="user"
            src={user.userImage}
            id={style.user_image}
            className={style.margin_right}
          />
        ) : (
          <PersonIcon sx={{ width: "128px", height: "128px", color: "#ccc" }} />
        )}
        <div className={style.profile__userInfo}>
          <span>{displayName}</span>
          <span>
            <EmailIcon sx={{ color: "#9298a1", fontSize: "18px" }} />
            {user.email}
          </span>
        </div>
      </div>
      {!window.location.pathname.startsWith("/users/edit/") &&
        memberId === id && (
          <div>
            <Link to={`/users/edit/${id}`}>
              <Button>
                <EditIcon />
                Edit profile
              </Button>
            </Link>
          </div>
        )}
    </div>
  );
};

export default Profile;
