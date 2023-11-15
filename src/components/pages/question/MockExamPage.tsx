import { useGetExamQuery } from "../../../store/api/questionApi";
import useQuesryString from "../../../service/useQueryString";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../organisms/ui/TitleBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import Exam from "../../unit/question/presenter/Exam.presenter";
import QuestionLoading from "../../unit/skeleton/LoadingUI";
function MockExamPage() {
  const { title, round } = useQuesryString();
  const { data: mockExamList } = useGetExamQuery(Number(round));

  if (!mockExamList) {
    return (
      <Layout>
        <TitleBox icon="question" category={title} />
        <MainContentLayout>
          <QuestionLoading image="question" />
        </MainContentLayout>
      </Layout>
    );
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
