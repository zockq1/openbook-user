import TitleBox from "../../unit/ui/TitleBox";
import useQuesryString from "../../../hooks/useQueryString";
import KeywordToggleButton from "../../unit/topic/presenter/KeywordToggleButton.presenter";
import { useGetTimelineQuery } from "../../../store/api/timelineApi";
import Loading from "../../unit/skeleton/LoadingUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import TimelineListUI from "../../unit/timeline/container/TimelineListUI.container";
import ContentLayout from "../../atoms/layout/ContentLayout";

function TimelinePage() {
  const { title, timelineId } = useQuesryString();
  const {
    data: dateList,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetTimelineQuery(timelineId);

  const renderContent = () => {
    if (isLoading) {
      return <Loading image="question" />;
    }

    if (isError && error) {
      return (
        <ErrorUI error={error} message={`연표 불러오기에 실패하였습니다.`} />
      );
    }

    if (isSuccess && dateList.length === 0) {
      return <EmptyUI message={`연표가 비었습니다.`} />;
    }

    if (isSuccess) {
      return <TimelineListUI dateList={dateList} />;
    }

    return null;
  };

  return (
    <>
      <TitleBox icon="TIMELINE_STUDY" category={title} />
      <ContentLayout width="500px">
        <KeywordToggleButton comment />
        {renderContent()}
      </ContentLayout>
    </>
  );
}

export default TimelinePage;
