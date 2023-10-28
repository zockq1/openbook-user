import { TimeLineModel } from "../../../types/questionTypes";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../organisms/ui/TitleBox";
import TimelineQuestion from "../../organisms/question/TimelineQuestion";
import MainContentLayout from "../../atoms/layout/MainContentLayout";

interface TimelineQuestionTemplateProps {
  title?: string;
  id: number;
  dateList: TimeLineModel[];
  handleNextContent: () => void;
}

function TimelineQuestionTemplate({
  title,
  id,
  dateList,
  handleNextContent,
}: TimelineQuestionTemplateProps) {
  return (
    <Layout>
      <TitleBox icon="TIMELINE_QUESTION" category="연표 문제" title={title} />
      <MainContentLayout>
        <TimelineQuestion
          dateList={[...dateList].sort(() => Math.random() - 0.5)}
          handleNextContent={handleNextContent}
          id={id}
        />
      </MainContentLayout>
    </Layout>
  );
}

export default TimelineQuestionTemplate;
