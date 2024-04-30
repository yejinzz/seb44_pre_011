import style from "./CreateQuestionForm.module.css";
import Button from "../../button/Button";
import CreateQInput from "../input/CreateQInput";

const CreateQuestionForm = ({
  onSubmit,
  inputRef,
  handleValue,
  validationMsg,
  content,
  setContent,
}) => {
  return (
    <form id={style.questionForm} onSubmit={onSubmit}>
      <CreateQInput
        name="title"
        title="Title"
        subTitle="Be specific and imagine you’re asking a question to another person."
        placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
        inputRef={(el) => (inputRef.current[0] = el)}
        onChange={handleValue}
        errMsg={validationMsg.title}
      />

      <CreateQInput
        name="content"
        title="What are the details of your problem?"
        subTitle="Introduce the problem and expand on what you put in the title. Minimum 20 characters."
        text={content}
        setText={setContent}
      />
      <CreateQInput
        name="tag"
        title="tags"
        subTitle="Add up to 5 tags to describe what your question is about. Start typing
        to see suggestions."
        placeholder="e.g. (angular regex django)"
        inputRef={(el) => (inputRef.current[1] = el)}
        onChange={handleValue}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CreateQuestionForm;
