import { TimeLineItemModel } from "../../../../types/timelinetypes";
import TimelineItemUI from "./TimelineItemUI.container";
import styled from "styled-components";

interface TimelineListProps {
  dateList: TimeLineItemModel[];
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

function TimelineListUI({ dateList }: TimelineListProps) {
  return (
    <StyledTimelineList>
      <Line />
      {dateList.map((item, index) => {
        return (
          <TimelineItemUI
            date={item.date}
            comment={item.comment}
            key={index}
          ></TimelineItemUI>
        );
      })}
    </StyledTimelineList>
  );
}

export default TimelineListUI;
