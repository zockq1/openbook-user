import QuestionTemplate from "../../templates/question/QuestionTemplate";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetRandomQuestionQuery } from "../../../store/api/questionApi";

function QuizPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data: questionList } = useGetRandomQuestionQuery(
    {
      chapterNumber: Number(searchParams.get("id")) || 0,
      numberOfQuestion: Number(searchParams.get("noq")) || 5,
    },
    { refetchOnMountOrArgChange: true }
  );

  if (!questionList || questionList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <QuestionTemplate
      questionList={questionList}
      timeLimit={Number(searchParams.get("timelimit"))}
      handleNextContent={() => navigate("/question")}
    />
  );
}

export default QuizPage;
