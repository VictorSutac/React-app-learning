import { useState, useEffect, useMemo, useRef } from "react";
import cls from "./HomePage.module.css";
import { QuestionCardList } from "../../QuestionCardList";
import { API_URL } from "../../../constants";
import { Loader } from "../../Loader";
import { delayFn } from "../../../helper/delayFn";
import { useFetch } from "../../../hooks/useFetch";
import { SearchImport } from "../../SearchImport";
import { Button } from "../../Button";
const DEFAULT_PER_PAGE = 10;
export const HomePage = () => {
  const [searchParams, setSearchParams] = useState(
    `?_page=1&_per_page=${DEFAULT_PER_PAGE}`,
  );
  const [questions, setQuestions] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");

  const controlsContainerRef = useRef();

  const getActivePageNumber = () =>
    questions.next === null ? questions.last : questions.next - 1;

  const [getQuestions, isLoader, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
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
    if (questions?.data) {
      if (searchValue.trim()) {
        return questions.data.filter((d) =>
          d.question.toLowerCase().includes(searchValue.trim().toLowerCase()),
        );
      } else {
        return questions.data;
      }
    }
    return [];
  }, [questions, searchValue]);

  const pagination = useMemo(() => {
    const totalCardsCount = questions?.pages || 0;

    return Array(totalCardsCount)
      .fill(0)
      .map((_, i) => i + 1);
  }, [questions]);

  useEffect(() => {
    getQuestions(`react${searchParams}`);
  }, [searchParams]);

  //поиск карточек
  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  //фильтрация
  const onSortSelectChangeHandler = (e) => {
    console.log(e.target.value);
    setSortSelectValue(e.target.value);
    setSearchParams(`?_page=1&_per_page=${DEFAULT_PER_PAGE}&${e.target.value}`);
  };

  const paginationHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      setSearchParams(
        `?_page=${e.target.textContent}&_per_page=${DEFAULT_PER_PAGE}&${sortSelectValue}`,
      );

      controlsContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className={cls.controlsContainer} ref={controlsContainerRef}>
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

      <QuestionCardList cards={cards} />
      {cards.length === 0 ? (
        <p className={cls.noCards}>No cards...</p>
      ) : (
        <div className={cls.paginationContainer} onClick={paginationHandler}>
          {pagination.map((value) => {
            return (
              <Button key={value} isActive={value === getActivePageNumber()}>
                {value}
              </Button>
            );
          })}
        </div>
      )}
    </>
  );
};
