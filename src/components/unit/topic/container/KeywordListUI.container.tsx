import styled from "styled-components";
import KeywordUI from "./KeywordUI.container";
import { KeywordModel } from "../../../../types/topicTypes";

interface KeywordListUIProps {
  keywordList: KeywordModel[];
  isKeywordCommentOn: boolean;
}

const KeywordList = styled.div<{ direction: "row" | "column" }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  flex-wrap: wrap;
`;

function KeywordListUI({
  keywordList,
  isKeywordCommentOn,
}: KeywordListUIProps) {
  return (
    <>
      <KeywordList direction={"row"}>
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
      </KeywordList>
      <KeywordList direction={isKeywordCommentOn ? "column" : "row"}>
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
      </KeywordList>
    </>
  );
}

export default KeywordListUI;
