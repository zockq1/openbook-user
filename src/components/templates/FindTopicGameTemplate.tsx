import { QuestionModel } from "../../types/questionTypes";
import Layout from "../atoms/Layout";
import TitleBox from "../molecules/TitleBox";
import { LongChoiceQuestion } from "../organisms/Question";

interface FindTopicGameTemplateProps {
  topicTitle: string;
  questionList: QuestionModel[];
  handleNextProgress: () => void;
}

function FindTopicGameTemplate({
  questionList,
  topicTitle,
  handleNextProgress,
}: FindTopicGameTemplateProps) {
  return (
    <Layout>
      <TitleBox
        title={topicTitle}
        category="키워드 보고 주제 맞추기 문제"
      ></TitleBox>
      <LongChoiceQuestion
        questionList={questionList}
        choiceType="short"
        handleNextProgress={handleNextProgress}
      />
    </Layout>
  );
}

export default FindTopicGameTemplate;
