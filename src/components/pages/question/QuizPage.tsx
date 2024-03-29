import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetRandomQuestionQuery } from "../../../store/api/questionApi";
import TitleBox from "../../unit/ui/TitleBox";
import Quiz from "../../unit/question/container/Quiz";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import ContentLayout from "../../atoms/layout/ContentLayout";
import withAuth from "../../../hoc/withAuth";
import QuizSideMenu from "../../unit/common/container/QuizSideMenu";
import useQuesryString from "../../../hooks/useQueryString";
import Loading from "../../unit/skeleton/LoadingUI";

function QuizPage() {
  const navigate = useNavigate();
  const { timelineId: id } = useQuesryString();
  const [searchParams] = useSearchParams();
  const {
    data: questionList,
    isError,
    isSuccess,
    isFetching,
    error,
  } = useGetRandomQuestionQuery(
    {
      id,
      numberOfQuestion: Number(searchParams.get("noq")) || 10,
    },
    { refetchOnMountOrArgChange: true }
  );
  const renderContent = () => {
    if (isFetching) {
      return <Loading image="question" />;
    }
    if (isError && error) {
      return (
        <ErrorUI error={error} message={`퀴즈 불러오기에 실패하였습니다.`} />
      );
    }
    if (isSuccess && questionList.length === 0) {
      return <EmptyUI message={`퀴즈가 비었습니다.`} />;
    }
    if (isSuccess) {
      return (
        <Quiz
          quizList={questionList}
          onNextContent={() => navigate(-1)}
          key={id}
        />
      );
    }
    return null;
  };
  return (
    <>
      <TitleBox icon="question" category="퀴즈" />
      <ContentLayout leftMenu={<QuizSideMenu />}>
        {renderContent()}
      </ContentLayout>
    </>
  );
}

export default withAuth(QuizPage);
