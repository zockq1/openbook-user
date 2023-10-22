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
      <MainContentLayout>
        <TimelineList dateList={dateList} />
        {handleNextContent && <Button onClick={handleNextContent}>다음</Button>}
      </MainContentLayout>
    </Layout>
  );
}

export default TimelineLearningTemplate;
