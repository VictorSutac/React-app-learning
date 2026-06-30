import cls from "./QuestionCard.module.css";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { Badge } from "../Badge";
export const QuestionCard = ({card}) => {
const navigate = useNavigate();
const levelVariant = card.level === 1 ? "primary" : card.level === 2 ? "warning" : "success";
const completedVariant = card.completed ? "success" : "primary";

  return (
    <div className={cls.card}>
      <div className={cls.cardLables}>
        <Badge variant={levelVariant}>Level: {card.level}</Badge>
        <Badge variant={completedVariant}>{card.completed ? "Completed" : "Not completed"}</Badge>
      </div> 

      <h5 className={cls.cardTitle}>{card.question}</h5>

      <div className={cls.cardAnswers}>
        <label>short answer</label>
        <p className={cls.cardAnswer}>
          {card.answer}
        </p>
      </div>

      <Button onClick={() => navigate(`/questions/${card.id}`)}>Answer</Button>
    </div>
  );
};
