import useNextContent from "../../../hooks/useNextContent";
import useQuesryString from "../../../hooks/useQueryString";
import { useGetTimelineQuery } from "../../../store/api/timelineApi";
import TitleBox from "../../unit/ui/TitleBox";
import TimelineQuestion from "../../unit/timeline/presenter/TimelineQuestion.presenter";
import Loading from "../../unit/skeleton/LoadingUI";
import usePreventScroll from "../../../hooks/usePreventScroll";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import { useUpdateProgressMutation } from "../../../store/api/jjhApi";
import ContentLayout from "../../atoms/layout/ContentLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useCallback } from "react";
import JJHSideMenu from "../../unit/common/presenter/JJHSideMenu.presenter";

function TimelineQuestionPage() {
  const { handleNextContent } = useNextContent();
  const [updateProgres] = useUpdateProgressMutation();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { timelineId, title, jjhNumber, contentNumber } = useQuesryString();
  const {
    data: dateList,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetTimelineQuery(timelineId);

  usePreventScroll();

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
          message={`연표 문제 불러오기에 실패하였습니다.`}
        />
      );
    }

    if (isSuccess && dateList.length === 0) {
      return <EmptyUI message={`연표 문제가 비었습니다.`} />;
    }

    if (isSuccess) {
      return (
        <TimelineQuestion
          dateList={[...dateList].sort(() => Math.random() - 0.5)}
          onNextContent={() => handleNextContent(jjhNumber, contentNumber)}
          id={timelineId}
          onFinish={handleFinish}
        />
      );
    }

    return null;
  };

  return (
    <>
      <TitleBox icon="TIMELINE_QUESTION" category={title} />
      <ContentLayout leftMenu={<JJHSideMenu />}>
        {renderContent()}
      </ContentLayout>
    </>
  );
}
export default TimelineQuestionPage;
