import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetRandomQuestionQuery } from "../../../store/api/questionApi";
import Layout from "../../atoms/layout/Layout";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import TitleBox from "../../organisms/ui/TitleBox";
import Quiz from "../../unit/question/presenter/Quiz.presenter";
import QuestionLoading from "../../unit/skeleton/LoadingUI";

function QuizPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data: questionList } = useGetRandomQuestionQuery(
    {
      id: Number(searchParams.get("id")),
      numberOfQuestion: Number(searchParams.get("noq")) || 5,
    },
    { refetchOnMountOrArgChange: true }
  );

  if (!questionList) {
    return (
      <Layout>
        <TitleBox icon="question" category="퀴즈" />
        <MainContentLayout>
          <QuestionLoading image="question" />
        </MainContentLayout>
      </Layout>
    );
  }

  return (
    <Layout>
      <TitleBox icon="question" category="퀴즈" />
      <MainContentLayout>
        <Quiz quizList={questionList} onNextContent={() => navigate(-1)} />
      </MainContentLayout>
    </Layout>
  );
}

export default QuizPage;
