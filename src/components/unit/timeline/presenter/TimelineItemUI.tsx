import styled from "styled-components";
import Keyword from "../../topic/container/Keyword";

interface TimelineTopicProps {
  dateItem: {
    comment: string;
    date: number | string | null;
    keywordList: string[] | null;
    file?: string;
  };
  isQuestion?: boolean;
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

function TimelineItemUI({ dateItem, isQuestion = false }: TimelineTopicProps) {
  const { comment, date, keywordList, file } = dateItem;
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
        <Keyword
          title={comment}
          comment={keywordList?.join(".") || ""}
          file={file}
          isQuestion={isQuestion}
        />
      </StyledTimelineItem>
    </>
  );
}

export default TimelineItemUI;
