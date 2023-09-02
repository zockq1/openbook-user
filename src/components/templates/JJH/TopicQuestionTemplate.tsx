import { QuestionModel } from "../../../types/questionTypes";
import Layout from "../../atoms/Layout";
import TitleBox from "../../organisms/TitleBox";
import { ChoiceQuestion } from "../../organisms/Question";

interface TopicQuestionTemplateProps {
  chapterNumber: number;
  topicTitle: string;
  questionList: QuestionModel[];
  handleNextContent: () => void;
}

function TopicQuestionTemplate({
  chapterNumber,
  questionList,
  topicTitle,
  handleNextContent,
}: TopicQuestionTemplateProps) {
  return (
    <Layout>
      <TitleBox
        backLink={`/jeong-ju-haeng/${chapterNumber}`}
        title={topicTitle}
        category="주제별 문제"
      />
      <ChoiceQuestion
        questionList={questionList}
        handleNextContent={handleNextContent}
      />
    </Layout>
  );
}

export default TopicQuestionTemplate;
