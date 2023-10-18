import TitleBox from "../../organisms/ui/TitleBox";
import Layout from "../../atoms/layout/Layout";
import KeywordList from "../../organisms/list/KeywordList";
import Button from "../../atoms/button/Button";
import { TopicModel } from "../../../types/topicTypes";

interface TopicLearningTemplateProps {
  topicTitle: string;
  topicInfo: TopicModel;
  handleNextContent?: () => void;
  handleBackPage: () => void;
}

function TopicLearningTemplate({
  topicTitle,
  topicInfo,
  handleNextContent,
  handleBackPage,
}: TopicLearningTemplateProps) {
  return (
    <Layout>
      <TitleBox
        handleBackPage={handleBackPage}
        title={topicTitle}
        icon="주제 학습"
        category="주제 학습"
        dateComment={topicInfo.dateComment}
      />
      <KeywordList keywordList={topicInfo.keywordList} />
      {handleNextContent && <Button onClick={handleNextContent}>다음</Button>}
    </Layout>
  );
}

export default TopicLearningTemplate;
