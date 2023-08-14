import TimelineItem from "../molecules/TimelineItem";
import { ColumnList } from "../atoms/List";

interface TimelineListProps {
  dateList: {
    comment: string;
    date: number;
    topicTitle: string;
  }[];
}
function TimelineList({ dateList }: TimelineListProps) {
  return (
    <ColumnList>
      {dateList.map((item, index) => {
        return (
          <TimelineItem
            date={item.date}
            comment={item.comment}
            key={index}
          ></TimelineItem>
        );
      })}
    </ColumnList>
  );
}

export default TimelineList;
