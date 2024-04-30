import { useState } from "react";
import style from "./AnswerCard.module.css";
import TextEditor from "../../editor/TextEditor";
import { Link } from "react-router-dom";
import Button from "../../button/Button";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../../store/atom/authState";
import { editAnswer } from "../../../function/api";

const AnswerCard = ({ questionId, answer, setData }) => {
  const [editMode, setEditMode] = useState(false);
  const [answertext, setAnswertext] = useState("");

  const userdata = useRecoilValue(userDataState);

  const EditAnswer = (text) => {
    setAnswertext(text);
    setEditMode(true);
  };

  const EditSubmit = (answerid) => {
    const data = {
      content: answertext,
    };

    editAnswer(answerid, data)
      .then((response) => {
        setData(response.data.data);
        setEditMode(false);
      })
      .catch((err) => console.log(err));
    setAnswertext("");
    window.location.reload();
  };

  return (
    <div className={style.answerCard}>
      {editMode ? (
        <div>
          <TextEditor
            text={answertext}
            setText={setAnswertext}
            height="200px"
          />
          <Link to={questionId}>
            <Button onClick={() => EditSubmit(answer.answerId)}>
              Edit Your Answer
            </Button>
          </Link>
        </div>
      ) : (
        <div>
          <div
            className={style.answerContent}
            dangerouslySetInnerHTML={{ __html: answer.content }}
          ></div>
          <div className={style.answerBottom}>
            <button
              className={style.editButton}
              onClick={() => EditAnswer(answer.content)}
            >
              {userdata.memberId === answer.memberId ? "Edit" : null}
            </button>

            <div className={style.userCard}>
              <img
                src={process.env.PUBLIC_URL + "/img/test_img.jpg"}
                alt={`${answer.displayName} 프로필 이미지`}
              />
              {answer.displayName}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnswerCard;
