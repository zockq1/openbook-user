import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainPage from "./components/pages/MainPage";
import LoginLoadingRedirectPage from "./components/pages/LoginLoadingRedirectPage";
import JeongJuHaengListPage from "./components/pages/JJH/JeongJuHaengListPage";
import ContentListPage from "./components/pages/JJH/ContentListPage";
import ChapterLearningPage from "./components/pages/JJH/ChapterLearningPage";
import TimelineLearningPage from "./components/pages/JJH/TimelineLearningPage";
import TopicLearningPage from "./components/pages/JJH/TopicLearningPage";
import FinalLearningPage from "./components/pages/JJH/FinalLearningPage";
import QuestionPage from "./components/pages/QuestionPage";
import MyInfoPage from "./components/pages/MyInfoPage";
import OptionPage from "./components/pages/OptionPage";
import TimelineMenuPage from "./components/pages/Timeline/TimelineMenuPage";
import TimelinePage from "./components/pages/Timeline/TimelinePage";
import LearningChapterListPage from "./components/pages/Learning/LearningChapterListPage";
import LearningTopicListPage from "./components/pages/Learning/LearningTopicListPage";
import LearningTopicPage from "./components/pages/Learning/LearningTopicPage";
import LearningChapterPage from "./components/pages/Learning/LearningChapterPage";
import QuizPage from "./components/pages/Question/QuizPage";
import TimelineQuestionPage from "./components/pages/Question/TimelineQuestionPage";
import MockExamPage from "./components/pages/Question/MockExamPage";

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
        path: "/question/mock-exam",
        element: <MockExamPage />,
      },
      {
        path: "/question/timeline",
        element: <TimelineQuestionPage />,
      },
      {
        path: "/question/quiz",
        element: <QuizPage />,
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
        path: "/learning",
        element: <LearningChapterListPage />,
      },
      {
        path: "/learning/:chapter",
        element: <LearningTopicListPage />,
      },
      {
        path: "learning/:chapter/chapter-learning",
        element: <LearningChapterPage />,
      },
      {
        path: "/learning/:chapter/:topic",
        element: <LearningTopicPage />,
      },
      {
        path: "/timeline",
        element: <TimelineMenuPage />,
      },
      {
        path: "/timeline/:chapter",
        element: <TimelinePage />,
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
