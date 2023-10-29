import TitleBox from "../../organisms/ui/TitleBox";
import Layout from "../../atoms/layout/Layout";
import { TopicModel } from "../../../types/topicTypes";
import KeywordToggleButton from "../../atoms/button/KeywordToggleButton";
import Topic from "../../unit/topic/presenter/Topic.presenter";

interface TopicLearningTemplateProps {
  topicTitle: string;
  topicInfo: TopicModel;
}

function TopicLearningTemplate({
  topicTitle,
  topicInfo,
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
      <Topic topic={topicTitle} />
    </Layout>
  );
}

export default TopicLearningTemplate;
