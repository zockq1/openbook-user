import TitleBox from "../../organisms/ui/TitleBox";
import Layout from "../../atoms/layout/Layout";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import TimelineList from "../../unit/timeline/presenter/TimelineList.presenter";
import KeywordToggleButton from "../../atoms/button/KeywordToggleButton";
import useQuesryString from "../../../service/useQueryString";

function TimelinePage() {
  const { title, timelineId } = useQuesryString();

  return (
    <Layout>
      <TitleBox icon="TIMELINE_STUDY" category={title} />
      <MainContentLayout>
        <TimelineList id={timelineId} />
      </MainContentLayout>
      <KeywordToggleButton />
    </Layout>
  );
}

export default TimelinePage;
