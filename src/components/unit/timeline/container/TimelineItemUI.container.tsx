import styled from "styled-components";
import TextBox from "../../../atoms/box/TextBox";
import CommentUI from "../../topic/container/CommentUI.container";
import Icon from "../../../atoms/icon/Icon";

interface TimelineTopicProps {
  dateItem: {
    comment: string;
    date: number | string | null;
    keywordList: string[] | null;
  };
  disableCircle?: boolean;
  isQuestion?: boolean;
  isCommentOn: boolean;
  onCommentToggle: () => void;
}

interface StyledTimelineItemProps {
  isQuestion?: boolean;
}

const StyledTimelineItem = styled.li<StyledTimelineItemProps>`
  display: grid;
  grid-template-columns: 30px 34px max-content;
  align-items: center;
  margin: ${({ isQuestion }) => (isQuestion ? "30px 0" : "15px 0")};
  margin-right: 64px;
`;

const InnerCircle = styled.div`
  margin: 10px;
  background-color: ${({ theme }) => theme.colors.bgBlue};
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.colors.textBlue};
  z-index: 99;
  position: relative;
`;

const Transparent = styled.div`
  background-color: transparent;
  width: 34px;
  height: 34px;
`;

const Date = styled.div`
  color: ${({ theme }) => theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.small};
  text-align: right;
`;

const CommentContainer = styled.div`
  position: relative;
  margin-left: 64px;
`;

function TimelineItemUI({
  dateItem,
  isCommentOn,
  onCommentToggle,
  disableCircle = false,
  isQuestion = false,
}: TimelineTopicProps) {
  const { comment, date, keywordList } = dateItem;
  return (
    <>
      <StyledTimelineItem isQuestion={isQuestion}>
        <Date>
          {typeof date === "number" ? Math.floor(Number(date) / 10000) : date}
        </Date>
        {disableCircle ? <Transparent /> : <InnerCircle />}
        <TextBox maxWidth="half" onClick={onCommentToggle}>
          {comment}
        </TextBox>
      </StyledTimelineItem>
      <CommentContainer>
        {!isQuestion && keywordList && keywordList.length > 0 && (
          <CommentUI
            isCommentOpen={isCommentOn}
            commentList={keywordList.map((item) => {
              return { comment: item, icon: <Icon icon="check" /> };
            })}
          />
        )}
      </CommentContainer>
    </>
  );
}

export default TimelineItemUI;
