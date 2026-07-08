import cls from "./EditQuestionPage.module.css";
import { useActionState } from "react";
import { Loader } from "../../Loader";
import { QuestionForm } from "../../QuestionForm";
import { delayFn } from "../../../helper/delayFn";
import { dateFormat } from "../../../helper/dateFormat";
import { toast } from "react-toastify";
import { API_URL } from "../../../constants";
import{useFetch} from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const editCardAction = async (_prevState, formData) => {
  try {
    await delayFn();
    const newQuestion = Object.fromEntries(formData);
    const resources = newQuestion.resources.trim();
    const isClearForm = newQuestion.clearForm; // formData.get("clearForm")
    const questionId = newQuestion.questionId;

    const response = await fetch(`${API_URL}/react/${questionId}`, {
      method: "PATCH",
      body: JSON.stringify({
        question: newQuestion.question,
        answer: newQuestion.answer,
        description: newQuestion.description,
        resources: resources.length ? resources.split(",") : [],
        level: Number(newQuestion.level),
        completed: false,
        editDate: dateFormat(new Date()),
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const question = await response.json();
    toast.success("The question was edited successfully");

    return isClearForm ? {} : question;
  } catch (error) {
    toast.error(error.message);
    return {};
  }
};

export const EditQuestion = ({ initialState = {} }) => {
  const [formState, formAction, isPending] = useActionState(editCardAction, {
    ...initialState,
    clearForm: false,
  });
  return (
    <>
      {isPending && <Loader />}
      <h1 className={cls.formTitle}>Edit question</h1>

      <div className={cls.formContainer}>
        <QuestionForm
          formAction={formAction}
          formState={formState}
          isPending={isPending}
          submitBtnText="Edit question"
        />
      </div>
    </>
  );
};
