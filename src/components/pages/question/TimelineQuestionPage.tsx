import { useNavigate, useSearchParams } from "react-router-dom";
import TimelineQuestionTemplate from "../../templates/question/TimelineQuestionTemplate";
import { useGetTimelineQuery } from "../../../store/api/timelineApi";

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
      id={Number(searchParams.get("id"))}
      handleNextContent={() => navigate(-1)}
      dateList={dateList}
    />
  );
}

export default TimelineQuestionPage;
