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
  align-items: top;
  margin: ${({ isQuestion }) => (isQuestion ? "30px 0" : "10px 0 5px")};
  //margin-right: 97px;
`;

const InnerCircle = styled.div<{ visible: boolean }>`
  margin: 10px;
  background-color: ${({ theme }) => theme.colors.bgBlue};
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.colors.textBlue};
  z-index: 9;
  position: relative;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
`;

const Title = styled.div<{ comment: boolean; commentVisible: boolean }>`
  width: fit-content;
  padding: ${({ theme }) => theme.padding.small};
  border-radius: 10px 10px 2px 2px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.textBlue};
  border: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
  border-bottom: ${({ theme, commentVisible }) =>
    !commentVisible
      ? `3px solid ${theme.colors.lightGrey}`
      : `1px solid ${theme.colors.lightGrey}`};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.base};
  z-index: 1;
  word-break: keep-all;
  cursor: ${({ comment }) => (comment ? "pointer" : "")};
`;

const Date = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 10px;
`;

const DateItem = styled.div`
  width: fit-content;
  color: ${({ theme }) => theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.small};
  text-align: right;
  word-break: keep-all;

  .king {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeight.light};
  }
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
            {typeof date === "number"
              ? Math.floor(Number(date) / 10000)
              : date?.split("/")[0]}
            {typeof date !== "number" && date?.split("/")[1] && (
              <span className="king">
                <br />
                {`${date?.split("/")[1]}`}
              </span>
            )}
          </DateItem>
        </Date>
        <InnerCircle visible={date !== ""} />
        <Title
          onClick={onCommentToggle}
          commentVisible={
            keywordList && keywordList?.length > 0 ? isCommentOn : true
          }
          comment={keywordList && keywordList?.length > 0 ? true : false}
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
