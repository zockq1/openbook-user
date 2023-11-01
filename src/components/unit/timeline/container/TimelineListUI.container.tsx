import { TimeLineItemModel } from "../../../../types/timelinetypes";
import TimelineItemUI from "./TimelineItemUI.container";
import styled from "styled-components";

interface TimelineListProps {
  dateList: TimeLineItemModel[];
  isKeywordOpen: boolean;
}

const Line = styled.li`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.textBlue};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  width: 6px;
  height: 100%;
  left: 64px;
  z-index: 0;
`;

const StyledTimelineList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

function TimelineListUI({ dateList, isKeywordOpen }: TimelineListProps) {
  return (
    <StyledTimelineList>
      <Line />
      {dateList.map((item, index) => {
        return (
          <TimelineItemUI
            dateItem={item}
            key={index}
            isKeywordOpen={isKeywordOpen}
          />
        );
      })}
    </StyledTimelineList>
  );
}

export default TimelineListUI;
