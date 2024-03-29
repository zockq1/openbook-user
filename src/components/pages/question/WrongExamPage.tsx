import { useGetExamQuery } from "../../../store/api/questionApi";
import useQuesryString from "../../../hooks/useQueryString";
import TitleBox from "../../unit/ui/TitleBox";
import WrongNote from "../../unit/question/container/WrongNote";
import Loading from "../../unit/skeleton/LoadingUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import ContentLayout from "../../atoms/layout/ContentLayout";
import withAuth from "../../../hoc/withAuth";
import WrongNoteSideMenu from "../../unit/common/container/WrongNoteSideMenu";

function WrongExamPage() {
  const { round } = useQuesryString();
  const {
    data: mockExamList,
    isError,
    isFetching,
    isSuccess,
    error,
  } = useGetExamQuery(Number(round));

  const renderContent = () => {
    if (isFetching) {
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
          key={round}
        />
      );
    }

    return null;
  };

  return (
    <>
      <TitleBox icon="question" category={`${round}회 기출문제 오답노트`} />
      <ContentLayout leftMenu={<WrongNoteSideMenu />}>
        {renderContent()}
      </ContentLayout>
    </>
  );
}

export default withAuth(WrongExamPage);
