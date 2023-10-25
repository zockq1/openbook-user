import TimelineLearningTemplate from "../../templates/learning/TimelineLearningTemplate";

import { useGetTimelineQuery } from "../../../store/api/questionApi";
import withAuth from "../../../hoc/withAuth";
import useNextContent from "../../../service/useNextContent";
import useQuesryString from "../../../service/useQueryString";

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
