import TimelineLearningTemplate from "../../templates/learning/TimelineLearningTemplate";

import withAuth from "../../../hoc/withAuth";
import useNextContent from "../../../service/useNextContent";
import useQuesryString from "../../../service/useQueryString";
import { useGetTimelineQuery } from "../../../store/api/timelineApi";

function TimelineLearningPage() {
  const handleNextContent = useNextContent();
  const { timelineId, title } = useQuesryString();
  const { data: dateList } = useGetTimelineQuery(timelineId);

  if (!dateList) {
    return <div>Loading...</div>;
  }
  return (
    <TimelineLearningTemplate
      title={title}
      dateList={dateList || []}
      handleNextContent={handleNextContent}
    />
  );
}
export default withAuth(TimelineLearningPage);
