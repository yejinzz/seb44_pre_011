import styles from "./EditProfile.module.css";
import Aside from "../../components/navigation/Navigation";
import Profile from "../../components/user/profile/Profile";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../store/atom/authState";
import EditProfileForm from "../../components/form/editProfile/EditProfileForm";

const EditProfile = () => {
  const userInfo = useRecoilValue(userDataState);

  return (
    <main className={styles.editP__container}>
      <Aside />
      <section className={styles.editP__section}>
        <Profile
          user={userInfo}
          memberId={userInfo.memberId}
          displayName={userInfo.displayName}
        />
        <h1>Edit your profile</h1>
        <div className={styles.editP__form_wrap}>
          <EditProfileForm userInfo={userInfo} />
        </div>
      </section>
    </main>
  );
};

export default EditProfile;
