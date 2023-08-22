import { QuestionModel } from "../../types/questionTypes";
import Layout from "../atoms/Layout";
import TitleBox from "../molecules/TitleBox";
import { ChoiceQuestion } from "../organisms/Question";

interface TopicToSentenceQuestionTemplateProps {
  chapterNumber: number;
  topicTitle: string;
  questionList: QuestionModel[];
  handleNextContent: () => void;
}

function TopicToSentenceQuestionTemplate({
  chapterNumber,
  questionList,
  topicTitle,
  handleNextContent,
}: TopicToSentenceQuestionTemplateProps) {
  return (
    <Layout>
      <TitleBox
        backLink={`/jeong-ju-haeng/${chapterNumber}`}
        title={topicTitle}
        category="주제 보고 문장 맞추기"
      ></TitleBox>
      <ChoiceQuestion
        questionList={questionList}
        choiceType="long"
        handleNextContent={handleNextContent}
      />
    </Layout>
  );
}

export default TopicToSentenceQuestionTemplate;
