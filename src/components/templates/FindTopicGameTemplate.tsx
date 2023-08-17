import { QuestionModel } from "../../types/questionTypes";
import Layout from "../atoms/Layout";
import TitleBox from "../molecules/TitleBox";
import { LongChoiceQuestion } from "../organisms/Question";

interface FindTopicGameTemplateProps {
  questionList: QuestionModel[];
  handleNextContent: () => void;
}

function FindTopicGameTemplate({
  questionList,
  handleNextContent,
}: FindTopicGameTemplateProps) {
  return (
    <Layout>
      <TitleBox category="키워드 보고 주제 맞추기 문제"></TitleBox>
      <LongChoiceQuestion
        questionList={questionList}
        choiceType="short"
        handleNextContent={handleNextContent}
      />
    </Layout>
  );
}

export default FindTopicGameTemplate;
