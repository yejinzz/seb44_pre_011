import style from "./HeadLine.module.css";

const HeadLine = () => {
  return (
    <div className={style.headLine__container}>
      <h1 className={style.headLine__title}>
        Join the Stack Overflow community
      </h1>

      <ul className={style.headLine__lists}>
        {headLineArr.map((headLine, index) => (
          <li key={index} className={style.headLine__list}>
            <img src={headLine.src} alt={`headline_icon${headLine.id}`} />
            {headLine.text}
          </li>
        ))}
      </ul>

      <p className={style.headLine__link}>
        Collaborate and share knowledge with a private group for FREE.
        <a
          href="https://stackoverflow.co/teams/?utm_source=so-owned&utm_medium=product&utm_campaign=free-50&utm_content=public-sign-up"
          target="_blank"
          rel="noreferrer"
        >
          Get Stack Overflow for Teams free for up to 50 users.
        </a>
      </p>
    </div>
  );
};

export default HeadLine;
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
