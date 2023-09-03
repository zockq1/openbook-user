import { QuestionModel } from "../../../types/questionTypes";
import Layout from "../../atoms/Layout";
import { ChoiceQuestion } from "../../organisms/Question";
import TitleBox from "../../organisms/TitleBox";

interface QuestionTemplateProps {
  backLink: string;
  questionList: QuestionModel[];
  title?: string;
  category: string;
  handleNextContent: () => void;
}

function QuestionTemplate({
  backLink,
  questionList,
  title,
  category,
  handleNextContent,
}: QuestionTemplateProps) {
  return (
    <Layout>
      <TitleBox backLink={backLink} title={title} category={category} />
      <ChoiceQuestion
        questionList={questionList}
        handleNextContent={handleNextContent}
      />
    </Layout>
  );
}

export default QuestionTemplate;
