import { useGetExamQuery } from "../../../store/api/questionApi";
import useQuesryString from "../../../hooks/useQueryString";
import TitleBox from "../../unit/ui/TitleBox";
import Exam from "../../unit/question/presenter/Exam.presenter";
import Loading from "../../unit/skeleton/LoadingUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import ContentLayout from "../../atoms/layout/ContentLayout";
import withAuth from "../../../hoc/withAuth";
import ExamSideMenu from "../../unit/common/presenter/ExamSideMenu.presenter";
function MockExamPage() {
  const { title, round } = useQuesryString();
  const {
    data: mockExamList,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetExamQuery(Number(round));

  const renderContent = () => {
    if (isLoading) {
      return <Loading image="question" />;
    }

    if (isError && error) {
      return (
        <ErrorUI
          error={error}
          message={`${round}회 기출문제 불러오기에 실패하였습니다.`}
        />
      );
    }

    if (isSuccess && mockExamList.length === 0) {
      return <EmptyUI message={`${round}회 기출문제가 비었습니다.`} />;
    }

    if (isSuccess) {
      return <Exam examList={mockExamList} />;
    }

    return null;
  };

  return (
    <>
      <TitleBox icon="question" category={title} />
      <ContentLayout leftMenu={<ExamSideMenu />}>
        {renderContent()}
      </ContentLayout>
    </>
  );
}

export default withAuth(MockExamPage);
