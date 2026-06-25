import { Outlet } from "react-router-dom";
import cls from "./MainLayout.module.css";

const currentYear = new Date().getFullYear();   
export const MainLayout = () => {
  return (
    <div className={cls.mainLayout}>
      <header>Header</header>
      <div className={cls.mainWraper}>
        <main className={cls.main}>
            <Outlet/>
        </main>
        <footer className={cls.footer}>
            React Questions Cards Application | {currentYear} <br />
            by Viktor S.
        </footer>
      </div>
    </div>
  );
};
