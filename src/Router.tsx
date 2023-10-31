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
import JJHListPage from "./components/pages/jjh/JJHListPage";
import LoginPage from "./components/pages/main/LoginPage";
import JJHTimelineQuestionPage from "./components/pages/jjh/TimelineQuestionPage";
import TimelineQuestionListPage from "./components/pages/question/TimelineQuestionListPage";
import QuizListPage from "./components/pages/question/QuizListPage";
import ExamListPage from "./components/pages/question/ExamListPage";
import QustionCategoryTopicListPage from "./components/pages/learning/QuestionCategoryTopicListPage";

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
        path: "/question/mock-exam-list",
        element: <ExamListPage />,
      },
      {
        path: "/question/mock-exam",
        element: <MockExamPage />,
      },
      {
        path: "/question/timeline-list",
        element: <TimelineQuestionListPage />,
      },
      {
        path: "/question/timeline",
        element: <TimelineQuestionPage />,
      },
      {
        path: "/question/quiz-list",
        element: <QuizListPage />,
      },
      {
        path: "/question/topic-list",
        element: <QustionCategoryTopicListPage />,
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
        path: "/learning/chapter",
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
        path: "/timeline-list",
        element: <TimelineMenuPage />,
      },
      {
        path: "/timeline",
        element: <TimelinePage />,
      },
      {
        path: "/oauth/kakao/login",
        element: <LoginLoadingRedirectPage />,
      },
      {
        path: "jeong-ju-haeng/content/final-question",
        element: <FinalLearningPage />,
      },
      {
        path: "jeong-ju-haeng/:chapter/timeline-learning",
        element: <TimelineLearningPage />,
      },
      {
        path: "jeong-ju-haeng/:chapter/timeline-question",
        element: <JJHTimelineQuestionPage />,
      },
      {
        path: "jeong-ju-haeng/:chapter/chapter-learning",
        element: <ChapterLearningPage />,
      },
      {
        path: "jeong-ju-haeng/content/topic-learning",
        element: <TopicLearningPage />,
      },
      {
        path: "jeong-ju-haeng/content",
        element: <ContentListPage />,
      },
      {
        path: "jeong-ju-haeng",
        element: <JJHListPage />,
      },
    ],
  },
]);

export default router;
