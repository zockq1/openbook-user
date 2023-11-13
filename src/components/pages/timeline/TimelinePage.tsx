import TitleBox from "../../organisms/ui/TitleBox";
import Layout from "../../atoms/layout/Layout";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import TimelineList from "../../unit/timeline/presenter/TimelineList.presenter";
import useQuesryString from "../../../service/useQueryString";
import KeywordToggleButton from "../../unit/topic/presenter/KeywordToggleButton.presenter";

function TimelinePage() {
  const { title, timelineId } = useQuesryString();

  return (
    <Layout>
      <TitleBox icon="TIMELINE_STUDY" category={title} />
      <MainContentLayout>
        <KeywordToggleButton comment />
        <TimelineList id={timelineId} />
      </MainContentLayout>
    </Layout>
  );
}

export default TimelinePage;
