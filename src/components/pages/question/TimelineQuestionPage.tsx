import { useNavigate, useSearchParams } from "react-router-dom";
import TimelineQuestionTemplate from "../../templates/question/TimelineQuestionTemplate";
import { useGetTimelineQuery } from "../../../store/api/questionApi";

function TimelineQuestionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: dateList } = useGetTimelineQuery(
    Number(searchParams.get("id"))
  );

  if (!dateList) {
    return <div>Loading...</div>;
  }

  return (
    <TimelineQuestionTemplate
      chapter={Number(searchParams.get("id"))}
      handleBackPage={() => navigate("/question")}
      handleNextContent={() => navigate("/question")}
      dateList={dateList}
    />
  );
}

export default TimelineQuestionPage;
