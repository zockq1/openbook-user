import { useGetExamQuery } from "../../../store/api/questionApi";
import useQuesryString from "../../../service/useQueryString";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../unit/ui/TitleBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import WrongNote from "../../unit/question/presenter/WrongNote.presenter";
import QuestionLoading from "../../unit/skeleton/LoadingUI";

function WrongExamPage() {
  const { round } = useQuesryString();
  const { data: mockExamList } = useGetExamQuery(Number(round));

  if (!mockExamList) {
    return (
      <Layout>
        <TitleBox icon="question" category={`${round}회 기출문제 오답노트`} />
        <MainContentLayout>
          <QuestionLoading image="wrong" />
        </MainContentLayout>
      </Layout>
    );
  }

  return (
    <Layout>
      <TitleBox icon="question" category={`${round}회 기출문제 오답노트`} />
      <MainContentLayout>
        <WrongNote
          examList={mockExamList.filter((exam) => exam.savedAnswerNote)}
        />
      </MainContentLayout>
    </Layout>
  );
}

export default WrongExamPage;
