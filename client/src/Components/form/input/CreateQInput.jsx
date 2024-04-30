import TextEditor from "../../editor/TextEditor";
import style from "./CreateQInput.module.css";

const CreateQInput = ({
  name,
  title,
  subTitle,
  placeholder,
  onChange,
  errMsg,
  inputRef,
  text = null,
  setText = null,
}) => {
  return (
    <div className={style.fieldBox}>
      <label className={style.title}>{title}</label>
      <p className={style.subTitle}>{subTitle}</p>
      {inputRef ? (
        <>
          <input
            name={name}
            type="text"
            onChange={onChange}
            ref={inputRef}
            placeholder={placeholder}
          />
          {errMsg && <p className={style.errMsg}>{errMsg}</p>}
        </>
      ) : (
        <TextEditor text={text} setText={setText} />
      )}
    </div>
  );
};

export default CreateQInput;
