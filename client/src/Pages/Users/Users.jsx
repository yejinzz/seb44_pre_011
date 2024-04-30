import React, { useEffect, useState } from "react";
import style from "./Users.module.css";
import { makeList } from "../../function/wrapperFunction";
import { getUsers } from "../../function/api";
import Aside from "../../components/navigation/Navigation";
import CustomPagination from "../../components/pagination/CustomPagination";
import { Link, useNavigate } from "react-router-dom";
import UserCard from "../../components/user/UserCard";
import SearchBar from "../../components/searchBar/SearchBar";
import axios from "axios";

const Users = () => {
  const navigation = useNavigate();
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getUsers().then((res) => {
      setUserList(res.data);
    });

    axios
      .get(
        `${process.env.REACT_APP_STACK_EXCHANGE}/users?pagesize=100&order=desc&sort=reputation&site=stackoverflow`
      )
      .then((res) => {
        setUserList(res.data.items);
      });
  }, []);

  return (
    <main className={style.users__container}>
      <Aside />
      <section className={style.users__section}>
        <div>
          <div className={style.users__head}>
            <h1>Users</h1>
            <div className={style.users__searchbar}>
              <SearchBar />
            </div>
          </div>
          <ul className={style.user__list}>
            {makeList(userList, currentPage, 30).map((user, idx) => (
              <li>
                {user.link ? (
                  <a href={user.link} target="_block">
                    <UserCard key={`user_${idx}`} user={user} />
                  </a>
                ) : (
                  <Link
                    to={`/users/${user.memberId}/${user.displayName}?tab=questions`}
                  >
                    <UserCard
                      key={`user_${idx}`}
                      user={user}
                      onClick={() =>
                        navigation(
                          `/users/${user.memberId}/${user.displayName}?tab=questions`
                        )
                      }
                    />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className={style.user__pagination}>
          <CustomPagination
            array={userList}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={30}
          />
        </div>
      </section>
    </main>
  );
};

export default Users;
