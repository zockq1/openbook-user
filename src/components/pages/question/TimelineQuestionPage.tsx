import { useNavigate, useSearchParams } from "react-router-dom";
import TimelineQuestionTemplate from "../../templates/question/TimelineQuestionTemplate";
import { useGetTimelineQuery } from "../../../store/api/timelineApi";
import useQuesryString from "../../../service/useQueryString";

function TimelineQuestionPage() {
  const { timelineId, title } = useQuesryString();
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
      title={title}
      id={timelineId}
      handleNextContent={() => navigate(-1)}
      dateList={dateList}
    />
  );
}

export default TimelineQuestionPage;
