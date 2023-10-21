import { useState } from "react";
import KeywoedItem from "../../molecules/list-item/KeywordItem";
import styled from "styled-components";

interface KeywordListProps {
  keywordList: {
    name: string;
    comment: string;
    file: string;
  }[];
}

const StyledKeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
`;

function KeywordList({ keywordList }: KeywordListProps) {
  const [isCommentOn, setIstCommentOn] = useState<boolean>(true);
  return (
    <>
      <button onClick={() => setIstCommentOn((prev) => !prev)}>해설</button>
      <StyledKeywordList>
        {keywordList.map((item, index) => {
          return (
            <KeywoedItem
              key={index}
              name={item.name}
              comment={item.comment}
              isCommentOn={isCommentOn}
            />
          );
        })}
      </StyledKeywordList>
    </>
  );
}

export default KeywordList;
