import React from "react";
import style from "./Questions.module.css";
import { useNavigate } from "react-router";

const Questions = ({ questionId, title, content, createdAt, displayName }) => {
  const navigate = useNavigate();
  const ReadQuestios = () => {
    navigate(`/questions/read?id=${questionId}`);
  };
  return (
    <div className={style.ques__card}>
      <h3 onClick={ReadQuestios}>{title}</h3>
      <div className={style.ques__content}>{content}</div>

      <div className={style.ques__bottom}>
        <ul className={style.ques__tagList}>
          {["tag1", "tag2", "tag3"].map((tag) => (
            <li className={style.tag}>{tag}</li>
          ))}
        </ul>

        <div className={style.ques__userInfo}>
          <img
            src={process.env.PUBLIC_URL + "/img/test_img.jpg"}
            alt={questionId}
          />
          <strong>{displayName}</strong>
          <span>
            {createdAt.slice(0, 10)} at {createdAt.slice(11, 16)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Questions;
