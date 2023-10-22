import { QuestionModel } from "../../../types/questionTypes";
import Button from "../../atoms/button/Button";
import Layout from "../../atoms/layout/Layout";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import { Question } from "../../organisms/question/Question";
import TitleBox from "../../organisms/ui/TitleBox";

interface QuestionTemplateProps {
  handleBackPage: () => void;
  questionList: QuestionModel[];
  title?: string;
  timeLimit?: number;
  handleNextContent: () => void;
}

function QuestionTemplate({
  handleBackPage,
  questionList,
  title,
  timeLimit,
  handleNextContent,
}: QuestionTemplateProps) {
  return (
    <Layout>
      <TitleBox
        handleBackPage={handleBackPage}
        title={title}
        icon="question"
        category="퀴즈"
      />
      <MainContentLayout>
        {questionList.length === 0 ? (
          <Button onClick={handleNextContent}>다음</Button>
        ) : (
          <Question
            quizList={questionList.filter((item) => item !== null)}
            handleNextContent={handleNextContent}
            timeLimit={timeLimit || Infinity}
          />
        )}
      </MainContentLayout>
    </Layout>
  );
}

export default QuestionTemplate;
