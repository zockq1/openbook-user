import TimelineItem from "../../molecules/list-item/TimelineItem";
import { TimeLineModel } from "../../../types/questionTypes";
import styled from "styled-components";

interface TimelineListProps {
  dateList: TimeLineModel[];
}

const Line = styled.li`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.blue};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  width: 16px;
  height: 100%;
  left: 90px;
  z-index: 0;
`;

const StyledTimelineList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  & > :last-child {
    margin-bottom: 30px;
  }
`;

function TimelineList({ dateList }: TimelineListProps) {
  return (
    <StyledTimelineList>
      <Line />
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
