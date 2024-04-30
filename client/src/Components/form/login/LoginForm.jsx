import { useEffect, useState } from "react";
import style from "./LoginForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import { loginState } from "../../../store/atom/authState";
import Button from "../../button/Button";
import SignInput from "../input/SignInput";
import useInputs from "../../../hooks/useInputs";
import { login } from "../../../function/api";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const setLoginState = useSetRecoilState(loginState);
  const navigate = useNavigate();

  const { inputRef, form, validationMsg, handleValue } = useInputs({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      setErrorMessage("이메일과 비밀번호를 입력하세요.");
    } else {
      setErrorMessage("");
      return login(form)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            const authHeader = res.headers.authorization;
            const token = authHeader.split(" ")[1];
            const memberId = res.headers.memberid;
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("id", memberId);
            setLoginState(true);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          setErrorMessage("로그인에 실패했습니다.");
        });
    }
  };

  return (
    <form className={style.loginForm} onSubmit={handleSubmit}>
      <SignInput
        type="email"
        name="username"
        onChange={handleValue}
        errMsg={validationMsg.email}
        inputRef={(el) => (inputRef.current[0] = el)}
      />
      <SignInput
        type="password"
        name="password"
        onChange={handleValue}
        errMsg={validationMsg.password}
        inputRef={(el) => (inputRef.current[1] = el)}
      />
      {errorMessage && <p className={style.errMsg}>{errorMessage}</p>}
      <Button type="submit">Log in</Button>
    </form>
  );
};
export default LoginForm;
