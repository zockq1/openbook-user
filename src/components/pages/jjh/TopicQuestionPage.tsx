import { useGetTtoKQuestionQuery } from "../../../store/api/questionApi";
import withAuth from "../../../hoc/withAuth";
import useQuesryString from "../../../hooks/useQueryString";
import useNextContent from "../../../hooks/useNextContent";
import { useUpdateProgressMutation } from "../../../store/api/jjhApi";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../unit/ui/TitleBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import Quiz from "../../unit/question/presenter/Quiz.presenter";
import Loading from "../../unit/skeleton/LoadingUI";

function TopicQuestionPage() {
  const { topicTitle, jjhNumber, contentNumber } = useQuesryString();
  const { handleNextContent } = useNextContent();
  const { data: TtoKQuestionList } = useGetTtoKQuestionQuery(topicTitle, {
    refetchOnMountOrArgChange: true,
  });
  const [updateProgres] = useUpdateProgressMutation();

  if (!TtoKQuestionList) {
    return (
      <Layout>
        <TitleBox icon="question" category={`${topicTitle} 문제`} />
        <MainContentLayout>
          <Loading image="question" />
        </MainContentLayout>
      </Layout>
    );
  }

  return (
    <Layout>
      <TitleBox icon="question" category={`${topicTitle} 문제`} />
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
