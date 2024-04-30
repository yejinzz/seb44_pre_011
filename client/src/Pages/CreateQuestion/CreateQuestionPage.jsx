import { useRecoilValue } from "recoil";
import style from "./CreateQuestionPage.module.css";
import { userDataState } from "../../store/atom/authState";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useInputs from "../../hooks/useInputs";
import { postquestion } from "../../function/api";
import CreateQuestionForm from "../../components/form/createQ/CreateQuestionForm";

const CreateQuestionPage = () => {
  const userInfo = useRecoilValue(userDataState);
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const { inputRef, form, validationMsg, handleValidationMsg, handleValue } =
    useInputs({ title: "", tag: "" });

  const checkTitle = () => {
    if (form.title.length < 15) {
      handleValidationMsg("title", "❗️제목은 15자 이상이어야 합니다.");
      return false;
    } else {
      handleValidationMsg("title", "");
      return true;
    }
  };

  const submitQuestion = (e) => {
    e.preventDefault();
    if (checkTitle()) {
      const data = {
        memberId: userInfo.memberId,
        displayName: userInfo.displayName,
        title: form.title,
        content: content,
        tag: form.tag,
      };

      postquestion(data)
        .then((res) => {
          console.log(res);
          navigate("/questions");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } else {
      alert("필드를 기입해주세요!");
    }
  };

  return (
    <main className={style.createQ__container}>
      <section className={style.createQ__section}>
        <div className={style.createQ__title}>
          <h1>Ask a public question</h1>
        </div>
        <div className={style.tipsContainer}>
          <h2>Writing a good question</h2>
          <p>{tipdata.content}</p>
          <h3>Steps</h3>
          <ul className={style.tipLists}>
            {tipdata.tipList.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
        <CreateQuestionForm
          onSubmit={submitQuestion}
          inputRef={inputRef}
          handleValue={handleValue}
          validationMsg={validationMsg}
          handleValidationMsg={handleValidationMsg}
          content={content}
          setContent={setContent}
        />
      </section>
    </main>
  );
};

export default CreateQuestionPage;

const tipdata = {
  content:
    "You’re ready to ask a programming-related question and this form will help guide you through the process.\n Looking to ask a non-programming question? See the topics here to find a relevant site.",
  tipList: [
    "Summarize your problem in a one-line title.",
    "Describe your problem in more detail.",
    "Describe what you tried and what you expected to happen.",
    "Add “tags” which help surface your question to members of the community.",
    "Review your question and post it to the site.",
  ],
};
