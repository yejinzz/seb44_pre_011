import React, { useEffect, useState, useRef } from "react";
import style from "./EditQuestionPage.module.css";
import Button from "@mui/material/Button";
import Editor from "../../components/editor/Editor";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { questionIdState } from "../../store/auth";
import { useNavigate } from "react-router-dom";

const EditQuestionPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");

  const quesId = useRecoilValue(questionIdState);

  const editTitleRef = useRef(null);
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    const editTitleValue = e.target.value;
    setEditTitle(editTitleValue);
  };

  useEffect(() => {
    axios({
      url: `http://ec2-3-34-211-22.ap-northeast-2.compute.amazonaws.com:8080/questions/${quesId}`,
      method: "get",
      headers: {
        "ngrok-skip-browser-warning": "skip",
        value: true,
      },
    })
      .then((response) => {
        setTitle(response.data.data.title);
        setContent(response.data.data.content);
      })
      .catch((err) => console.log(err));
  });

  const handleSavaEdit = () => {
    axios({
      url: `http://ec2-3-34-211-22.ap-northeast-2.compute.amazonaws.com:8080/questions/${quesId}`,
      method: "PATCH",
      headers: {
        "ngrok-skip-browser-warning": "skip",
        value: true,
      },
      data: {
        title: editTitle,
        content: editText,
      },
    })
      .then((res) => {
        console.log(res);
        navigate(`/questions/read?id=${quesId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={style.editQuesContainer}>
        <div className={style.editQuesWrapper}>
          <h1>Edit your question</h1>

          <form id={style.editQuestionForm}>
            <div className={style.fieldBox}>
              <label className={style.title}>Title</label>
              <p className={style.subTitle}>
                Be specific and imagine you’re asking a question to another
                person.
              </p>
              <input
                type="text"
                defaultValue={title}
                className={style.title_div3_input}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector? "
                ref={editTitleRef}
                onChange={handleTitleChange}
              />
            </div>
            <div className={style.fieldBox}>
              <label className={style.title}>
                What are the details of your problem?
              </label>
              <p className={style.subTitle}>
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </p>
              <div className={style.contentEditor}>
                <Editor text={content} setText={setEditText} />
              </div>
            </div>
            <div className={style.fieldBox}>
              <label className={style.title}>tags</label>
              <p className={style.subTitle}>
                Add up to 5 tags to describe what your question is about. Start
                typing to see suggestions.
              </p>

              <input
                type="text"
                className={style.title_div3_input}
                placeholder="e.g. (angular regex django) "
              />
            </div>
            <Button
              onClick={handleSavaEdit}
              variant="contained"
              sx={{
                fontSize: 12,
                height: "40px",
              }}
            >
              Save Edit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditQuestionPage;
