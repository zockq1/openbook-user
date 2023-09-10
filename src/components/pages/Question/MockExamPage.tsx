import QuestionTemplate from "../../templates/Question/QuestionTemplate";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetMockExamQuery } from "../../../store/api/questionApi";

function MockExamPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: mockExamList } = useGetMockExamQuery(
    Number(searchParams.get("round")) || 0
  );

  const handleNext = () => {
    navigate("/question");
  };

  if (!mockExamList) {
    return <div>Loading...</div>;
  }

  return (
    <QuestionTemplate
      category="모의고사"
      backLink="/question"
      questionList={mockExamList}
      timeLimit={Number(searchParams.get("timelimit"))}
      handleNextContent={handleNext}
    />
  );
}

export default MockExamPage;
