import { useGetKtoTQuestionQuery } from "../../../store/api/questionApi";
import withAuth from "../../../hoc/withAuth";
import useQuesryString from "../../../service/useQueryString";
import useNextContent from "../../../service/useNextContent";
import { useUpdateProgressMutation } from "../../../store/api/jjhApi";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../unit/ui/TitleBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import Quiz from "../../unit/question/presenter/Quiz.presenter";
import Loading from "../../unit/skeleton/LoadingUI";

function ChapterQuestionPage() {
  const { handleNextContent } = useNextContent();
  const { chapterNumber, jjhNumber, contentNumber, title } = useQuesryString();
  const { data: KtoTQuestionList } = useGetKtoTQuestionQuery(chapterNumber, {
    refetchOnMountOrArgChange: true,
  });
  const [updateProgres] = useUpdateProgressMutation();

  if (!KtoTQuestionList) {
    return (
      <Layout>
        <TitleBox icon="question" category={`${title} 마무리 문제`} />
        <MainContentLayout>
          <Loading image="question" />
        </MainContentLayout>
      </Layout>
    );
  }

  return (
    <Layout>
      <TitleBox icon="question" category={`${title} 마무리 문제`} />
      <MainContentLayout>
        <Quiz
          quizList={KtoTQuestionList}
          onNextContent={() => handleNextContent(jjhNumber, contentNumber)}
          onFinish={() => updateProgres({ contentNumber: contentNumber + 1 })}
          isJJH
        />
      </MainContentLayout>
    </Layout>
  );
}

export default withAuth(ChapterQuestionPage);
