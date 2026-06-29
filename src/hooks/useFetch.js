import { useState } from "react";
import { delayFn } from "../helper/delayFn";

export const useFetch = (callback) => {
  const [isLoader, setIsLoader] = useState([]);
  const [error, setError] = useState("");

  const fetchFn = async (arg) => {
    try {
      setIsLoader(true);
      setError("");
      await delayFn();

      const response = await callback(arg);

      return response;
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoader(false);
    }
  };
  return [fetchFn, isLoader, error];
};
