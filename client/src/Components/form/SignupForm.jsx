import { useRef, useState } from "react";
import style from "./SignupForm.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

const SignupForm = () => {
  const [memberData, setMemberData] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [pwdErrMsg, setPwdErrMsg] = useState("");
  const [nameErrMsg, setNameErrMsg] = useState("");

  const emailValRef = useRef(null);
  const pwdValRef = useRef(null);
  const nameValRef = useRef(null);

  const regExpPwd =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const navigate = useNavigate();

  const handleEmailValue = () => {
    let emailValue = emailValRef.current.value;
    setMemberData({ ...memberData, email: emailValue });
  };
  const handlePwdValue = () => {
    let pwdValue = pwdValRef.current.value;
    setMemberData({ ...memberData, password: pwdValue });
  };
  const handleNameValue = () => {
    let nameValue = nameValRef.current.value;
    setMemberData({ ...memberData, displayName: nameValue });
  };

  const postData = () => {
    if (!emailErrMsg && !pwdErrMsg && !nameErrMsg) {
      axios
        .post(
          "http://ec2-3-34-211-22.ap-northeast-2.compute.amazonaws.com:8080/members",
          { ...memberData }
        )
        .then((res) => {
          console.log(res);
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 409) {
            setEmailErrMsg("❗️ 이미 사용중인 이메일 입니다.");
          }
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleEmailValue();
    handlePwdValue();
    handleNameValue();

    if (memberData.email === "") {
      setEmailErrMsg("❗️ 이메일을 입력해주세요.");
    } else {
      setEmailErrMsg("");
    }

    if (memberData.password === "") {
      setPwdErrMsg("❗️ 비밀번호를 입력해주세요.");
    } else if (!regExpPwd.test(memberData.password)) {
      setPwdErrMsg(
        "❗️ 최소 8자, 하나의 이상의 대소문자, 숫자, 특수문자를 포함해야 합니다."
      );
    } else {
      setPwdErrMsg("");
    }

    if (memberData.displayName === "") {
      setNameErrMsg("❗️ 닉네임을 입력해주세요.");
    } else {
      setNameErrMsg("");
    }

    return postData();
  };

  return (
    <form className={style.signupForm}>
      <div className={style.fieldBox}>
        <label className={style.title}>Display Name</label>
        <input type="text" onChange={handleNameValue} ref={nameValRef} />
        {nameErrMsg !== "" && <p className={style.errMsg}>{nameErrMsg}</p>}
      </div>
      <div className={style.fieldBox}>
        <label className={style.title}>Email</label>
        <input type="email" onChange={handleEmailValue} ref={emailValRef} />
        {emailErrMsg !== "" && (
          <div className={style.errMsg}>{emailErrMsg}</div>
        )}
      </div>
      <div className={style.fieldBox}>
        <label className={style.title}>Password</label>
        <input type="password" onChange={handlePwdValue} ref={pwdValRef} />
        {pwdErrMsg !== "" && <div className={style.errMsg}>{pwdErrMsg}</div>}
      </div>

      <Button
        className={style.button}
        type="submit"
        onClick={handleSubmit}
        variant="contained"
        sx={{ fontSize: 14, width: "100%", height: "40px" }}
      >
        Sign Up
      </Button>
      <p className={style.note}>
        By clicking “Sign up”, you agree to our terms of service and acknowledge
        that you have read and understand our privacy policy and code of
        conduct.
      </p>
    </form>
  );
};

export default SignupForm;
