import TimelineItem from "../presenter/TimelineItem.presenter";
import styled from "styled-components";

interface TimelineListProps {
  dateList: {
    comment: string;
    date: number | string | null;
    keywordList: string[] | null;
  }[];
}

const Line = styled.li`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.textBlue};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  width: 6px;
  height: 100%;
  left: 84px;
  z-index: 0;
`;

const StyledTimelineList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  padding: 10px;
`;

function TimelineListUI({ dateList }: TimelineListProps) {
  if (dateList.length === 0) return null;
  return (
    <StyledTimelineList>
      <Line />
      {dateList.map((item, index) => {
        return <TimelineItem dateItem={item} key={index} />;
      })}
    </StyledTimelineList>
  );
}

export default TimelineListUI;
