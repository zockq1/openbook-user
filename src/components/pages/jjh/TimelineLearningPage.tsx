import TimelineLearningTemplate from "../../templates/learning/TimelineLearningTemplate";

import withAuth from "../../../hoc/withAuth";
import useNextContent from "../../../service/useNextContent";
import useQuesryString from "../../../service/useQueryString";

function TimelineLearningPage() {
  const handleNextContent = useNextContent();
  const { timelineId, title } = useQuesryString();
  return (
    <TimelineLearningTemplate
      title={title}
      timelineId={timelineId}
      handleNextContent={handleNextContent}
    />
  );
}
export default withAuth(TimelineLearningPage);
