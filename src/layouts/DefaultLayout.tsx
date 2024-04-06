import { Outlet } from "react-router-dom";
import Header from "../common/Header/Header";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default DefaultLayout;
