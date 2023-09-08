import { useNavigate, useSearchParams } from "react-router-dom";
import TimelineQuestionTemplate from "../../templates/Question/TimelineQuestionTemplate";
import { useGetTimelineQuery } from "../../../store/api/questionApi";

function TimelineQuestionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: dateList } = useGetTimelineQuery(
    Number(searchParams.get("chapter")) || -1
  );

  const handleNext = () => {
    navigate("/question");
  };

  if (!dateList) {
    return <div>Loading...</div>;
  }

  return (
    <TimelineQuestionTemplate
      backLink="/question"
      handleNextContent={handleNext}
      dateList={dateList}
    />
  );
}

export default TimelineQuestionPage;
