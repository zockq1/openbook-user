import TitleBox from "../organisms/TitleBox";
import Layout from "../atoms/Layout";
import TimelineList from "../organisms/TimelineList";
import Button from "../atoms/Button";
import { TimeLineModel } from "../../types/questionTypes";

interface TimelineLearningTemplateProps {
  chapterNumber: number;
  title: string;
  dateList: TimeLineModel[];
  handleNextContent: () => void;
}

function TimelineLearningTemplate({
  chapterNumber,
  title,
  dateList,
  handleNextContent,
}: TimelineLearningTemplateProps) {
  return (
    <Layout>
      <TitleBox
        backLink={`/jeong-ju-haeng/${chapterNumber}`}
        title={title}
        category="연표 학습"
      />

      <TimelineList dateList={dateList} />
      <Button onClick={handleNextContent}>다음</Button>
    </Layout>
  );
}

export default TimelineLearningTemplate;
