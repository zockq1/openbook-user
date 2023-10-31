import { useSelector } from "react-redux";
import { useGetTimelineQuery } from "../../../../store/api/timelineApi";
import TimelineListUI from "../container/TimelineListUI.container";
import { RootState } from "../../../../store/store";

interface TimelineListProps {
  id: number;
}

function TimelineList({ id }: TimelineListProps) {
  const { data: dateList } = useGetTimelineQuery(id);
  const isKeywordCommentOn = useSelector(
    (state: RootState) => state.keyword.isKeywordCommentOn
  );

  if (!dateList) return <></>;
  return (
    <TimelineListUI dateList={dateList} isKeywordOpen={isKeywordCommentOn} />
  );
}

export default TimelineList;
