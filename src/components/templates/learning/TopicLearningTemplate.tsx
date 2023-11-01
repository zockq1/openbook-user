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
      <TitleBox icon="TOPIC_STUDY" category={topicTitle} />

      <KeywordToggleButton />
      <Topic topic={topicTitle} />
    </Layout>
  );
}

export default TopicLearningTemplate;
