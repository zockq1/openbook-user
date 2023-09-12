import TitleBox from "../../organisms/ui/TitleBox";
import Layout from "../../atoms/layout/Layout";
import KeywordList from "../../organisms/list/KeywordList";
import SentenceList from "../../organisms/list/SentenceList";
import Button from "../../atoms/button/Button";
import { TopicModel } from "../../../types/topicTypes";

interface TopicLearningTemplateProps {
  topicTitle: string;
  topicInfo: TopicModel;
  handleNextContent?: () => void;
  backLink: string;
}

function TopicLearningTemplate({
  topicTitle,
  topicInfo,
  handleNextContent,
  backLink,
}: TopicLearningTemplateProps) {
  return (
    <Layout>
      <TitleBox
        backLink={backLink}
        title={topicTitle}
        category="주제 학습"
        startDate={topicInfo.startDate}
        endDate={topicInfo.endDate}
      />
      <KeywordList keywordList={topicInfo.keywordList} />
      <SentenceList sentenceList={topicInfo.sentenceList} />
      {handleNextContent && <Button onClick={handleNextContent}>다음</Button>}
    </Layout>
  );
}

export default TopicLearningTemplate;
