import style from "./Button.module.css";

const Button = ({ children, onClick, btnType = "default" }) => {
  let buttonClass;
  switch (btnType) {
    case "default":
      buttonClass = style.default__button;
      break;
    case "other":
      buttonClass = style.other__button;
      break;
    default:
      buttonClass = style.common__button;
  }

  return (
    <button
      className={`${style.common__button} ${buttonClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
