import QuestionTemplate from "../../templates/question/QuestionTemplate";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetRandomQuestionQuery } from "../../../store/api/questionApi";

function QuizPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data: questionList } = useGetRandomQuestionQuery(
    {
      id: Number(searchParams.get("id")),
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
      onNextContent={() => navigate(-1)}
    />
  );
}

export default QuizPage;
