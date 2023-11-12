import styled from "styled-components";
import { KeywordModel } from "../../../../types/topicTypes";
import Bookmark from "../presenter/Bookmark.presenter";
import Keyword from "../presenter/Keyword.presenter";
import TimelineListUI from "../../timeline/container/TimelineListUI.container";

interface KeywordListUIProps {
  keywordList: KeywordModel[];
  isKeywordOn: boolean;
  onKeywordToggle: () => void;
  isBookmarked: boolean;
  topicTitle: string;
}

const KeywordListWrapper = styled.div<{ isVisible: boolean }>`
  position: relative;
  max-height: ${({ isVisible }) => (isVisible ? "2000px" : "32px")};
  margin-bottom: ${({ isVisible }) => (isVisible ? "0" : "20px")};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  transition: all 0.2s ease-in-out;
  overflow: hidden;
`;

const KeywordList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 5px;
`;

const KeywordTitleContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 100%;

  border-bottom: 2px solid ${({ theme }) => theme.colors.textBlue};
  margin-bottom: 30px;
  padding-left: 50px;

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
  transition: all 0.2s ease-in-out;
  z-index: 99;
`;

function KeywordListUI({
  keywordList,
  isKeywordOn,
  onKeywordToggle,
  isBookmarked,
  topicTitle,
}: KeywordListUIProps) {
  return (
    <div style={{ position: "relative", paddingBottom: "4px" }}>
      <BookmarkContainer isVisible={isKeywordOn}>
        <Bookmark isBookmarked={isBookmarked} topicTitle={topicTitle} />
      </BookmarkContainer>
      <KeywordListWrapper isVisible={isKeywordOn}>
        <KeywordTitleContainer onClick={onKeywordToggle}>
          {`${isKeywordOn ? "▼" : "▶"} 키워드 목록(${keywordList.length})`}
        </KeywordTitleContainer>
        <KeywordList>
          {keywordList
            .filter((keyword) => !keyword.comment && !keyword.dateComment)
            .map((keyword, index) => (
              <Keyword key={index} keyword={keyword} />
            ))}
        </KeywordList>
        <KeywordList>
          {keywordList
            .filter((keyword) => !!keyword.comment && !keyword.dateComment)
            .map((keyword, index) => (
              <Keyword key={index} keyword={keyword} />
            ))}
        </KeywordList>
        <TimelineListUI
          dateList={keywordList
            .filter((keyword) => !!keyword.dateComment)
            .map((keyword, index) => {
              return {
                date: keyword.dateComment,
                topicTitle: topicTitle,
                comment: keyword.name,
                keywordList: keyword.comment.trim().split(".").filter(Boolean),
              };
            })}
        />
      </KeywordListWrapper>
    </div>
  );
}

export default KeywordListUI;
