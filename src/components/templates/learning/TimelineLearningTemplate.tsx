import TitleBox from "../../organisms/ui/TitleBox";
import Layout from "../../atoms/layout/Layout";
import TimelineList from "../../organisms/list/TimelineList";
import Button from "../../atoms/button/Button";
import { TimeLineModel } from "../../../types/questionTypes";
import MainContentLayout from "../../atoms/layout/MainContentLayout";

interface TimelineLearningTemplateProps {
  title: string;
  dateList: TimeLineModel[];
  handleNextContent?: () => void;
}

function TimelineLearningTemplate({
  title,
  dateList,
  handleNextContent,
}: TimelineLearningTemplateProps) {
  return (
    <Layout>
      <TitleBox title={title} icon="TIMELINE_STUDY" category="연표 학습" />
      <MainContentLayout>
        <TimelineList dateList={dateList} />
        {handleNextContent && <Button onClick={handleNextContent}>다음</Button>}
      </MainContentLayout>
    </Layout>
  );
}

export default TimelineLearningTemplate;
