import {} from "react";
import cls from "./Button.module.css";

// const inlineStyles = {
//   backgroundColor: "lightblue",
//   padding: "10px",
//   borderRadius: "5px",
// }

const isPrimary = false;

export const Button = ({ children, onClick }) => {
  return (
    // <button className={isPrimary ? cls.primary : cls.btn} >
    //   Кнопка
    // </button>
    <button
      className={`${cls.btn} ${isPrimary ? cls.primary : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
