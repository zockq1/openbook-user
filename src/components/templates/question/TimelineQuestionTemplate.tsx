import { TimeLineModel } from "../../../types/questionTypes";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../organisms/ui/TitleBox";
import TimelineQuestion from "../../organisms/question/TimelineQuestion";
import MainContentLayout from "../../atoms/layout/MainContentLayout";

interface TimelineQuestionTemplateProps {
  title?: string;
  chapter: number;
  dateList: TimeLineModel[];
  handleNextContent: () => void;
}

function TimelineQuestionTemplate({
  title,
  chapter,
  dateList,
  handleNextContent,
}: TimelineQuestionTemplateProps) {
  return (
    <Layout>
      <TitleBox icon="연표 문제" category="연표 문제" title={title} />
      <MainContentLayout>
        <TimelineQuestion
          dateList={[...dateList].sort(() => Math.random() - 0.5)}
          handleNextContent={handleNextContent}
          chapter={chapter}
        />
      </MainContentLayout>
    </Layout>
  );
}

export default TimelineQuestionTemplate;
