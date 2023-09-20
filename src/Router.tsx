import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainPage from "./components/pages/main/MainPage";
import LoginLoadingRedirectPage from "./components/pages/main/LoginLoadingRedirectPage";
import ContentListPage from "./components/pages/jjh/ContentListPage";
import ChapterLearningPage from "./components/pages/jjh/ChapterLearningPage";
import TimelineLearningPage from "./components/pages/jjh/TimelineLearningPage";
import TopicLearningPage from "./components/pages/jjh/TopicLearningPage";
import FinalLearningPage from "./components/pages/jjh/FinalLearningPage";
import QuestionPage from "./components/pages/main/QuestionPage";
import MyInfoPage from "./components/pages/main/MyInfoPage";
import OptionPage from "./components/pages/main/OptionPage";
import TimelineMenuPage from "./components/pages/timeline/TimelineMenuPage";
import TimelinePage from "./components/pages/timeline/TimelinePage";
import LearningChapterListPage from "./components/pages/learning/LearningChapterListPage";
import LearningTopicListPage from "./components/pages/learning/LearningTopicListPage";
import LearningTopicPage from "./components/pages/learning/LearningTopicPage";
import LearningChapterPage from "./components/pages/learning/LearningChapterPage";
import QuizPage from "./components/pages/question/QuizPage";
import TimelineQuestionPage from "./components/pages/question/TimelineQuestionPage";
import MockExamPage from "./components/pages/question/MockExamPage";
import MockExamSettingPage from "./components/pages/question/MockExamSettingPage";
import TimelineQuestionSettingPage from "./components/pages/question/TimelineQuestionSettingPage.tsx";
import QuizSettingPage from "./components/pages/question/QuizSettingPage";
import ChapterListPage from "./components/pages/jjh/ChapterListPage";
import LoginPage from "./components/pages/main/LoginPage";

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
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/question",
        element: <QuestionPage />,
      },
      {
        path: "/question/mock-exam/setting",
        element: <MockExamSettingPage />,
      },
      {
        path: "/question/mock-exam",
        element: <MockExamPage />,
      },
      {
        path: "/question/timeline/setting",
        element: <TimelineQuestionSettingPage />,
      },
      {
        path: "/question/timeline",
        element: <TimelineQuestionPage />,
      },
      {
        path: "/question/quiz/setting",
        element: <QuizSettingPage />,
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
        element: <ChapterListPage />,
      },
    ],
  },
]);

export default router;
