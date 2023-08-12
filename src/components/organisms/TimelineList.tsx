import styled from "styled-components";
import TimelineItem from "../molecules/TimelineItem";

interface TimelineListProps {
  dateList: {
    comment: string;
    date: number;
  }[];
}

const StyledTimelineList = styled.ul`
  display: flex;
  flex-direction: column;
`;

function TimelineList({ dateList }: TimelineListProps) {
  return (
    <StyledTimelineList>
      {dateList.map((item, index) => {
        return (
          <TimelineItem
            date={item.date}
            comment={item.comment}
            key={index}
          ></TimelineItem>
        );
      })}
    </StyledTimelineList>
  );
}

export default TimelineList;
