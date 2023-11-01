import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetExamQuery } from "../../../store/api/questionApi";
import ExamTemplate from "../../templates/question/ExamTemplate";
import useQuesryString from "../../../service/useQueryString";

function MockExamPage() {
  const { title } = useQuesryString();
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
      title={title}
      examList={mockExamList}
      timeLimit={Number(searchParams.get("timelimit"))}
      handleNextContent={() => navigate(-1)}
    />
  );
}

export default MockExamPage;
