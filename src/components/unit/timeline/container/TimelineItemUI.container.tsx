import styled from "styled-components";
import TextBox from "../../../atoms/box/TextBox";
import KeywordUI from "../../topic/container/KeywordUI.container";
import { useEffect, useRef, useState } from "react";

interface TimelineTopicProps {
  dateItem: {
    comment: string;
    date: number | null;
    topicTitle: string;
    keywordList: string[] | null;
  };
  disableCircle?: boolean;
  isQuestion?: boolean;
  isKeywordOpen: boolean;
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

const KeywordList = styled.div<{ open: boolean; maxHeight: number }>`
  margin-left: 120px;
  overflow: hidden;
  max-height: ${({ open, maxHeight }) => (open ? `${maxHeight}px` : "0")};
  transition: 0.1s ease-in-out;
`;

const CheckKeywordList = styled.div`
  position: absolute;
  z-index: -999;
  margin-left: 120px;
  overflow: hidden;
  transition: 0.1s ease-in-out;
`;

function TimelineItemUI({
  dateItem,
  isKeywordOpen,
  disableCircle = false,
  isQuestion = false,
}: TimelineTopicProps) {
  const { comment, date, keywordList } = dateItem;
  const myDivRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (myDivRef.current) {
      const divHeight = myDivRef.current.clientHeight;
      setHeight(divHeight);
    }
  }, []);
  return (
    <>
      <StyledTimelineItem isQuestion={isQuestion}>
        <Date>{Math.floor(Number(date) / 10000) || null}</Date>
        {disableCircle ? (
          <Transparent />
        ) : (
          <OuterCircle>
            <InnerCircle />
          </OuterCircle>
        )}
        <TextBox maxWidth="half">{comment}</TextBox>
      </StyledTimelineItem>
      {!isQuestion && (
        <>
          <CheckKeywordList ref={myDivRef}>
            {keywordList &&
              keywordList.map((keyword, index) => {
                return (
                  <KeywordUI
                    key={index}
                    keyword={{
                      name: keyword,
                      comment: "",
                      dateComment: "",
                      extraDateList: [],
                      id: index,
                      file: "",
                      questionList: [],
                      number: index,
                    }}
                    isCommentOn={false}
                  />
                );
              })}
          </CheckKeywordList>
          <KeywordList open={isKeywordOpen} maxHeight={height}>
            {keywordList &&
              keywordList.map((keyword, index) => {
                return (
                  <KeywordUI
                    key={index}
                    keyword={{
                      name: keyword,
                      comment: "",
                      dateComment: "",
                      extraDateList: [],
                      id: index,
                      file: "",
                      questionList: [],
                      number: index,
                    }}
                    isCommentOn={false}
                  />
                );
              })}
          </KeywordList>
        </>
      )}
    </>
  );
}

export default TimelineItemUI;
