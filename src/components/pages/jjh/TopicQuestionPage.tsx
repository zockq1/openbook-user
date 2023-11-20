import { useGetTtoKQuestionQuery } from "../../../store/api/questionApi";
import withAuth from "../../../hoc/withAuth";
import useQuesryString from "../../../hooks/useQueryString";
import useNextContent from "../../../hooks/useNextContent";
import { useUpdateProgressMutation } from "../../../store/api/jjhApi";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../unit/ui/TitleBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import Quiz from "../../unit/question/presenter/Quiz.presenter";
import Loading from "../../unit/skeleton/LoadingUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";

function TopicQuestionPage() {
  const { topicTitle, jjhNumber, contentNumber } = useQuesryString();
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
          onFinish={() => updateProgres({ contentNumber: contentNumber + 1 })}
          isJJH
        />
      );
    }

    return null;
  };

  return (
    <Layout>
      <TitleBox icon="question" category={`${topicTitle} 문제`} />
      <MainContentLayout>{renderContent()}</MainContentLayout>
    </Layout>
  );
}
export default withAuth(TopicQuestionPage);
