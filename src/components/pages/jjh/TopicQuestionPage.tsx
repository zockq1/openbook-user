import { useGetTtoKQuestionQuery } from "../../../store/api/questionApi";
import withAuth from "../../../hoc/withAuth";
import useQuesryString from "../../../service/useQueryString";
import useNextContent from "../../../service/useNextContent";
import { useUpdateProgressMutation } from "../../../store/api/jjhApi";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../organisms/ui/TitleBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import Quiz from "../../unit/question/presenter/Quiz.presenter";

function TopicQuestionPage() {
  const { topicTitle, jjhNumber, contentNumber } = useQuesryString();
  const { handleNextContent } = useNextContent();
  const { data: TtoKQuestionList } = useGetTtoKQuestionQuery(topicTitle, {
    refetchOnMountOrArgChange: true,
  });
  const [updateProgres] = useUpdateProgressMutation();

  if (!TtoKQuestionList) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <TitleBox icon="question" category="퀴즈" />
      <MainContentLayout>
        <Quiz
          quizList={TtoKQuestionList}
          onNextContent={() => handleNextContent(jjhNumber, contentNumber)}
          onFinish={() => updateProgres({ contentNumber: contentNumber + 1 })}
          isJJH
        />
      </MainContentLayout>
    </Layout>
  );
}
export default withAuth(TopicQuestionPage);
