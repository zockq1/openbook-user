import styled from "styled-components";
import TextBox from "../atoms/TextBox";

interface TimelineTopicProps {
  date: number | null;
  comment: string;
  disableCircle?: boolean;
  isQuestion?: boolean;
}

interface StyledTimelineItemProps {
  isQuestion?: boolean;
}

const StyledTimelineItem = styled.li<StyledTimelineItemProps>`
  display: grid;
  grid-template-columns: 81px 44px max-content;
  align-items: center;
  margin: ${({ isQuestion }) => (isQuestion ? "30px 0" : "15px 0")};
  margin-right: 125px;
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
const Transparent = styled.div`
  background-color: transparent;
  width: 34px;
  height: 34px;
`;

const Date = styled.div`
  color: ${({ theme }) => theme.colors.blue};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.large};

  text-align: right;
  padding: 10px;
`;

function TimelineItem({
  date,
  comment,
  disableCircle = false,
  isQuestion = false,
}: TimelineTopicProps) {
  return (
    <StyledTimelineItem isQuestion={isQuestion}>
      <Date>{date}</Date>
      {disableCircle ? (
        <Transparent />
      ) : (
        <OuterCircle>
          <InnerCircle />
        </OuterCircle>
      )}
      <TextBox maxWidth="half">{comment}</TextBox>
    </StyledTimelineItem>
  );
}

export default TimelineItem;
