import { useState } from "react";
import style from "./LoginForm.module.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import { loginState } from "../../store/auth";
import OauthButton from "../Oauth/OauthButton";

const LoginForm = () => {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const setLoginState = useSetRecoilState(loginState);
  const navigate = useNavigate();

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const loginRequestHandler = () => {
    if (!loginInfo.username || !loginInfo.password) {
      setErrorMessage("아이디와 비밀번호를 입력하세요.");
      return;
    }

    return axios
      .post(
        "http://ec2-3-34-211-22.ap-northeast-2.compute.amazonaws.com:8080/auth/login",
        loginInfo
      )

      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          const authHeader = res.headers.authorization;
          const token = authHeader.split(" ")[1];
          // axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
          const memberId = res.headers.memberid;
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("id", memberId);
          setLoginState(true);
          setErrorMessage("");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrorMessage("로그인에 실패했습니다.");
      });
  };

  return (
    <form className={style.loginForm} onSubmit={(e) => e.preventDefault()}>
      <div className={style.fieldBox}>
        <label>Email</label>
        <input
          className={style.input}
          type="email"
          onChange={handleInputValue("username")}
        />
      </div>
      <div className={style.fieldBox}>
        <label>Password</label>
        <input
          className={style.input}
          type="password"
          onChange={handleInputValue("password")}
        />
      </div>
      <Button
        //   className={style.button}
        variant="contained"
        sx={{ fontSize: 14, width: "100%", height: "40px" }}
        onClick={loginRequestHandler}
      >
        Log in
      </Button>
      {errorMessage ? (
        <div id="alert-message" data-testid="alert-message">
          {errorMessage}
        </div>
      ) : (
        ""
      )}
    </form>
  );
};
export default LoginForm;
