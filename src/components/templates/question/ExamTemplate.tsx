import { ExamModel } from "../../../types/questionTypes";
import Button from "../../atoms/button/Button";
import Layout from "../../atoms/layout/Layout";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import { Exam } from "../../organisms/question/Exam";
import TitleBox from "../../organisms/ui/TitleBox";

interface ExamTemplateProps {
  examList: ExamModel[];
  title?: string;
  timeLimit?: number;
  handleNextContent: () => void;
}

function ExamTemplate({
  examList,
  title,
  timeLimit,
  handleNextContent,
}: ExamTemplateProps) {
  return (
    <Layout>
      <TitleBox title={title} icon="pen" category="모의 고사" />
      <MainContentLayout>
        {examList.length === 0 ? (
          <Button onClick={handleNextContent}>다음</Button>
        ) : (
          <Exam
            examList={examList.filter((item) => item !== null)}
            handleNextContent={handleNextContent}
            timeLimit={timeLimit || Infinity}
          />
        )}
      </MainContentLayout>
    </Layout>
  );
}

export default ExamTemplate;
