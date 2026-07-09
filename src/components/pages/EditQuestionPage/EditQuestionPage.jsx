import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { API_URL } from "../../../constants";
import { Loader } from "../../Loader";
import { EditQuestion } from "../../pages/EditQuestionPage/EditQuestion";
export const EditQuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  const [featchQuestion, isQuestionLoading] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${id}`);
    const data = await response.json();

    setQuestion(data);
  });

  useEffect(() => {
    featchQuestion();
  }, []);
  return (
    <>
      {isQuestionLoading && <Loader />}

      {question && <EditQuestion initialState={question} />}
    </>
  );
};

export default EditQuestionPage;