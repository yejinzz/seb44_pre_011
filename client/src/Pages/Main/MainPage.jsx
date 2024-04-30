import React from "react";
import { useState, useEffect } from "react";

import Navigation from "../../components/navigation/Navigation";
import CustomPagination from "../../components/pagination/CustomPagination";
import Questions from "../../components/questions/Questions";
import style from "./MainPage.module.css";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "../../store/atom/authState";
import Button from "../../components/button/Button";
import SidePanel from "../../components/sidePanel/SidePanel";
import { getQuestions } from "../../function/api";

const MainPage = () => {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 15;

  const [data, setData] = useState([]);
  const isLogin = useRecoilValue(loginState);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch("/data/question.json")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setData(data);
    //   });
    getQuestions()
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleAskButton = () => {
    if (isLogin) {
      navigate("/questions/ask");
    } else {
      navigate("/login");
    }
  };

  return (
    <main id={style.main}>
      <Navigation />
      <section className={style.mainSection}>
        <div id={style.questionHead}>
          <div className={style.questionHead__top}>
            <h1>All Questions</h1>
            <Button onClick={handleAskButton}>Ask Question</Button>
          </div>
          <p className={style.questionHead__result}>{data.length} questions</p>
          {data.slice(offset, offset + 15).map((obj) => (
            <Questions
              key={obj.questionId}
              title={obj.title}
              content={obj.content}
              questionId={obj.questionId}
              createdAt={obj.createdAt}
              displayName={obj.displayName}
            />
          ))}
        </div>

        <CustomPagination
          array={data}
          currentPage={page}
          setCurrentPage={setPage}
          pageSize={15}
        />
      </section>
      <div className={style.sidePanelWrap}>
        <SidePanel />
      </div>
    </main>
  );
};

export default MainPage;
