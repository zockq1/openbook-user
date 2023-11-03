import { useGetKtoTQuestionQuery } from "../../../store/api/questionApi";
import QuestionTemplate from "../../templates/question/QuestionTemplate";
import withAuth from "../../../hoc/withAuth";
import useQuesryString from "../../../service/useQueryString";
import useNextContent from "../../../service/useNextContent";

function ChapterQuestionPage() {
  const handleNextContent = useNextContent();
  const { chapterNumber, jjhNumber, contentNumber } = useQuesryString();
  const { data: KtoTQuestionList } = useGetKtoTQuestionQuery(chapterNumber, {
    refetchOnMountOrArgChange: true,
  });

  if (!KtoTQuestionList) {
    return <div>Loading...</div>;
  }

  return (
    <QuestionTemplate
      questionList={KtoTQuestionList || []}
      onNextContent={() => handleNextContent(jjhNumber, contentNumber)}
    />
  );
}

export default withAuth(ChapterQuestionPage);
