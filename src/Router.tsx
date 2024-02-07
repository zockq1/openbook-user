import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainPage from "./components/pages/main/MainPage";
import LoginLoadingRedirectPage from "./components/pages/main/LoginLoadingRedirectPage";
import ContentListPage from "./components/pages/jjh/ContentListPage";
import TopicQuestionPage from "./components/pages/jjh/TopicQuestionPage";
import ChapterQuestionPage from "./components/pages/jjh/ChapterQuestionPage";
import OptionPage from "./components/pages/main/OptionPage";
import TimelineMenuPage from "./components/pages/timeline/TimelineMenuPage";
import TimelinePage from "./components/pages/timeline/TimelinePage";
import LearningChapterListPage from "./components/pages/learning/LearningChapterListPage";
import LearningTopicListPage from "./components/pages/learning/LearningTopicListPage";
import QuizPage from "./components/pages/question/QuizPage";
import TimelineQuestionPage from "./components/pages/question/TimelineQuestionPage";
import MockExamPage from "./components/pages/question/MockExamPage";
import JJHListPage from "./components/pages/jjh/JJHListPage";
import JJHTimelineQuestionPage from "./components/pages/jjh/TimelineQuestionPage";
import TimelineQuestionListPage from "./components/pages/question/TimelineQuestionListPage";
import QuizListPage from "./components/pages/question/QuizListPage";
import ExamListPage from "./components/pages/question/ExamListPage";
import QustionCategoryTopicListPage from "./components/pages/learning/QuestionCategoryTopicListPage";
import BookmarkPage from "./components/pages/learning/BookmarkPage";
import WrongExamPage from "./components/pages/question/WrongExamPage";
import WrongExamListPage from "./components/pages/question/WrongExamListPage";
import SearchPage from "./components/pages/learning/SearchPage";
import NaverRedirectPage from "./components/pages/main/NaverRedirectPage";
import PrivacyPage from "./components/pages/main/PrivacyPage";

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
        path: "/option",
        element: <OptionPage />,
      },
      {
        path: "/option/privacy",
        element: <PrivacyPage />,
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
        path: "/oauth/naver/login",
        element: <NaverRedirectPage />,
      },
      {
        path: "jeong-ju-haeng/content/final-question",
        element: <ChapterQuestionPage />,
      },
      {
        path: "jeong-ju-haeng/content/timeline-question",
        element: <JJHTimelineQuestionPage />,
      },
      {
        path: "jeong-ju-haeng/content/topic-learning",
        element: <TopicQuestionPage />,
      },
      {
        path: "jeong-ju-haeng/content",
        element: <ContentListPage />,
      },
      {
        path: "jeong-ju-haeng",
        element: <JJHListPage />,
      },
      {
        path: "my-info/bookmark",
        element: <BookmarkPage />,
      },
      {
        path: "my-info/wrong-notes",
        element: <WrongExamListPage />,
      },
      {
        path: "my-info/wrong-notes/exam",
        element: <WrongExamPage />,
      },
      {
        path: "my-info/search",
        element: <SearchPage />,
      },
    ],
  },
]);

export default router;
