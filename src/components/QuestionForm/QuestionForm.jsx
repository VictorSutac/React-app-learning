import cls from "./QuestionForm.module.css";
import { Button } from "../Button";

export const QuestionForm = ({
  formAction,
  formState,
  isPending,
  submitBtnText,
}) => {
  return (
    <form action={formAction} className={cls.form}>
      <input
        type="text"
        name="questionId"
        defaultValue={formState.id}
        hidden
      />
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
      <Button isDisable={isPending}>{submitBtnText}</Button>
    </form>
  );
};
