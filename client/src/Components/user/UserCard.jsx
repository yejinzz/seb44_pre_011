import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import style from "./UserCard.module.css";

const UserCard = ({ user, onClick = null }) => {
  return (
    <div className={style.user__card} onClick={onClick}>
      {user.userImage || user.profile_image ? (
        <img
          className={style.user__profile_image}
          src={user.userImage || user.profile_image}
          alt={`user${user.displayName || user.display_name}`}
        />
      ) : (
        <PersonIcon
          className={style.user__icon}
          sx={{
            width: "50px",
            height: "50px",
            marginRight: "10px",
            color: "white",
            bgcolor: "#ccc",
            borderRadius: "5px",
          }}
        />
      )}
      <div className={style.user__info}>
        <strong>{user.displayName || user.display_name}</strong>
        {/* <p>{user.createdAt.split("T")[0]}</p> */}
      </div>
    </div>
  );
};

export default UserCard;
