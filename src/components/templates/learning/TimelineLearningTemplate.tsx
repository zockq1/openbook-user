import TitleBox from "../../organisms/ui/TitleBox";
import Layout from "../../atoms/layout/Layout";
import Button from "../../atoms/button/Button";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import TimelineList from "../../unit/timeline/presenter/TimelineList.presenter";
import KeywordToggleButton from "../../atoms/button/KeywordToggleButton";

interface TimelineLearningTemplateProps {
  title: string;
  timelineId: number;
  handleNextContent?: () => void;
}

function TimelineLearningTemplate({
  title,
  timelineId,
  handleNextContent,
}: TimelineLearningTemplateProps) {
  return (
    <Layout>
      <TitleBox icon="TIMELINE_STUDY" category={title} />
      <MainContentLayout>
        <TimelineList id={timelineId} />
        {handleNextContent && <Button onClick={handleNextContent}>다음</Button>}
      </MainContentLayout>
      <KeywordToggleButton />
    </Layout>
  );
}

export default TimelineLearningTemplate;
