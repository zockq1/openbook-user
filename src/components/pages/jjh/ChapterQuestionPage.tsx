import { useGetKtoTQuestionQuery } from "../../../store/api/questionApi";
import useQuesryString from "../../../hooks/useQueryString";
import useNextContent from "../../../hooks/useNextContent";
import { useUpdateProgressMutation } from "../../../store/api/jjhApi";
import TitleBox from "../../unit/ui/TitleBox";
import Quiz from "../../unit/question/container/Quiz";
import Loading from "../../unit/skeleton/LoadingUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import ContentLayout from "../../atoms/layout/ContentLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import JJHSideMenu from "../../unit/common/container/JJHSideMenu";

function ChapterQuestionPage() {
  const { handleNextContent } = useNextContent();
  const { chapterNumber, jjhNumber, contentNumber, title } = useQuesryString();
  const {
    data: KtoTQuestionList,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetKtoTQuestionQuery(chapterNumber, {
    refetchOnMountOrArgChange: true,
  });
  const [updateProgres] = useUpdateProgressMutation();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const renderContent = () => {
    if (isLoading) {
      return <Loading image="question" />;
    }

    if (isError && error) {
      return (
        <ErrorUI
          error={error}
          message={`단원 마무리 문제 불러오기에 실패하였습니다.`}
        />
      );
    }

    if (isSuccess && KtoTQuestionList.length === 0) {
      return <EmptyUI message={`단원 마무리 문제가 비었습니다.`} />;
    }

    if (isSuccess) {
      return (
        <Quiz
          quizList={KtoTQuestionList}
          onNextContent={() => handleNextContent(jjhNumber, contentNumber)}
          onFinish={() =>
            isLoggedIn && updateProgres({ contentNumber: contentNumber + 1 })
          }
          isJJH
        />
      );
    }

    return null;
  };

  return (
    <>
      <TitleBox icon="question" category={`${title} 마무리 문제`} />
      <ContentLayout leftMenu={<JJHSideMenu />}>
        {renderContent()}
      </ContentLayout>
    </>
  );
}

export default ChapterQuestionPage;
