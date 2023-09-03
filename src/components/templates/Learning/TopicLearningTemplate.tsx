import TitleBox from "../../organisms/TitleBox";
import Layout from "../../atoms/Layout";
import KeywordList from "../../organisms/KeywordList";
import SentenceList from "../../organisms/SentenceList";
import Button from "../../atoms/Button";
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
