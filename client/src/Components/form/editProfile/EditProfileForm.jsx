import { useNavigate } from "react-router-dom";
import style from "./EditProfileForm.module.css";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { editProfile } from "../../../function/api";
import EditPInput from "../input/EditPInput";
import useInputs from "../../../hooks/useInputs";
import Button from "../../button/Button";

const EditProfileForm = ({ userInfo }) => {
  const navigate = useNavigate();
  const id = sessionStorage.getItem("id");
  const { inputRef, form, handleValue } = useInputs({
    displayName: "",
    email: "",
  });
  const [imageData, setImageData] = useState({
    image: userInfo?.image,
    uploadImage: "",
  });

  const saveEditedProfile = async () => {
    try {
      await editProfile(userInfo.memberId, form).then((res) => {
        navigate(`/users/${id}/${form.displayName}/?tab=questions`);
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className={style.editP__form} onSubmit={saveEditedProfile}>
      <div className={style.editP__image_field}>
        <label>Profile image</label>
        <div className={style.editP__image_wrap}>
          {imageData.image ? (
            <img src={imageData.image} alt="user" id={style.user_image} />
          ) : (
            <PersonIcon
              sx={{ width: "164px", height: "164px", color: "#ccc" }}
            />
          )}
          <Button btnType="other">
            Change picture
            <input
              hidden
              type="file"
              onChange={(event) => {
                setImageData({
                  image: URL.createObjectURL(event.target.files[0]),
                  uploadImage: event.target.files[0],
                });
              }}
            />
          </Button>
        </div>
      </div>

      <EditPInput
        label="Display Name"
        type="text"
        name="displayName"
        inputRef={(el) => (inputRef.current[0] = el)}
        onChange={handleValue}
        value={userInfo.displayName}
      />
      <EditPInput
        label="Email"
        type="email"
        name="email"
        inputRef={(el) => (inputRef.current[1] = el)}
        onChange={handleValue}
        defaultValue={userInfo.email}
      />

      <Button type="submit">Save profile</Button>
    </form>
  );
};

export default EditProfileForm;
