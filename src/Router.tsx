import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainPage from "./components/pages/MainPage";
import LoginLoadingRedirectPage from "./components/pages/LoginLoadingRedirectPage";
import JeongJuHaengListPage from "./components/pages/JeongJuHaengListPage";
import ContentListPage from "./components/pages/ContentListPage";
import ChapterLearningPage from "./components/pages/ChapterLearningPage";
import TimelineLearningPage from "./components/pages/TimelineLearningPage";
import TopicLearningPage from "./components/pages/TopicLearningPage";
import FinalLearningPage from "./components/pages/FinalLearningPage";
import QuestionPage from "./components/pages/QuestionPage";
import MyInfoPage from "./components/pages/MyInfoPage";
import OptionPage from "./components/pages/OptionPage";

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
        path: "/question",
        element: <QuestionPage />,
      },
      {
        path: "/my-info",
        element: <MyInfoPage />,
      },
      {
        path: "/option",
        element: <OptionPage />,
      },
      {
        path: "/oauth/kakao/login",
        element: <LoginLoadingRedirectPage />,
      },
      {
        path: "jeong-ju-haeng/:chapter/final-learning",
        element: <FinalLearningPage />,
      },
      {
        path: "jeong-ju-haeng/:chapter/timeline-learning",
        element: <TimelineLearningPage />,
      },
      {
        path: "jeong-ju-haeng/:chapter/chapter-learning",
        element: <ChapterLearningPage />,
      },
      {
        path: "jeong-ju-haeng/:chapter/topic-learning/:topic",
        element: <TopicLearningPage />,
      },
      {
        path: "jeong-ju-haeng/:chapter",
        element: <ContentListPage />,
      },
      {
        path: "jeong-ju-haeng",
        element: <JeongJuHaengListPage />,
      },
    ],
  },
]);

export default router;
