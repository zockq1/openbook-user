import styled from "styled-components";
import KeywordUI from "./KeywordUI.container";
import { KeywordModel } from "../../../../types/topicTypes";

interface TopicUIProps {
  keywordList: KeywordModel[];
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
          .map((keyword, index) => {
            return (
              <KeywordUI
                key={index}
                keyword={keyword}
                isCommentOn={isKeywordCommentOn}
              />
            );
          })}
      </Topic>
      <Topic direction={isKeywordCommentOn ? "column" : "row"}>
        {keywordList
          .filter((keyword) => !!keyword.comment)
          .map((keyword, index) => {
            return (
              <KeywordUI
                key={index}
                keyword={keyword}
                isCommentOn={isKeywordCommentOn}
              />
            );
          })}
      </Topic>
    </>
  );
}

export default TopicUI;
