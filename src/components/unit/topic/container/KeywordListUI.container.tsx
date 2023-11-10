import React, { useState } from "react";
import styled from "styled-components";
import KeywordUI from "./KeywordUI.container";
import { KeywordModel } from "../../../../types/topicTypes";
import Bookmark from "../presenter/Bookmark.presenter";

interface KeywordListUIProps {
  keywordList: KeywordModel[];
  isKeywordCommentOn: boolean;
  isBookmarked: boolean;
  topicTitle: string;
}

const KeywordListWrapper = styled.div<{ isVisible: boolean }>`
  overflow: hidden;
  max-height: ${({ isVisible }) => (isVisible ? "1000px" : "32px")};
  margin-bottom: ${({ isVisible }) => (isVisible ? "0" : "20px")};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  transition: all 0.2s ease-in-out;
`;

const KeywordList = styled.div<{ direction: "row" | "column" }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  flex-wrap: wrap;
  padding: 0 5px;
`;

const KeywordTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 100%;

  border-bottom: 2px solid ${({ theme }) => theme.colors.textBlue};
  margin-bottom: 30px;

  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-family: "Giants-Regular";
  background-color: ${({ theme }) => theme.colors.white};
`;

const BookmarkContainer = styled.div<{ isVisible: boolean }>`
  position: absolute;
  width: 55px;
  height: 55px;

  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  border-radius: ${({ isVisible }) =>
    isVisible ? "10px 0 10px 0" : "10px 0 10px 10px"};
  background-color: ${({ theme }) => theme.colors.white};
  transform: translate(-2px, -2px);
  transition: all 0.2s ease-in-out;
`;

function KeywordListUI({
  keywordList,
  isKeywordCommentOn,
  isBookmarked,
  topicTitle,
}: KeywordListUIProps) {
  const [isKeywordListVisible, setIsKeywordListVisible] = useState(true);

  const toggleKeywordList = () => {
    setIsKeywordListVisible((prev) => !prev);
  };

  return (
    <>
      <KeywordListWrapper isVisible={isKeywordListVisible}>
        <BookmarkContainer isVisible={isKeywordListVisible}>
          <Bookmark isBookmarked={isBookmarked} topicTitle={topicTitle} />
        </BookmarkContainer>
        <KeywordTitleContainer onClick={toggleKeywordList}>
          {`${isKeywordListVisible ? "▼" : "▶"} 키워드 목록(${
            keywordList.length
          })`}
        </KeywordTitleContainer>
        <KeywordList direction={"row"}>
          {keywordList
            .filter((keyword) => !keyword.comment)
            .map((keyword, index) => (
              <KeywordUI
                key={index}
                keyword={keyword}
                isCommentOn={isKeywordCommentOn}
              />
            ))}
        </KeywordList>
        <KeywordList direction={isKeywordCommentOn ? "column" : "row"}>
          {keywordList
            .filter((keyword) => !!keyword.comment)
            .map((keyword, index) => (
              <KeywordUI
                key={index}
                keyword={keyword}
                isCommentOn={isKeywordCommentOn}
              />
            ))}
        </KeywordList>
      </KeywordListWrapper>
    </>
  );
}

export default KeywordListUI;
