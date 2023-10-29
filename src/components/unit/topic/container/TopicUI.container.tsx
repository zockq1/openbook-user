import styled from "styled-components";
import KeywordUI from "./KeywordUI.container";

interface TopicUIProps {
  keywordList: {
    name: string;
    comment: string;
    file: string;
  }[];
  isKeywordCommentOn: boolean;
}

const Topic = styled.div<{ direction: "row" | "column" }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  flex-wrap: wrap;
  padding: 0 20px;
`;

function TopicUI({ keywordList, isKeywordCommentOn }: TopicUIProps) {
  return (
    <>
      <Topic direction={"row"}>
        {keywordList
          .filter((keyword) => !keyword.comment)
          .map((item, index) => {
            return (
              <KeywordUI
                key={index}
                name={item.name}
                comment={item.comment}
                isCommentOn={isKeywordCommentOn}
              />
            );
          })}
      </Topic>
      <Topic direction={isKeywordCommentOn ? "column" : "row"}>
        {keywordList
          .filter((keyword) => !!keyword.comment)
          .map((item, index) => {
            return (
              <KeywordUI
                key={index}
                name={item.name}
                comment={item.comment}
                isCommentOn={isKeywordCommentOn}
              />
            );
          })}
      </Topic>
    </>
  );
}

export default TopicUI;
