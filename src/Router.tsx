import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import TopicLearning from "./pages/TopicLearning";
import QuestionSolving from "./pages/QuestionSolving";
import Note from "./pages/Note";
import Main from "./pages/Main";
import Option from "./pages/Settings";
import Chapter from "./pages/Chapter";
import Topic from "./pages/Topic";
import Question from "./pages/Question";
import Settings from "./pages/Settings";

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
        element: <TopicLearning />,
      },
      {
        path: "topic-learning/:chapter",
        element: <Chapter />,
      },
      {
        path: "topic-learning/:chapter/:topicTitle",
        element: <Topic />,
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
        element: <Settings />,
      },
    ],
  },
]);

export default router;
