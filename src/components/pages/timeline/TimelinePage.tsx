import TimelineLearningTemplate from "../../templates/learning/TimelineLearningTemplate";
import { useGetTimelineQuery } from "../../../store/api/questionApi";
import useQuesryString from "../../../service/useQueryString";

function TimelinePage() {
  const { title, timelineId } = useQuesryString();
  const { data: dateList } = useGetTimelineQuery(timelineId);

  return <TimelineLearningTemplate title={title} dateList={dateList || []} />;
}

export default TimelinePage;
