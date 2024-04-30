import style from "./EditPInput.module.css";

const EditPInput = ({
  label,
  type,
  name,
  inputRef,
  onChange,
  value = null,
  defaultValue = null,
}) => {
  return (
    <div className={style.editP__field}>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        ref={inputRef}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default EditPInput;
