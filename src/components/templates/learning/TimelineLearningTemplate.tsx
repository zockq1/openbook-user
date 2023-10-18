import TitleBox from "../../organisms/ui/TitleBox";
import Layout from "../../atoms/layout/Layout";
import TimelineList from "../../organisms/list/TimelineList";
import Button from "../../atoms/button/Button";
import { TimeLineModel } from "../../../types/questionTypes";

interface TimelineLearningTemplateProps {
  title: string;
  dateList: TimeLineModel[];
  handleNextContent?: () => void;
  handleBackPage: () => void;
}

function TimelineLearningTemplate({
  title,
  dateList,
  handleNextContent,
  handleBackPage,
}: TimelineLearningTemplateProps) {
  return (
    <Layout>
      <TitleBox
        handleBackPage={handleBackPage}
        title={title}
        icon="연표 학습"
        category="연표 학습"
      />

      <TimelineList dateList={dateList} />
      {handleNextContent && <Button onClick={handleNextContent}>다음</Button>}
    </Layout>
  );
}

export default TimelineLearningTemplate;
