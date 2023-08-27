import { QuestionModel } from "../../types/questionTypes";
import Layout from "../atoms/Layout";
import TitleBox from "../molecules/TitleBox";
import { ChoiceQuestion } from "../organisms/Question";

interface KeywordToTopicQuestionTemplateProps {
  chapterNumber: number;
  questionList: QuestionModel[];
  handleNextContent: () => void;
}

function KeywordToTopicQuestionTemplate({
  chapterNumber,
  questionList,
  handleNextContent,
}: KeywordToTopicQuestionTemplateProps) {
  return (
    <Layout>
      <TitleBox
        backLink={`/jeong-ju-haeng/${chapterNumber}`}
        category="키워드 보고 주제 맞추기"
      ></TitleBox>
      <ChoiceQuestion
        questionList={questionList}
        choiceType="short"
        handleNextContent={handleNextContent}
      />
    </Layout>
  );
}

export default KeywordToTopicQuestionTemplate;