import { QuestionModel } from "../../../types/questionTypes";
import Layout from "../../atoms/Layout";
import TitleBox from "../../organisms/TitleBox";
import { ChoiceQuestion } from "../../organisms/Question";

interface FinalQuestionTemplateProps {
  chapterNumber: number;
  questionList: QuestionModel[];
  handleNextContent: () => void;
}

function FinalQuestionTemplate({
  chapterNumber,
  questionList,
  handleNextContent,
}: FinalQuestionTemplateProps) {
  return (
    <Layout>
      <TitleBox
        backLink={`/jeong-ju-haeng/${chapterNumber}`}
        category="단원 마무리 학습"
      />
      <ChoiceQuestion
        questionList={questionList}
        handleNextContent={handleNextContent}
      />
    </Layout>
  );
}

export default FinalQuestionTemplate;
