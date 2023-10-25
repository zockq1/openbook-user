import TitleBox from "../../organisms/ui/TitleBox";
import Layout from "../../atoms/layout/Layout";
import KeywordList from "../../organisms/list/KeywordList";
import Button from "../../atoms/button/Button";
import { TopicModel } from "../../../types/topicTypes";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import KeywordToggleButton from "../../atoms/button/KeywordToggleButton";

interface TopicLearningTemplateProps {
  topicTitle: string;
  topicInfo: TopicModel;
  handleNextContent?: () => void;
}

function TopicLearningTemplate({
  topicTitle,
  topicInfo,
  handleNextContent,
}: TopicLearningTemplateProps) {
  return (
    <Layout>
      <TitleBox
        title={topicTitle}
        icon="TOPIC_STUDY"
        category="주제 학습"
        dateComment={topicInfo.dateComment}
      />

      <KeywordToggleButton />
      <MainContentLayout>
        <KeywordList keywordList={topicInfo.keywordList} />
        {handleNextContent && <Button onClick={handleNextContent}>다음</Button>}
      </MainContentLayout>
    </Layout>
  );
}

export default TopicLearningTemplate;
