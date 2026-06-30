import { useState, useEffect, useMemo } from "react";
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
  const [sortSelectValue, setSortSelectValue] = useState("");

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

  const cards = useMemo(() => {
    return questions.filter((data) =>
      data.question.toLowerCase().includes(searchValue.trim().toLowerCase()),
    );
  }, [questions, searchValue]);

  useEffect(() => {
    getQuestions(`react?${sortSelectValue}`);
  }, [sortSelectValue]);

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };
  const onSortSelectChangeHandler = (e) => {
    console.log(e.target.value);
    setSortSelectValue(e.target.value);
  };
  return (
    <>
      <div className={cls.controlsContainer}>
        <SearchImport value={searchValue} onChange={onSearchChangeHandler} />

        <select
          value={sortSelectValue}
          onChange={onSortSelectChangeHandler}
          className={cls.select}
        >
          <option value=""> sort by</option>
          <hr />
          <option value="_sort=level">level ASC</option>
          <option value="_sort=-level">level DESC</option>
          <option value="_sort=completed">completed ASC</option>
          <option value="_sort=-completed">completed DESC</option>
        </select> 
      </div>

      {isLoader && <Loader />}
      {error && <p>{error}</p>}
      {cards.length === 0 && <p className={cls.noCards}>No cards...</p>}

      <QuestionCardList cards={cards} />
    </>
  );
};
