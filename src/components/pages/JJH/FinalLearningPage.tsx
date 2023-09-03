import { useNavigate, useParams } from "react-router-dom";
import useGetExKtoTQuestionList from "../../../example/useGetExKtoTQuestionList";
import useGetExStoTQuestionList from "../../../example/useGetExStoTQuestionList";
import {
  useGetKtoTQuestionQuery,
  useGetStoTQuestionQuery,
} from "../../../store/api/questionApi";
import { QuestionModel } from "../../../types/questionTypes";
import { useEffect, useState } from "react";
import QuestionTemplate from "../../templates/Question/QuestionTemplate";

function FinalLearningPage() {
  const { chapter } = useParams();
  const navigate = useNavigate();
  /******************************* 실제 코드 *********************************/
  // const { data: KtoTQuestionList } = useGetKtoTQuestionQuery(Number(chapter));
  // const { data: StoTQuestionList } = useGetStoTQuestionQuery(Number(chapter));
  /************************ ↓예시 코드↓ / ↑실제 코드↑ **************************/
  const { data: KtoTQuestionList } = useGetExKtoTQuestionList();
  const { data: StoTQuestionList } = useGetExStoTQuestionList();
  /******************************* 예시 코드 *********************************/
  const [questionList, setQuestionList] = useState<QuestionModel[]>([]);

  useEffect(() => {
    const questionList1 = KtoTQuestionList ? [...KtoTQuestionList] : [];
    const questionList2 = StoTQuestionList ? [...StoTQuestionList] : [];
    setQuestionList([...questionList1, ...questionList2]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNextContent = () => {
    navigate(`/jeong-ju-haeng`);
  };

  if (questionList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <QuestionTemplate
      backLink={`/jeong-ju-haeng/${chapter}`}
      questionList={questionList}
      handleNextContent={handleNextContent}
      category="단원 마무리 학습"
    />
  );
}

export default FinalLearningPage;
