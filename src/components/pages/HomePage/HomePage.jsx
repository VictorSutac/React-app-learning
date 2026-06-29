import { useState, useEffect } from "react";
import cls from "./HomePage.module.css";
import { QuestionCardList } from "../../QuestionCardList";
import { API_URL } from "../../../constants";
import { Loader } from "../../Loader";
import { delayFn } from "../../../helper/delayFn";
import { useFetch } from "../../../hooks/useFetch";
import { SearchImport } from "../../SearchImport";


export const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [getQuestions, isLoader, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const questions = await response.json();

    setQuestions(questions);
    return questions;
  });
  // const _getQuestions = async () => {
  //   try {
  //     setIsLoader(true);
  //     await delayFn();
  //     const response = await fetch(`${API_URL}/react`);
  //     const questions = await response.json();

  //     setQuestions(questions);
  //     console.log("questions", questions);
  //   } catch (error) {
  //     console.error(error);
  //   }finally {
  //     setIsLoader(false);
  //   }
  // };

  useEffect(() => {
    getQuestions("react");
  }, []);

  const onSearchChangeHandler = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div className={cls.controlsContainer}>
        <SearchImport value={searchValue} onChange={onSearchChangeHandler}/>
      </div>

      {isLoader && <Loader />}
      {error && <p>{error}</p>}

      <QuestionCardList cards={questions} />
    </>
  );
};
