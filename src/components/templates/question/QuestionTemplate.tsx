import { QuestionModel } from "../../../types/questionTypes";
import Button from "../../atoms/button/Button";
import Layout from "../../atoms/layout/Layout";
import { Question } from "../../organisms/question/Question";
import TitleBox from "../../organisms/ui/TitleBox";

interface QuestionTemplateProps {
  handleBackPage: () => void;
  questionList: QuestionModel[];
  title?: string;
  category: string;
  timeLimit?: number;
  handleNextContent: () => void;
}

function QuestionTemplate({
  handleBackPage,
  questionList,
  title,
  category,
  timeLimit,
  handleNextContent,
}: QuestionTemplateProps) {
  return (
    <Layout>
      <TitleBox
        handleBackPage={handleBackPage}
        title={title}
        category={category}
      />
      {questionList.length === 0 ? (
        <Button onClick={handleNextContent}>다음</Button>
      ) : (
        <Question
          questionList={questionList.filter((item) => item !== null)}
          handleNextContent={handleNextContent}
          category={category}
          timeLimit={timeLimit || Infinity}
        />
      )}
    </Layout>
  );
}

export default QuestionTemplate;
