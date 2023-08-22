import { QuestionModel } from "../../types/questionTypes";
import Layout from "../atoms/Layout";
import TitleBox from "../molecules/TitleBox";
import { ChoiceQuestion } from "../organisms/Question";

interface SentenceToTopicQuestionTemplateProps {
  chapterNumber: number;
  questionList: QuestionModel[];
  handleNextContent: () => void;
}

function SentenceToTopicQuestionTemplate({
  chapterNumber,
  questionList,
  handleNextContent,
}: SentenceToTopicQuestionTemplateProps) {
  return (
    <Layout>
      <TitleBox
        backLink={`/jeong-ju-haeng/${chapterNumber}`}
        category="문장 보고 주제 맞추기"
      ></TitleBox>
      <ChoiceQuestion
        questionList={questionList}
        choiceType="long"
        handleNextContent={handleNextContent}
      />
    </Layout>
  );
}

export default SentenceToTopicQuestionTemplate;
