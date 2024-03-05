import Button from "@mui/material/Button";
import Editor from "../../Components/Editor/Editor";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../store/auth";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./CreateQuestionForm.module.css";

const CreateQuestionForm = () => {
  const [title, setTitle] = useState("");
  const [titleMsg, setTitleMsg] = useState("");
  const [text, setText] = useState("");
  const [tag, setTag] = useState("");

  const userInfo = useRecoilValue(userDataState);
  const titleRef = useRef(null);
  const navigate = useNavigate();

  const Title = () => {
    // let titleValue = e.target.value;
    let titleValue = titleRef.current.value;
    setTitle(titleValue);

    if (title.length < 15) {
      setTitleMsg("❗️제목은 15자 이상이어야 합니다.");
    } else {
      setTitle(titleValue);
      setTitleMsg("");
    }
  };

  const Tag = (e) => {
    let tagValue = e.target.value;

    if (tagValue !== "") {
      setTag(tagValue);
    }
  };

  const submitQuestion = () => {
    Title();
    if (!titleMsg && text.length >= 20) {
      axios({
        url: "http://ec2-3-34-211-22.ap-northeast-2.compute.amazonaws.com:8080/questions",
        method: "post",
        data: {
          memberId: userInfo.memberId,
          displayName: userInfo.displayName,
          title: title,
          content: text,
          tag: tag,
        },
      })
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
    <form id={style.questionForm}>
      <div className={style.fieldBox}>
        <label className={style.title}>Title</label>
        <p className={style.subTitle}>
          Be specific and imagine you’re asking a question to another person.
        </p>
        <input
          type="text"
          onChange={Title}
          ref={titleRef}
          placeholder="e.g. Is there an R function for finding the index of an element in a vector? "
        />
        <p className={style.errMsg}>{titleMsg}</p>
      </div>

      <div className={style.fieldBox}>
        <label className={style.title}>
          What are the details of your problem?
        </label>
        <p className={style.subTitle}>
          Introduce the problem and expand on what you put in the title. Minimum
          20 characters.
        </p>
        <div className={style.contentEditor}>
          <Editor text={text} setText={setText} />
        </div>
      </div>

      <div className={style.fieldBox}>
        <label className={style.title}>tags</label>
        <p className={style.subTitle}>
          Add up to 5 tags to describe what your question is about. Start typing
          to see suggestions.
        </p>
        <input
          type="text"
          onBlur={Tag}
          placeholder="e.g. (angular regex django) "
        />
      </div>
      <Button
        variant="contained"
        sx={{
          fontSize: 12,
          height: "40px",
        }}
        onClick={submitQuestion}
        disabled={""}
      >
        Submit
      </Button>
    </form>
  );
};

export default CreateQuestionForm;
