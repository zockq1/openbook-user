import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import TopicLearningPage from "./pages/TopicLearning/TopicLearningPage";
import QuestionSolvingPage from "./pages/QuestionSolving/QuestionSolvingPage";
import NotePage from "./pages/Note/NotePage";
import MainPage from "./pages/MainPage";
import TopicList from "./pages/TopicLearning/TopicListPage";
import TopicInfoPage from "./pages/TopicLearning/TopicInfoPage";
import Question from "./pages/QuestionSolving/Question";
import SettingsPage from "./pages/SettingsPage";
import AnswerNotePage from "./pages/Note/AnswerNotePage";
import BookmarkPage from "./pages/Note/BookmarkPage";

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
        path: "topic-learning",
        element: <TopicLearningPage />,
      },
      {
        path: "topic-learning/:chapter",
        element: <TopicList />,
      },
      {
        path: "topic-learning/:chapter/:topicTitle",
        element: <TopicInfoPage />,
      },
      {
        path: "question-solving",
        element: <QuestionSolvingPage />,
      },
      {
        path: "question-solving/question",
        element: <Question />,
      },
      {
        path: "note",
        element: <NotePage />,
      },
      {
        path: "note/answer-note",
        element: <AnswerNotePage />,
      },
      {
        path: "note/bookmark",
        element: <BookmarkPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);

export default router;
