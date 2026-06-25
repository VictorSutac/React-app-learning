import { useState } from "react";
import { Button } from "./Button/Button";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const setCounterHandler = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 4);
  };

  return(
  <Button onClick={setCounterHandler}>Count is {count}</Button>
  )
};
