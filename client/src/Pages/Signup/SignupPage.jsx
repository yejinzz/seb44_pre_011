import { Link } from "react-router-dom";
import Style from "./SignupPage.module.css";
import OauthButton from "../../Components/Oauth/OauthButton";
import SignupForm from "../../Components/form/SignupForm";

const SignupPage = () => {
  return (
    <>
      <div className={Style.signUpContainer}>
        <HeadLine />
        <div className={Style.signUpForm}>
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
      </div>
    </>
  );
};

export default SignupPage;

const HeadLine = () => {
  const headLineArr = [
    {
      id: 1,
      src: `${process.env.PUBLIC_URL}/img/headline_icon1.svg`,
      text: "Get unstuck — ask a question",
    },
    {
      id: 2,
      src: `${process.env.PUBLIC_URL}/img/headline_icon2.svg`,
      text: "Unlock new privileges like voting and commenting",
    },
    {
      id: 3,
      src: `${process.env.PUBLIC_URL}/img/headline_icon3.svg`,
      text: "Save your favorite questions, answers, watch tags, and more",
    },
    {
      id: 4,
      src: `${process.env.PUBLIC_URL}/img/headline_icon4.svg`,
      text: "Earn reputation and badges",
    },
  ];

  return (
    <div className={Style.HeadLineContainer}>
      <h2 className={Style.HeadLineTitle}>Join the Stack Overflow community</h2>
      {headLineArr.map((headLine, index) => (
        <div key={index} className={Style.listItem}>
          <img src={headLine.src} alt={`headline_icon${headLine.id}`} />
          {headLine.text}
        </div>
      ))}
      <div className={Style.Link}>
        Collaborate and share knowledge with a private group for FREE.
        <a
          href="https://stackoverflow.co/teams/?utm_source=so-owned&utm_medium=product&utm_campaign=free-50&utm_content=public-sign-up"
          target="_blank"
          rel="noreferrer"
        >
          Get Stack Overflow for Teams free for up to 50 users.
        </a>
      </div>
    </div>
  );
};
