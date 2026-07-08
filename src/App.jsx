import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomePage } from "./components/pages/HomePage/HomePage";
import { NotFoundPage } from "./components/pages/NotFoundPage/NotFoundPage";
import { QuestionPage } from "./components/pages/QuestionPage";
import { AddQuestionPageLazy } from "./components/pages/AddQuestionPage";
import { EditQuestionPage } from "./components/pages/EditQuestionPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/forbidden" element={<div>forbidden</div>} />
          <Route path="/addquestion" element={<AddQuestionPageLazy />} />
          <Route path="/questions/:id" element={<QuestionPage />} />
          <Route path="/editquestion/:id" element={<EditQuestionPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
