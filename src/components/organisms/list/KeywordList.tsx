import KeywoedItem from "../../molecules/list-item/KeywordItem";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface KeywordListProps {
  keywordList: {
    name: string;
    comment: string;
    file: string;
  }[];
}

const StyledKeywordList = styled.div<{ direction: "row" | "column" }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  flex-wrap: wrap;
  padding: 0 20px;
`;

function KeywordList({ keywordList }: KeywordListProps) {
  const isKeywordCommentOn = useSelector(
    (state: RootState) => state.keyword.isKeywordCommentOn
  );
  return (
    <>
      <StyledKeywordList direction={"row"}>
        {keywordList
          .filter((keyword) => !keyword.comment)
          .map((item, index) => {
            return (
              <KeywoedItem
                key={index}
                name={item.name}
                comment={item.comment}
                isCommentOn={isKeywordCommentOn}
              />
            );
          })}
      </StyledKeywordList>
      <StyledKeywordList direction={isKeywordCommentOn ? "column" : "row"}>
        {keywordList
          .filter((keyword) => !!keyword.comment)
          .map((item, index) => {
            return (
              <KeywoedItem
                key={index}
                name={item.name}
                comment={item.comment}
                isCommentOn={isKeywordCommentOn}
              />
            );
          })}
      </StyledKeywordList>
    </>
  );
}

export default KeywordList;
