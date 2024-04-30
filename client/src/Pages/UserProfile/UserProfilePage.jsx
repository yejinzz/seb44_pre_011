import React, { useEffect, useState } from "react";
import styles from "./UserProfilePage.module.css";
import { useLocation, useParams } from "react-router-dom";
import { getList, getQuestions, getUser } from "../../function/api";
import Aside from "../../components/navigation/Navigation";
import CustomPagination from "../../components/pagination/CustomPagination";
import ProfileNav from "../../components/navigation/userProfile/ProfileNav";
import UserDetail from "../../components/user/userDetail/UserDetail";
import Profile from "../../components/user/profile/Profile";

const UserProfilePage = () => {
  const { memberId, displayName } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get("tab");
  const [user, setUser] = useState({
    createdAt: "22",
    displayName: "예진",
    email: "yejin@naver.com",
    memberId: 4,
    modifiedAt: "22",
  });
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        await getUser(memberId).then((res) => {
          setUser(res.data.data);
        });
        if (tab === "questions") {
          await getList(tab, memberId).then((res) => {
            setItems(res.data);
          });
        } else {
          const arr_1 = [];
          await getList(tab, memberId).then((res) => {
            res.data.forEach((answer) => {
              if (!arr_1.includes(answer.questionId)) {
                arr_1.push(answer.questionId);
              }
            });
          });
          await getQuestions().then((res) => {
            setItems(
              res.data.filter((question) => arr_1.includes(question.questionId))
            );
          });
        }
      } catch (error) {
        console.error("Error getting user Information", error);
      }
    })();
  }, [tab]);

  return (
    <main className={styles.profile__container}>
      <Aside />
      <section className={styles.profile__section}>
        <Profile user={user} memberId={memberId} displayName={displayName} />

        <div className={styles.profile__content}>
          <ProfileNav tab={tab} memberId={memberId} displayName={displayName} />
          <UserDetail items={items} currentPage={currentPage} tab={tab} />
        </div>

        <CustomPagination
          array={items}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={15}
        />
      </section>
    </main>
  );
};

export default UserProfilePage;
