import OauthButton from "../../components/oauth/OauthButton";
import LoginForm from "../../components/form/LoginForm";
import style from "./LoginPage.module.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <>
      <div className={style.loginPageContainer}>
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/img/StackOverFlow_logo.svg`}
            className={style.logoImg}
            alt="StackOverFlow_logo"
          ></img>

          <OauthButton value="Log in with Google" />

          <LoginForm />
          <div className={style.loginNotice}>
            Don’t have an account?
            <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
