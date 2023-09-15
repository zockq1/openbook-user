import QuestionTemplate from "../../templates/question/QuestionTemplate";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetMockExamQuery } from "../../../store/api/questionApi";

function MockExamPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: mockExamList } = useGetMockExamQuery(
    Number(searchParams.get("round")) || 0
  );

  if (!mockExamList) {
    return <div>Loading...</div>;
  }

  return (
    <QuestionTemplate
      category="모의고사"
      handleBackPage={() => navigate("/question")}
      questionList={mockExamList}
      timeLimit={Number(searchParams.get("timelimit"))}
      handleNextContent={() => navigate("/question")}
    />
  );
}

export default MockExamPage;
