import { Link } from "react-router-dom";
import Style from "./SignupPage.module.css";
import OauthButton from "../../components/oauth/OauthButton";
import SignupForm from "../../components/form/signup/SignupForm";
import HeadLine from "../../components/headLine/HeadLine";

const SignupPage = () => {
  return (
    <main className={Style.signup__container}>
      <HeadLine />
      <div className={Style.signup__formWrap}>
        <img
          src={`${process.env.PUBLIC_URL}/img/StackOverFlow_logo.svg`}
          className={Style.logoImg}
          alt="StackOverFlow_logo"
        ></img>
        <OauthButton value="Sign up with Google" />
        <SignupForm />
        <p>
          Already have an account?
          <Link to="/login">Log in</Link>
        </p>
        <p>
          Are you an employer?
          <a href="https://talent.stackoverflow.com/users/login">
            Sign up on Talent
          </a>
        </p>
      </div>
    </main>
  );
};

export default SignupPage;
