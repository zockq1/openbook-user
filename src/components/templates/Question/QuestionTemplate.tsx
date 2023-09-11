import { QuestionModel } from "../../../types/questionTypes";
import Button from "../../atoms/Button";
import Layout from "../../atoms/Layout";
import { Question } from "../../organisms/Question";
import TitleBox from "../../organisms/TitleBox";

interface QuestionTemplateProps {
  backLink: string;
  questionList: QuestionModel[];
  title?: string;
  category: string;
  timeLimit?: number;
  handleNextContent: () => void;
}

function QuestionTemplate({
  backLink,
  questionList,
  title,
  category,
  timeLimit,
  handleNextContent,
}: QuestionTemplateProps) {
  return (
    <Layout>
      <TitleBox backLink={backLink} title={title} category={category} />
      {questionList.length === 0 ? (
        <Button onClick={handleNextContent}>다음</Button>
      ) : (
        <Question
          questionList={questionList}
          handleNextContent={handleNextContent}
          category={category}
          timeLimit={timeLimit || Infinity}
        />
      )}
    </Layout>
  );
}

export default QuestionTemplate;
