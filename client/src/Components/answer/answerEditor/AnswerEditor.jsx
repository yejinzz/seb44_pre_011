import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { loginState, userDataState } from "../../../store/atom/authState";
import style from "./AnswerEditor.module.css";
import TextEditor from "../../editor/TextEditor";
import { Link } from "react-router-dom";
import Button from "../../button/Button";
import { postAnswer } from "../../../function/api";

const AnswerEditor = () => {
  const isLogin = useRecoilValue(loginState);
  const userdata = useRecoilValue(userDataState);
  const [text, setText] = useState("");

  const submitAnswer = () => {
    if (text.length > 20) {
      const data = {
        memberId: userdata.memberId,
        questionId: document.location.search.slice(4),
        content: text,
      };

      postAnswer(data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      setText("");
      window.location.reload();
    }
  };

  return (
    <>
      {isLogin ? (
        <div id={style.answer}>
          <span id={style.answertitle}>Your Answer</span>
          <TextEditor text={text} setText={setText} height="200px" />
          <Link to={`/questions/read?id=${document.location.search.slice(4)}`}>
            <Button onClick={submitAnswer}>Post Your Answer</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className={style.loginNotice}>
            <p>
              ❗️To answer a question, you must either sign up for an account
            </p>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default AnswerEditor;
