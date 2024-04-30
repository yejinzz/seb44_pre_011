import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./ReadQuestionPage.module.css";
import Aside from "../../components/navigation/Navigation";
import Button from "../../components/button/Button";
import SidePanel from "../../components/sidePanel/SidePanel";
import AnswerCard from "../../components/answer/answerCard/AnswerCard";
import AnswerEditor from "../../components/answer/answerEditor/AnswerEditor";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../store/atom/authState";
import { getAnswer, getquestion } from "../../function/api";

const ReadQuestionPage = () => {
  const userInfo = useRecoilValue(userDataState);
  const [data, setData] = useState({ createdAt: "00000000000" });
  const [answers, setAnswers] = useState([]);

  const questionId = new URLSearchParams(window.location.search).get("id");

  useEffect(() => {
    // fetch("/data/question.json")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const foundItem = data.find(
    //       (item) => item.questionId === Number(questionId)
    //     );
    //     setData(foundItem);
    //   });

    getquestion(questionId)
      .then((response) => setData(response.data.data))
      .catch((err) => console.log(err));

    // fetch("/data/answer.json")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const foundItemsArray = [];
    //     const foundItems = data.filter(
    //       (item) => item.questionId === Number(questionId)
    //     );
    //     foundItemsArray.push(...foundItems);

    //     setAnswers(foundItemsArray);
    //   });

    getAnswer(questionId)
      .then((response) => setAnswers(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className={style.readQ__container}>
      <Aside />
      <section className={style.readQ__section}>
        <div className={style.question__title}>
          <div>
            <h1>{data.title}</h1>

            <Link to="/questions/ask">
              <Button>Ask Question</Button>
            </Link>
          </div>
          <p>
            Asked {data.createdAt.slice(0, 10)} at{" "}
            {data.createdAt.slice(11, 16)}
          </p>
        </div>
        <div className={style.inner__container}>
          <div className={style.contents__wrap}>
            <article className={style.Content}>
              {userInfo.memberId === data.memberId && (
                <Link to={`/questions/edit?id=${questionId}`}>
                  <button>edit</button>
                </Link>
              )}

              <div>{data.content}</div>

              <ul id={style.taglist}>
                {["tag1", "tag2", "tag3"].map((el) => (
                  <li className={style.tag}>{el}</li>
                ))}
              </ul>
            </article>
            <article className={style.Answer}>
              <h1 className={style.answer__title}>Answer</h1>

              {answers.map((answer) => (
                <AnswerCard
                  questionId={questionId}
                  answer={answer}
                  setData={setData}
                />
              ))}
            </article>
            <div className={style.AnswerEditor}>
              <AnswerEditor />
            </div>
          </div>
          <SidePanel />
        </div>
      </section>
    </main>
  );
};

export default ReadQuestionPage;
