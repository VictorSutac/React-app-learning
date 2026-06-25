import cls from "./HomePage.module.css";
import { QuestionCard } from "../../QuestionCard/QuestionCard";
export const HomePage = () => {
    return (
        <div className={cls.homePage}>
            HomePage
            <QuestionCard />
        </div>
    );
};