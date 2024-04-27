import style from "./SignInput.module.css";

const SignInput = ({ type, name, inputRef, errMsg, onChange }) => {
  return (
    <div className={style.fieldBox}>
      <label className={style.title}>{name}</label>
      <input type={type} name={name} ref={inputRef} onChange={onChange} />
      {errMsg && <p className={style.errMsg}>{errMsg}</p>}
    </div>
  );
};

export default SignInput;
