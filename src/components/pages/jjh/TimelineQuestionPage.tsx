import TimelineQuestionTemplate from "../../templates/question/TimelineQuestionTemplate";
import withAuth from "../../../hoc/withAuth";
import useNextContent from "../../../service/useNextContent";
import useQuesryString from "../../../service/useQueryString";
import { useGetTimelineQuery } from "../../../store/api/timelineApi";

function TimelineQuestionPage() {
  const handleNextContent = useNextContent();
  const { timelineId, title } = useQuesryString();
  const { data: dateList } = useGetTimelineQuery(timelineId);

  if (!dateList) {
    return <div>Loading...</div>;
  }

  return (
    <TimelineQuestionTemplate
      title={title}
      id={timelineId}
      dateList={dateList}
      handleNextContent={handleNextContent}
    />
  );
}
export default withAuth(TimelineQuestionPage);
