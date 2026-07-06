import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomePage } from "./components/pages/HomePage/HomePage";
import {NotFoundPage} from "./components/pages/NotFoundPage/NotFoundPage"
import { QuestionPage } from "./components/pages/QuestionPage";
import { AddQuestionPage } from "./components/pages/AddQuestionPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/forbidden" element={<div>forbidden</div>} />
          <Route path="/addquestion" element={<AddQuestionPage />} />
          <Route path="/questions/:id" element={<QuestionPage />} />

          <Route path="*" element={<NotFoundPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
