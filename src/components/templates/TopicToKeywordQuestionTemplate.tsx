import { QuestionModel } from "../../types/questionTypes";
import Layout from "../atoms/Layout";
import TitleBox from "../molecules/TitleBox";
import { ChoiceQuestion } from "../organisms/Question";

interface TopicToKeywordQuestionTemplateProps {
  chapterNumber: number;
  topicTitle: string;
  questionList: QuestionModel[];
  handleNextContent: () => void;
}

function TopicToKeywordQuestionTemplate({
  chapterNumber,
  questionList,
  topicTitle,
  handleNextContent,
}: TopicToKeywordQuestionTemplateProps) {
  return (
    <Layout>
      <TitleBox
        backLink={`/jeong-ju-haeng/${chapterNumber}`}
        title={topicTitle}
        category="주제 보고 키워드 맞추기"
      ></TitleBox>
      <ChoiceQuestion
        questionList={questionList}
        choiceType="short"
        handleNextContent={handleNextContent}
      />
    </Layout>
  );
}

export default TopicToKeywordQuestionTemplate;
