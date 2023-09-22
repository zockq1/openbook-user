import { TimeLineModel } from "../../../types/questionTypes";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../organisms/ui/TitleBox";
import TimelineQuestion from "../../organisms/question/TimelineQuestion";

interface TimelineQuestionTemplateProps {
  handleBackPage: () => void;
  title?: string;
  chapter: number;
  dateList: TimeLineModel[];
  handleNextContent: () => void;
}

function TimelineQuestionTemplate({
  handleBackPage,
  title,
  chapter,
  dateList,
  handleNextContent,
}: TimelineQuestionTemplateProps) {
  return (
    <Layout>
      <TitleBox
        handleBackPage={handleBackPage}
        category="연표 문제"
        title={title}
      />
      <TimelineQuestion
        dateList={[...dateList].sort(() => Math.random() - 0.5)}
        handleNextContent={handleNextContent}
        chapter={chapter}
      />
    </Layout>
  );
}

export default TimelineQuestionTemplate;
