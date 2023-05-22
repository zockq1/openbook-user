import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import TopicLearningPage from "./pages/TopicLearning/TopicLearningPage";
import QuestionSolving from "./pages/QuestionSolving/QuestionSolving";
import Note from "./pages/Note";
import Main from "./pages/Main";
import TopicList from "./pages/TopicLearning/TopicListPage";
import TopicInfoPage from "./pages/TopicLearning/TopicInfoPage";
import Question from "./pages/QuestionSolving/Question";
import SettingsPage from "./pages/SettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Main />,
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
        element: <QuestionSolving />,
      },
      {
        path: "question-solving/question",
        element: <Question />,
      },
      {
        path: "note",
        element: <Note />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);

export default router;
