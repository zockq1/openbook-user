import TitleBox from "../../unit/ui/TitleBox";
import useQuesryString from "../../../hooks/useQueryString";
import KeywordToggleButton from "../../unit/topic/container/KeywordToggleButton";
import { useGetTimelineQuery } from "../../../store/api/timelineApi";
import Loading from "../../unit/skeleton/LoadingUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import TimelineListUI from "../../unit/timeline/presenter/TimelineListUI";
import ContentLayout from "../../atoms/layout/ContentLayout";
import TimelineSideMenu from "../../unit/common/container/TimelineSideMenu.presenter";
import TopicList from "../../unit/topic/container/TopicList";

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
      return (
        <div>
          <TopicList
            topicList={[
              {
                title: title.split("/")[0],
                date: title.split("/")[1],
                state: "Timeline",
                isBookmarked: false,
                keywordList: [],
                onClick: () => {},
                content: <TimelineListUI dateList={dateList} />,
              },
            ]}
          />
        </div>
      );
      //return <TimelineListUI dateList={dateList} />;
    }

    return null;
  };

  return (
    <>
      <TitleBox icon="TIMELINE_STUDY" category={title} />
      <ContentLayout leftMenu={<TimelineSideMenu />}>
        <KeywordToggleButton comment keyword />
        {renderContent()}
      </ContentLayout>
    </>
  );
}

export default TimelinePage;
