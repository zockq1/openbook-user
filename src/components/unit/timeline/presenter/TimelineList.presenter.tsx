import { useGetTimelineQuery } from "../../../../store/api/timelineApi";
import TimelineListUI from "../container/TimelineListUI.container";

interface TimelineListProps {
  id: number;
}

function TimelineList({ id }: TimelineListProps) {
  const { data: dateList } = useGetTimelineQuery(id);

  if (!dateList) return <></>;
  return <TimelineListUI dateList={dateList} />;
}

export default TimelineList;
