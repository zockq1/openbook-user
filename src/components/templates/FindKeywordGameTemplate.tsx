import { QuestionModel } from "../../types/questionTypes";
import Layout from "../atoms/Layout";
import TitleBox from "../molecules/TitleBox";
import { LongChoiceQuestion } from "../organisms/Question";

interface FindkeywordGameTemplateProps {
  topicTitle: string;
  questionList: QuestionModel[];
  handleNextProgress: () => void;
}

function FindKeywordGameTemplate({
  questionList,
  topicTitle,
  handleNextProgress,
}: FindkeywordGameTemplateProps) {
  return (
    <Layout>
      <TitleBox
        title={topicTitle}
        category="주제 보고 키워드 맞추기 문제"
      ></TitleBox>
      <LongChoiceQuestion
        questionList={questionList}
        choiceType="short"
        handleNextProgress={handleNextProgress}
      />
    </Layout>
  );
}

export default FindKeywordGameTemplate;
