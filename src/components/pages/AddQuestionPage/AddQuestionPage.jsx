import { useActionState } from "react";
import { toast } from "react-toastify";
import { delayFn } from "../../../helper/delayFn";
import cls from "./AddQuestionPage.module.css";
import { Button } from "../../Button";
import { API_URL } from "../../../constants";
import { Loader } from "../../Loader";
const createCardAction = async (_prevState, formData) => {
  try {
    await delayFn();
    const newQuestion = Object.fromEntries(formData);
    const resources = newQuestion.resources.trim();
    const isClearForm = newQuestion.clearForm; // formData.get("clearForm")

    const response = await fetch(`${API_URL}/react`, {
      method: "POST",
      body: JSON.stringify({
        question: newQuestion.question,
        answer: newQuestion.answer,
        description: newQuestion.description,
        resources: resources.length ? resources.split(",") : [],
        level: Number(newQuestion.level),
        completed: false,
        editDate: undefined,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const question = response.json();
    toast.success("Card created successfully");

    return isClearForm ? {} : question;
  } catch (error) {
    toast.error(error.message);
    return {};
  }
};
const AddQuestionPage = () => {
  const [formState, formAction, isPending] = useActionState(createCardAction, {
    clearForm: true,
  });
  return (
    <>
      {isPending && <Loader />}

      <h1 className={cls.formTitle}>Add new question</h1>

      <div className={cls.formContainer}>
        <form action={formAction} className={cls.form}>
          <div className={cls.formControl}>
            <label htmlFor="questionField">Question:</label>
            <textarea
              defaultValue={formState.question}
              name="question"
              id="questionField"
              cols="30"
              rows="2"
              required
              placeholder="please enter a question"
            />
          </div>
          <div className={cls.formControl}>
            <label htmlFor="shortAnswerField">Short Answer:</label>
            <textarea
              defaultValue={formState.answer}
              name="answer"
              id="shortAnswerField"
              cols="30"
              rows="2"
              required
              placeholder="please enter a short answer"
            />
          </div>
          <div className={cls.formControl}>
            <label htmlFor="descriptionField">Description:</label>
            <textarea
              defaultValue={formState.description}
              name="description"
              id="descriptionField"
              cols="30"
              rows="5"
              required
              placeholder="please enter a full description"
            />
          </div>
          <div className={cls.formControl}>
            <label htmlFor="resourcesField">Resources:</label>
            <textarea
              defaultValue={formState.resources}
              name="resources"
              id="resourcesField"
              cols="30"
              rows="2"
              placeholder="please enter resources separated by commas"
            />
          </div>

          <div className={cls.formControl}>
            <label htmlFor="levelField">Level:</label>
            <select name="level" id="levelField" defaultValue={formState.level}>
              <option disabled>Question level</option>
              <hr />
              <option value="1">1 - easy</option>
              <option value="2">2 - medium</option>
              <option value="3">3 - hard</option>
            </select>
          </div>

          <label htmlFor="clearFormField" className={cls.clearFormControl}>
            <input
              className={cls.checkbox}
              type="checkbox"
              name="clearForm"
              id="clearFormField"
              defaultChecked={formState.clearForm}
            />
            <span>Clear form after submission?</span>
          </label>
          <Button isDisable={isPending}>Add question</Button>
        </form>
      </div>

    </>
  );
};


export default AddQuestionPage;