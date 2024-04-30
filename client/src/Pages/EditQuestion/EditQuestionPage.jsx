import React, { useEffect, useState } from "react";
import style from "./EditQuestionPage.module.css";
import { useNavigate } from "react-router-dom";
import useInputs from "../../hooks/useInputs";
import CreateQuestionForm from "../../components/form/createQ/CreateQuestionForm";
import { editQuestion, getquestion } from "../../function/api";

const EditQuestionPage = () => {
  const navigate = useNavigate();
  const questionId = new URLSearchParams(window.location.search).get("id");

  const [editContent, setEditContent] = useState("");
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

  const handleSavaEdit = (e) => {
    e.preventDefault();
    if (checkTitle()) {
      editQuestion(questionId, {
        title: form.title,
        content: editContent,
      })
        .then((res) => {
          console.log(res);
          navigate(`/questions/read?id=${questionId}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("필드를 기입해주세요!");
    }
  };

  useEffect(() => {
    // fetch("/data/question.json")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const foundItem = data.find(
    //       (item) => item.questionId === Number(questionId)
    //     );

    //     console.log(foundItem);
    //     inputRef.current[0].value = foundItem.title;
    //     setEditContent(foundItem.content);
    //   });

    getquestion(questionId)
      .then((response) => {
        inputRef[0].current.value = response.data.data.title;
        setEditContent(response.data.data.content);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className={style.editQuesContainer}>
        <div className={style.editQuesWrapper}>
          <h1>Edit your question</h1>

          <CreateQuestionForm
            onSubmit={handleSavaEdit}
            inputRef={inputRef}
            handleValue={handleValue}
            validationMsg={validationMsg}
            content={editContent}
            setContent={setEditContent}
          />
        </div>
      </div>
    </>
  );
};

export default EditQuestionPage;
