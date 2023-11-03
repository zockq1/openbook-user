import { useGetTtoKQuestionQuery } from "../../../store/api/questionApi";
import QuestionTemplate from "../../templates/question/QuestionTemplate";
import withAuth from "../../../hoc/withAuth";
import useQuesryString from "../../../service/useQueryString";
import useNextContent from "../../../service/useNextContent";

function TopicQuestionPage() {
  const { topicTitle, jjhNumber, contentNumber } = useQuesryString();
  const handleNextContent = useNextContent();
  const { data: TtoKQuestionList, isLoading: isTtoKQuestionListLoading } =
    useGetTtoKQuestionQuery(topicTitle, { refetchOnMountOrArgChange: true });

  if (isTtoKQuestionListLoading) {
    return <div>Loading...</div>;
  }

  return (
    <QuestionTemplate
      title={""}
      questionList={TtoKQuestionList || []}
      onNextContent={() => handleNextContent(jjhNumber, contentNumber)}
    />
  );
}
export default withAuth(TopicQuestionPage);
