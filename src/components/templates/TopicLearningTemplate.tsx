import TitleBox from "../molecules/TitleBox";
import Layout from "../atoms/Layout";
import KeywordList from "../organisms/KeywordList";
import SentenceList from "../organisms/SentenceList";
import Button from "../atoms/Button";

interface TopicLearningTemplateProps {
  title: string;
  topicInfo: {
    keywordList: {
      name: string;
      comment: string;
    }[];
    sentenceList: string[];
    category: string;
    startDate: number;
    endDate: number;
    extraDate: {
      date: number;
      comment: string;
    }[];
  };
  handleNextProgress: () => void;
}

function TopicLearningTemplate({
  title,
  topicInfo,
  handleNextProgress,
}: TopicLearningTemplateProps) {
  return (
    <Layout>
      <TitleBox
        title={title}
        category="주제 학습"
        startDate={topicInfo.startDate}
        endDate={topicInfo.endDate}
      />
      <KeywordList keywordList={topicInfo.keywordList} />
      <SentenceList sentenceList={topicInfo.sentenceList} />
      <Button onClick={handleNextProgress}>다음</Button>
    </Layout>
  );
}

export default TopicLearningTemplate;
