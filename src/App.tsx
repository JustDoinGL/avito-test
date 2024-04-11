import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "./hooks/redux";
import DefaultLayout from "./layouts/DefaultLayout";
import MainPage from "./pages/MainPage/MainPage";
import FilmPage from "./pages/FilmPage/FilmPage";
import { NeedAuth } from "./hoc/NeedAuth";
import { RequireAuth } from "./hoc/RequireAuth";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { SingUpPage } from "./pages/SingUpPage/SingUpPage";
import NotFoundPage from "./pages/404/NotFoundPage";

function App() {
  const { value: theme } = useAppSelector((state) => state.theme);

  return (
    <div className={`body ${theme === "dark" ? "dark-theme" : "light-theme"} `}>
      <Routes>
        <Route path={`/`} element={<DefaultLayout />}>
          <Route index element={<MainPage />} />
          <Route path={`/film/:id`} element={<FilmPage />} />
          <Route
            path={`/favorites`}
            element={
              <RequireAuth>
                <p>favorites</p>
              </RequireAuth>
            }
          />
          <Route
            path={`/random-film`}
            element={
              <RequireAuth>
                <p>ffff</p>
              </RequireAuth>
            }
          />

          <Route
            path="/auth"
            element={
              <NeedAuth>
                <AuthPage />
              </NeedAuth>
            }
          />

          <Route
            path="/login"
            element={
              <NeedAuth>
                <SingUpPage />
              </NeedAuth>
            }
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
