import TitleBox from "../../organisms/ui/TitleBox";
import Layout from "../../atoms/layout/Layout";
import TimelineList from "../../organisms/list/TimelineList";
import Button from "../../atoms/button/Button";
import { TimeLineModel } from "../../../types/questionTypes";

interface TimelineLearningTemplateProps {
  title: string;
  dateList: TimeLineModel[];
  handleNextContent?: () => void;
  backLink: string;
}

function TimelineLearningTemplate({
  title,
  dateList,
  handleNextContent,
  backLink,
}: TimelineLearningTemplateProps) {
  return (
    <Layout>
      <TitleBox backLink={backLink} title={title} category="연표 학습" />

      <TimelineList dateList={dateList} />
      {handleNextContent && <Button onClick={handleNextContent}>다음</Button>}
    </Layout>
  );
}

export default TimelineLearningTemplate;
