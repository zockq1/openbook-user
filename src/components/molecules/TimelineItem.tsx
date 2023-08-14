import styled from "styled-components";
import TextBox from "../atoms/TextBox";

interface TimelineTopicProps {
  date: number;
  comment: string;
}

const StyledTimelineItem = styled.li`
  display: grid;
  grid-template-columns: 81px 44px max-content;
  align-items: center;
  margin-top: 30px;
`;

const InnerCircle = styled.div`
  margin: 10px;
  background-color: ${({ theme }) => theme.colors.bg};
  width: 14px;
  height: 14px;
  border-radius: 50%;
  z-index: 99;
  position: relative;
`;

const OuterCircle = styled.div`
  background-color: ${({ theme }) => theme.colors.blue};
  width: 34px;
  height: 34px;
  border-radius: 50%;
  z-index: 98;
`;

const Date = styled.div`
  color: ${({ theme }) => theme.colors.blue};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.large};

  text-align: right;
  padding: 10px;
`;

function TimelineItem({ date, comment }: TimelineTopicProps) {
  return (
    <StyledTimelineItem>
      <Date>{date}</Date>
      <OuterCircle>
        <InnerCircle />
      </OuterCircle>
      <TextBox maxWidth="half">{comment}</TextBox>
    </StyledTimelineItem>
  );
}

export default TimelineItem;
