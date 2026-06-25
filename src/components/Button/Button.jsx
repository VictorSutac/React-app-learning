import cls from "./Button.module.css";


export const Button = (props) => {
  return (
   
    <button 
      className={`${cls.btn} ${props.isActive ? cls.active : ""}`}
      onClick={props.onClick} disabled={props.isDisable}
    >
      {props.children}
    </button>
  );
};
