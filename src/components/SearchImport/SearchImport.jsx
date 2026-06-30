import cls from "./SearchImport.module.css";
import { useId } from "react";
import { SearchIcon } from "../icons";

export const SearchImport = ({ value, onChange }) => {
  const inputId = useId();

  return (
    <div className={cls.inputContainer}>
      <label htmlFor={inputId}>
        <SearchIcon  className={cls.searchIcon}/>
      </label>
      <input
        className={cls.input}
        placeholder="Search..."
        type="text"
        id={inputId}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
