import TimelineLearningTemplate from "../../templates/learning/TimelineLearningTemplate";
import useQuesryString from "../../../service/useQueryString";
import { useGetTimelineQuery } from "../../../store/api/timelineApi";

function TimelinePage() {
  const { title, timelineId } = useQuesryString();
  const { data: dateList } = useGetTimelineQuery(timelineId);

  return <TimelineLearningTemplate title={title} dateList={dateList || []} />;
}

export default TimelinePage;
