import { useState } from "react";
import { TimeLineModel } from "../../../types/questionTypes";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../organisms/ui/TitleBox";
import TimelineQuestion from "../../organisms/question/TimelineQuestion";
import Button from "../../atoms/button/Button";

interface TimelineQuestionTemplateProps {
  backLink: string;
  title?: string;
  dateList: TimeLineModel[];
  handleNextContent: () => void;
}

function TimelineQuestionTemplate({
  backLink,
  title,
  dateList,
  handleNextContent,
}: TimelineQuestionTemplateProps) {
  const [isComplete, setIsComplete] = useState(false);
  return (
    <Layout>
      <TitleBox backLink={backLink} category="연표 문제" title={title} />
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
