import style from "./CreateQuestionPage.module.css";
import CreateQuestionForm from "../../components/form/CreateQuestionForm";

const CreateQuestionPage = () => {
  return (
    <>
      <div className={style.createQuesContainer}>
        <div className={style.createQuesWrapper}>
          <h1>Ask a public question</h1>
          <div className={style.tipsContainer}>
            <h2 className={style.tipTitle}>Writing a good question</h2>
            <p>
              You’re ready to ask a programming-related question and this form
              will help guide you through the process. Looking to ask a
              non-programming question? See the topics here to find a relevant
              site.
            </p>
            <p className={style.title}>Steps</p>
            <ul className={style.tipLists}>
              {tipStep.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
          <CreateQuestionForm />
        </div>
      </div>
    </>
  );
};

export default CreateQuestionPage;

const tipStep = [
  "Summarize your problem in a one-line title.",
  "Describe your problem in more detail.",
  "Describe what you tried and what you expected to happen.",
  "Add “tags” which help surface your question to members of the community.",
  "Review your question and post it to the site.",
];
