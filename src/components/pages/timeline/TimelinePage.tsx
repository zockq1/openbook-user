import TimelineLearningTemplate from "../../templates/learning/TimelineLearningTemplate";
import useQuesryString from "../../../service/useQueryString";

function TimelinePage() {
  const { title, timelineId } = useQuesryString();

  return <TimelineLearningTemplate title={title} timelineId={timelineId} />;
}

export default TimelinePage;
