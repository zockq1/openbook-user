import { QuestionModel } from "../../../types/questionTypes";
import Button from "../../atoms/button/Button";
import Layout from "../../atoms/layout/Layout";
import { Exam } from "../../organisms/question/Exam";
import { Question } from "../../organisms/question/Question";
import TitleBox from "../../organisms/ui/TitleBox";

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
      ) : category === "모의고사" ? (
        <Exam
          questionList={questionList.filter((item) => item !== null)}
          handleNextContent={handleNextContent}
          category={category}
          timeLimit={timeLimit || Infinity}
        />
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
