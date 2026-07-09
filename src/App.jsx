import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomePage } from "./components/pages/HomePage/HomePage";
import { NotFoundPage } from "./components/pages/NotFoundPage/NotFoundPage";
import { QuestionPage } from "./components/pages/QuestionPage";
import { AddQuestionPageLazy } from "./components/pages/AddQuestionPage";
import { EditQuestionPageLazy } from "./components/pages/EditQuestionPage";
import { AuthProvider } from "./auth/AuthProvider";
import { useAuth } from "./hooks/useAuth";
import { ForbiddenPage } from "./components/pages/ForbiddenPage";

const ProtectedRoutes = () => {
  const { isAuth } = useAuth();
  const location = useLocation();

 
  return isAuth ? <Outlet /> : <Navigate to="/forbidden" state={{ from: location.pathname }} replace />;
};
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />
            <Route path="/questions/:id" element={<QuestionPage />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/addquestion" element={<AddQuestionPageLazy />} />
              <Route path="/editquestion/:id" element={<EditQuestionPageLazy />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
