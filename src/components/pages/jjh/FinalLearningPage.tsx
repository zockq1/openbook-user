import { useNavigate, useParams } from "react-router-dom";
import {
  useGetKtoTQuestionQuery,
  useGetStoTQuestionQuery,
} from "../../../store/api/questionApi";
import { QuestionModel } from "../../../types/questionTypes";
import { useEffect, useState } from "react";
import QuestionTemplate from "../../templates/question/QuestionTemplate";
import { useUpdateProgressMutation } from "../../../store/api/chapterApi";
import withAuth from "../../../hoc/withAuth";

function FinalLearningPage() {
  const { chapter } = useParams();
  const navigate = useNavigate();
  const { data: KtoTQuestionList } = useGetKtoTQuestionQuery(Number(chapter));
  const { data: StoTQuestionList } = useGetStoTQuestionQuery(Number(chapter));
  const [updateProgres] = useUpdateProgressMutation();
  const [questionList, setQuestionList] = useState<QuestionModel[]>([]);

  useEffect(() => {
    const questionList1 = KtoTQuestionList ? [...KtoTQuestionList] : [];
    const questionList2 = StoTQuestionList ? [...StoTQuestionList] : [];
    setQuestionList([...questionList1, ...questionList2]);
  }, [KtoTQuestionList, StoTQuestionList]);

  const handleNextContent = () => {
    updateProgres({
      content: "단원 학습",
      title: String(Number(chapter) + 1),
      state: "Open",
    });
    navigate(`/jeong-ju-haeng`);
  };

  if (questionList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <QuestionTemplate
      handleBackPage={() => navigate(`/jeong-ju-haeng/${chapter}`)}
      questionList={questionList}
      handleNextContent={handleNextContent}
      category="단원 마무리 문제"
    />
  );
}

export default withAuth(FinalLearningPage);
