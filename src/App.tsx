import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "./hooks/redux";
import DefaultLayout from "./layouts/DefaultLayout";
import MainPage from "./pages/MainPage/MainPage";
import FilmPage from "./pages/FilmPage/FilmPage";

function App() {
  const { value: theme } = useAppSelector((state) => state.theme);

  return (
    <div className={`body ${theme === "dark" ? "dark-theme" : "light-theme"} `}>
      <Routes>
        <Route path={`/`} element={<DefaultLayout />}>
          <Route index element={<MainPage />} />
          <Route path={`/:id`} element={<FilmPage />} />
        </Route>
        {/* <Route
          path="/"
          element={
            <NeedAuth>
              <SignUpPage />
            </NeedAuth>
          }
        />

        <Route
          path="/catalog"
          element={
            <RequireAuth>
              <CatalogLayout />
            </RequireAuth>
          }
        >
          <Route index element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<UserPage />} />
        </Route> */}
      </Routes>
    </div>
  );
}

export default App;
