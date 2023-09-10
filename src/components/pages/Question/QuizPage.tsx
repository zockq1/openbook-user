import QuestionTemplate from "../../templates/Question/QuestionTemplate";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetRandomQuestionQuery } from "../../../store/api/questionApi";

function QuizPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data: questionList } = useGetRandomQuestionQuery({
    chapterNumber: Number(searchParams.get("chapter")) || 0,
    numberOfQuestion: Number(searchParams.get("noq")) || 5,
  });

  const handleNext = () => {
    navigate("/question");
  };

  if (!questionList || questionList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <QuestionTemplate
      category="퀴즈"
      backLink="/question"
      questionList={questionList}
      timeLimit={Number(searchParams.get("timelimit"))}
      handleNextContent={handleNext}
    />
  );
}

export default QuizPage;
