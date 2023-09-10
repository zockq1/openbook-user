import { QuestionModel } from "../../../types/questionTypes";
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
      <Question
        questionList={questionList}
        handleNextContent={handleNextContent}
        category={category}
        timeLimit={timeLimit || Infinity}
      />
    </Layout>
  );
}

export default QuestionTemplate;
