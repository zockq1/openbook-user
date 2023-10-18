import { useNavigate, useParams } from "react-router-dom";
import { useGetKtoTQuestionQuery } from "../../../store/api/questionApi";
import QuestionTemplate from "../../templates/question/QuestionTemplate";
import { useUpdateProgressMutation } from "../../../store/api/chapterApi";
import withAuth from "../../../hoc/withAuth";

function FinalLearningPage() {
  const { chapter } = useParams();
  const navigate = useNavigate();
  const { data: KtoTQuestionList } = useGetKtoTQuestionQuery(Number(chapter));
  const [updateProgres] = useUpdateProgressMutation();

  const handleNextContent = () => {
    updateProgres({
      content: "단원 학습",
      title: String(Number(chapter) + 1),
      state: "Open",
    });
    navigate(`/jeong-ju-haeng`);
  };

  if (!KtoTQuestionList) {
    return <div>Loading...</div>;
  }

  return (
    <QuestionTemplate
      handleBackPage={() => navigate(`/jeong-ju-haeng/${chapter}`)}
      questionList={KtoTQuestionList || []}
      handleNextContent={handleNextContent}
    />
  );
}

export default withAuth(FinalLearningPage);
