import { QuizModel } from "../../../types/questionTypes";
import Layout from "../../atoms/layout/Layout";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import TitleBox from "../../organisms/ui/TitleBox";
import Quiz from "../../unit/question/presenter/Quiz.presenter";

interface QuestionTemplateProps {
  questionList: QuizModel[];
  title?: string;
  onNextContent: () => void;
}

function QuestionTemplate({
  questionList,
  title,
  onNextContent,
}: QuestionTemplateProps) {
  return (
    <Layout>
      <TitleBox icon="question" category="퀴즈" />
      <MainContentLayout>
        <Quiz quizList={questionList} onNextContent={onNextContent} />
      </MainContentLayout>
    </Layout>
  );
}

export default QuestionTemplate;
