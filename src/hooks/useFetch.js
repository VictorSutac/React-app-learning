import { useState } from "react";
import { delayFn } from "../helper/delayFn";
import { toast } from "react-toastify";
export const useFetch = (callback) => {
  const [isLoader, setIsLoader] = useState(false);
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
      toast.error(error.message);
    } finally {
      setIsLoader(false);
    }
  };
  return [fetchFn, isLoader, error];
};
