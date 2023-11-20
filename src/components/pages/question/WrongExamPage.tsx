import { useGetExamQuery } from "../../../store/api/questionApi";
import useQuesryString from "../../../hooks/useQueryString";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../unit/ui/TitleBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import WrongNote from "../../unit/question/presenter/WrongNote.presenter";
import Loading from "../../unit/skeleton/LoadingUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";

function WrongExamPage() {
  const { round } = useQuesryString();
  const {
    data: mockExamList,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetExamQuery(Number(round));

  const renderContent = () => {
    if (isLoading) {
      return <Loading image="wrong" />;
    }

    if (isError && error) {
      return (
        <ErrorUI
          error={error}
          message={`${round} 회차 오답노트 불러오기에 실패하였습니다.`}
        />
      );
    }

    if (isSuccess && mockExamList.length === 0) {
      return <EmptyUI message={`${round} 회차 오답노트가 비었습니다.`} />;
    }

    if (isSuccess) {
      return (
        <WrongNote
          examList={mockExamList.filter((exam) => exam.savedAnswerNote)}
        />
      );
    }

    return null;
  };

  return (
    <Layout>
      <TitleBox icon="question" category={`${round}회 기출문제 오답노트`} />
      <MainContentLayout>{renderContent()}</MainContentLayout>
    </Layout>
  );
}

export default WrongExamPage;
