import { useNavigate } from "react-router-dom";
import { useGetTimelineQuery } from "../../../store/api/timelineApi";
import useQuesryString from "../../../hooks/useQueryString";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../unit/ui/TitleBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import TimelineQuestion from "../../unit/timeline/presenter/TimelineQuestion.presenter";
import Loading from "../../unit/skeleton/LoadingUI";
import usePreventScroll from "../../../hooks/usePreventScroll";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";

function TimelineQuestionPage() {
  const { timelineId, title } = useQuesryString();
  const navigate = useNavigate();
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
          onNextContent={() => navigate(-1)}
          id={timelineId}
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

export default TimelineQuestionPage;
