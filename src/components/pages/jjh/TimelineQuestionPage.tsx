import withAuth from "../../../hoc/withAuth";
import useNextContent from "../../../hooks/useNextContent";
import useQuesryString from "../../../hooks/useQueryString";
import { useGetTimelineQuery } from "../../../store/api/timelineApi";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../unit/ui/TitleBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import TimelineQuestion from "../../unit/timeline/presenter/TimelineQuestion.presenter";
import Loading from "../../unit/skeleton/LoadingUI";
import usePreventScroll from "../../../hooks/usePreventScroll";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import { useUpdateProgressMutation } from "../../../store/api/jjhApi";

function TimelineQuestionPage() {
  const { handleNextContent } = useNextContent();
  const [updateProgres] = useUpdateProgressMutation();
  const { timelineId, title, jjhNumber, contentNumber } = useQuesryString();
  const {
    data: dateList,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetTimelineQuery(timelineId);

  usePreventScroll();

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
          onFinish={() => updateProgres({ contentNumber: contentNumber + 1 })}
        />
      );
    }

    return null;
  };

  return (
    <Layout>
      <TitleBox icon="TIMELINE_QUESTION" category={title} />
      <MainContentLayout>{renderContent()}</MainContentLayout>
    </Layout>
  );
}
export default withAuth(TimelineQuestionPage);
