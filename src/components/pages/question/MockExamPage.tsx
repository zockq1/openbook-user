import { useSearchParams } from "react-router-dom";
import { useGetExamQuery } from "../../../store/api/questionApi";
import useQuesryString from "../../../service/useQueryString";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../organisms/ui/TitleBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import Exam from "../../unit/question/presenter/Exam.presenter";
function MockExamPage() {
  const { title } = useQuesryString();
  const [searchParams] = useSearchParams();
  const { data: mockExamList } = useGetExamQuery(
    Number(searchParams.get("round")) || 0
  );

  if (!mockExamList) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <TitleBox icon="question" category={title} />
      <MainContentLayout>
        <Exam examList={mockExamList} />
      </MainContentLayout>
    </Layout>
  );
}

export default MockExamPage;
