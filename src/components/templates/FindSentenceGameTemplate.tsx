import { QuestionModel } from "../../types/questionTypes";
import Layout from "../atoms/Layout";
import TitleBox from "../molecules/TitleBox";
import { LongChoiceQuestion } from "../organisms/Question";

interface FindSentenceGameTemplateProps {
  topicTitle: string;
  questionList: QuestionModel[];
  handleNextProgress: () => void;
}

function FindSentenceGameTemplate({
  questionList,
  topicTitle,
  handleNextProgress,
}: FindSentenceGameTemplateProps) {
  return (
    <Layout>
      <TitleBox
        title={topicTitle}
        category="주제 보고 문장 맞추기 문제"
      ></TitleBox>
      <LongChoiceQuestion
        questionList={questionList}
        choiceType="long"
        handleNextProgress={handleNextProgress}
      />
    </Layout>
  );
}

export default FindSentenceGameTemplate;
