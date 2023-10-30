import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetExamQuery } from "../../../store/api/questionApi";
import ExamTemplate from "../../templates/question/ExamTemplate";

function MockExamPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: mockExamList } = useGetExamQuery(
    Number(searchParams.get("round")) || 0
  );

  if (!mockExamList) {
    return <div>Loading...</div>;
  }

  return (
    <ExamTemplate
      examList={mockExamList}
      timeLimit={Number(searchParams.get("timelimit"))}
      handleNextContent={() => navigate(-1)}
    />
  );
}

export default MockExamPage;
