import { QuestionModel } from "../../types/questionTypes";
import Layout from "../atoms/Layout";
import TitleBox from "../molecules/TitleBox";
import { LongChoiceQuestion } from "../organisms/Question";

interface FindkeywordGameTemplateProps {
  chapterNumber: number;
  topicTitle: string;
  questionList: QuestionModel[];
  handleNextContent: () => void;
}

function FindKeywordGameTemplate({
  chapterNumber,
  questionList,
  topicTitle,
  handleNextContent,
}: FindkeywordGameTemplateProps) {
  return (
    <Layout>
      <TitleBox
        backLink={`/jeong-ju-haeng/${chapterNumber}`}
        title={topicTitle}
        category="주제 보고 키워드 맞추기"
      ></TitleBox>
      <LongChoiceQuestion
        questionList={questionList}
        choiceType="short"
        handleNextContent={handleNextContent}
      />
    </Layout>
  );
}

export default FindKeywordGameTemplate;
