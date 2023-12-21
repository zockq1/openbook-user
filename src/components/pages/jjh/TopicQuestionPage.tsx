import { useGetTtoKQuestionQuery } from "../../../store/api/questionApi";
import useQuesryString from "../../../hooks/useQueryString";
import useNextContent from "../../../hooks/useNextContent";
import { useUpdateProgressMutation } from "../../../store/api/jjhApi";
import TitleBox from "../../unit/ui/TitleBox";
import Quiz from "../../unit/question/presenter/Quiz.presenter";
import Loading from "../../unit/skeleton/LoadingUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import ContentLayout from "../../atoms/layout/ContentLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useCallback } from "react";

function TopicQuestionPage() {
  const { topicTitle, jjhNumber, contentNumber } = useQuesryString();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { handleNextContent } = useNextContent();
  const {
    data: TtoKQuestionList,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetTtoKQuestionQuery(topicTitle, {
    refetchOnMountOrArgChange: true,
  });
  const [updateProgres] = useUpdateProgressMutation();

  const handleFinish = useCallback(() => {
    isLoggedIn && updateProgres({ contentNumber: contentNumber + 1 });
  }, [isLoggedIn, updateProgres, contentNumber]);

  const renderContent = () => {
    if (isLoading) {
      return <Loading image="question" />;
    }

    if (isError && error) {
      return (
        <ErrorUI
          error={error}
          message={`주제 문제 불러오기에 실패하였습니다.`}
        />
      );
    }

    if (isSuccess && TtoKQuestionList.length === 0) {
      return <EmptyUI message={`주제 문제가 비었습니다.`} />;
    }

    if (isSuccess) {
      return (
        <Quiz
          quizList={TtoKQuestionList}
          onNextContent={() => handleNextContent(jjhNumber, contentNumber)}
          onFinish={handleFinish}
          isJJH
        />
      );
    }

    return null;
  };

  return (
    <>
      <TitleBox icon="question" category={`${topicTitle} 문제`} />
      <ContentLayout>{renderContent()}</ContentLayout>
    </>
  );
}
export default TopicQuestionPage;
