import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../organisms/ui/TitleBox";
import TimelineQuestion from "../../organisms/question/TimelineQuestion";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import { TimeLineItemModel } from "../../../types/timelinetypes";

interface TimelineQuestionTemplateProps {
  title: string;
  id: number;
  dateList: TimeLineItemModel[];
  onNextContent: () => void;
}

function TimelineQuestionTemplate({
  title,
  id,
  dateList,
  onNextContent,
}: TimelineQuestionTemplateProps) {
  return (
    <Layout>
      <TitleBox icon="TIMELINE_QUESTION" category={title} />
      <MainContentLayout>
        <TimelineQuestion
          dateList={[...dateList].sort(() => Math.random() - 0.5)}
          onNextContent={onNextContent}
          id={id}
        />
      </MainContentLayout>
    </Layout>
  );
}

export default TimelineQuestionTemplate;
