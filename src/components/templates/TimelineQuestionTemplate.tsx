import TitleBox from "../molecules/TitleBox";
import Layout from "../atoms/Layout";
import Button from "../atoms/Button";
import { TimeLineModel } from "../../types/questionTypes";
import TimelineQuestion from "../organisms/TimeLineQuestion";
import { useState } from "react";

interface TimelineQuestionTemplateProps {
  chapterNumber: number;
  title: string;
  dateList: TimeLineModel[];
  handleNextContent: () => void;
}

function TimelineQuestionTemplate({
  handleNextContent,
  chapterNumber,
  dateList,
  title,
}: TimelineQuestionTemplateProps) {
  const [isComplete, setIsComplete] = useState(false);
  return (
    <Layout>
      <TitleBox
        backLink={`/jeong-ju-haeng/${chapterNumber}`}
        title={title}
        category="연표 문제"
      />
      <TimelineQuestion
        dateList={dateList}
        setIsComplete={setIsComplete}
        isComplete={isComplete}
      />
      {isComplete && <Button onClick={handleNextContent}>다음</Button>}
    </Layout>
  );
}

export default TimelineQuestionTemplate;
