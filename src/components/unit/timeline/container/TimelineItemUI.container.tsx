import styled from "styled-components";
import CommentUI from "../../topic/container/CommentUI.container";
import Icon from "../../../atoms/icon/Icon";

interface TimelineTopicProps {
  dateItem: {
    comment: string;
    date: number | string | null;
    keywordList: string[] | null;
  };
  isQuestion?: boolean;
  isCommentOn: boolean;
  onCommentToggle: () => void;
  isTopic?: boolean;
}

interface StyledTimelineItemProps {
  isQuestion?: boolean;
}

const StyledTimelineItem = styled.li<StyledTimelineItemProps>`
  display: grid;
  grid-template-columns: 63px 34px 1fr;
  align-items: center;
  margin: ${({ isQuestion }) => (isQuestion ? "30px 0" : "10px 0 5px")};
  //margin-right: 97px;
`;

const InnerCircle = styled.div`
  margin: 10px;
  background-color: ${({ theme }) => theme.colors.bgBlue};
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.colors.textBlue};
  z-index: 9;
  position: relative;
`;

const Title = styled.div<{ comment: boolean }>`
  width: fit-content;
  padding: ${({ theme }) => theme.padding.small};
  border-radius: 10px 10px 2px 2px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.textBlue};
  border-bottom: ${({ theme, comment }) =>
    comment
      ? `3px solid ${theme.colors.lightGrey}`
      : `1px solid ${theme.colors.lightGrey}`};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.small};
  z-index: 1;
  word-break: keep-all;
  cursor: pointer;
`;

const Date = styled.div`
  display: flex;
  justify-content: end;
`;

const DateItem = styled.div`
  width: fit-content;
  color: ${({ theme }) => theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.small};
  text-align: right;
`;

const CommentContainer = styled.div`
  position: relative;
  margin-left: 98px;
`;

function TimelineItemUI({
  dateItem,
  isCommentOn,
  onCommentToggle,
  isQuestion = false,
  isTopic = false,
}: TimelineTopicProps) {
  const { comment, date, keywordList } = dateItem;
  return (
    <>
      <StyledTimelineItem isQuestion={isQuestion}>
        <Date>
          <DateItem>
            {typeof date === "number" ? Math.floor(Number(date) / 10000) : date}
          </DateItem>
        </Date>
        <InnerCircle />
        <Title
          onClick={onCommentToggle}
          comment={comment ? !isCommentOn : false}
        >
          {comment}
        </Title>
      </StyledTimelineItem>
      <CommentContainer>
        {!isQuestion && keywordList && keywordList.length > 0 && (
          <CommentUI
            isCommentOpen={isCommentOn}
            commentList={keywordList.map((item, index) => {
              return {
                comment: item,
                icon: (
                  <Icon
                    icon={index === 0 && !isTopic ? "description" : "checkBox"}
                    size={12}
                  />
                ),
              };
            })}
          />
        )}
      </CommentContainer>
    </>
  );
}

export default TimelineItemUI;
