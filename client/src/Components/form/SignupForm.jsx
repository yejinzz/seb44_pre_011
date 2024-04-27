import style from "./SignupForm.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../button/Button";
import useInputs from "../../hooks/useInputs";
import SignInput from "./SignInput";

const SignupForm = () => {
  const navigate = useNavigate();

  const { inputRef, form, validationMsg, handleValidationMsg, handleValue } =
    useInputs({
      displayName: "",
      email: "",
      password: "",
    });

  // 필드 입력값 체크
  const checkDisplayName = () => {
    if (!form.displayName) {
      handleValidationMsg("displayName", "❗️ 닉네임을 입력해주세요.");
      return false;
    } else {
      handleValidationMsg("displayName", "");
      return true;
    }
  };

  const checkEmail = () => {
    if (!form.email) {
      handleValidationMsg("email", "❗️ 이메일을 입력해주세요.");
      return false;
    } else {
      handleValidationMsg("email", "");
      return true;
    }
  };

  const checkPassword = () => {
    const regExpPwd =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!form.password) {
      handleValidationMsg("password", "❗️ 비밀번호를 입력해주세요.");
      return false;
    } else if (!regExpPwd.test(form.password)) {
      handleValidationMsg(
        "password",
        "❗️ 최소 8자, 하나의 이상의 대소문자, 숫자, 특수문자를 포함해야 합니다."
      );
      return false;
    } else {
      handleValidationMsg("password", "");
      return true;
    }
  };

  // form 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    checkDisplayName();
    checkEmail();
    checkPassword();

    const validation = checkDisplayName() && checkEmail() && checkPassword();

    if (validation) {
      axios
        .post(
          "http://ec2-3-34-211-22.ap-northeast-2.compute.amazonaws.com:8080/members",
          { ...form }
        )
        .then((res) => {
          console.log(res);
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 409) {
            handleValidationMsg("email", "❗️ 이미 사용중인 이메일 입니다.");
          }
        });
    }
  };

  return (
    <form className={style.signupForm} onSubmit={handleSubmit}>
      <SignInput
        type="text"
        name="displayName"
        onChange={handleValue}
        inputRef={(el) => (inputRef.current[0] = el)}
        errMsg={validationMsg.displayName}
      />

      <SignInput
        type="email"
        name="email"
        onChange={handleValue}
        inputRef={(el) => (inputRef.current[1] = el)}
        errMsg={validationMsg.email}
      />

      <SignInput
        type="password"
        name="password"
        onChange={handleValue}
        inputRef={(el) => (inputRef.current[2] = el)}
        errMsg={validationMsg.password}
      />

      <Button type="submit">Sign Up</Button>
      <p className={style.note}>
        By clicking “Sign up”, you agree to our terms of service and acknowledge
        that you have read and understand our privacy policy and code of
        conduct.
      </p>
    </form>
  );
};

export default SignupForm;
