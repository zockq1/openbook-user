import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainPage from "./components/pages/MainPage";
import LoginLoadingRedirectPage from "./components/pages/LoginLoadingRedirectPage";
import JeongJuHaengPage from "./components/pages/JeongJuHaengPage";
import JeongJuHaengListPage from "./components/pages/JeongJuHaengListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
      {
        path: "/oauth/kakao/login",
        element: <LoginLoadingRedirectPage />,
      },
      {
        path: "jeong-ju-haeng/:chpater",
        element: <JeongJuHaengPage />,
      },
      {
        path: "jeong-ju-haeng",
        element: <JeongJuHaengListPage />,
      },
    ],
  },
]);

export default router;
