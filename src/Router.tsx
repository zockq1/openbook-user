import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import TopicLearning from "./pages/TopicLearning";
import QuestionSolving from "./pages/QuestionSolving";
import Note from "./pages/Note";
import Main from "./pages/Main";
import Option from "./pages/Option";

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
        path: "question-solving",
        element: <QuestionSolving />,
      },
      {
        path: "note",
        element: <Note />,
      },
      {
        path: "option",
        element: <Option />,
      },
    ],
  },
]);

export default router;
