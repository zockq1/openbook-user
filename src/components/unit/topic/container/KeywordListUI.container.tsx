import styled from "styled-components";
import { KeywordModel } from "../../../../types/topicTypes";
import Keyword from "../presenter/Keyword.presenter";
import TimelineListUI from "../../timeline/container/TimelineListUI.container";
import { ContentState } from "../../../../types/jjhTypes";
import Icon from "../../../atoms/icon/Icon";

interface KeywordListUIProps {
  keywordList: KeywordModel[];
  isKeywordOn: boolean;
  onKeywordToggle: () => void;
  onClickQuestion: () => void;
  state: ContentState;
  isBookmarked: boolean;
  topicTitle: string;
}

const KeywordListWrapper = styled.div<{ isVisible: boolean }>`
  border-radius: 0 0 10px 10px;
`;

const KeywordListContainer = styled.div<{ isVisible: boolean }>`
  position: relative;
  max-height: ${({ isVisible }) => (isVisible ? "2000px" : "0px")};
  margin-bottom: ${({ isVisible }) => (isVisible ? "0" : "0px")};
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  border-bottom: 0;
  border-top: 0;
  background-color: ${({ theme }) => theme.colors.bg};
  transition: all 0.2s ease-in-out;
  overflow: hidden;
`;

const KeywordList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px;
`;

const KeywordTitleContainer = styled.div<{ isVisible: boolean }>`
  display: flex;
  height: 40px;
  width: 100%;

  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  border-top: ${({ isVisible }) => (isVisible ? "" : "0")};
  border-radius: 0 0 10px 10px;

  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.textBlue};
  font-family: "Spoqa Han Sans Neo";
  transition: all 1s;
`;

const MoreButton = styled.button`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const Questionbutton = styled.button`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid ${({ theme }) => theme.colors.lightGrey};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

function KeywordListUI({
  keywordList,
  isKeywordOn,
  onKeywordToggle,
  isBookmarked,
  state,
  topicTitle,
  onClickQuestion,
}: KeywordListUIProps) {
  return (
    <div style={{ position: "relative", paddingBottom: "4px" }}>
      <KeywordListWrapper isVisible={isKeywordOn}>
        <KeywordListContainer isVisible={isKeywordOn}>
          <KeywordList>
            {keywordList
              .filter((keyword) => !keyword.dateComment)
              .map((keyword, index) => (
                <Keyword key={index} keyword={keyword} />
              ))}
          </KeywordList>
          <TimelineListUI
            dateList={keywordList
              .filter((keyword) => !!keyword.dateComment)
              .sort((a, b) => a.number - b.number)
              .map((keyword, index) => {
                return {
                  date: keyword.dateComment,
                  topicTitle: topicTitle,
                  comment: keyword.name,
                  keywordList: keyword.comment
                    .trim()
                    .split(".")
                    .filter(Boolean),
                };
              })}
          />
        </KeywordListContainer>
        <KeywordTitleContainer isVisible={isKeywordOn}>
          {keywordList.length > 0 && (
            <MoreButton onClick={onKeywordToggle}>{`${
              isKeywordOn ? "▲ 키워드 접기 " : "▼ 키워드 보기 "
            }(${keywordList.length})`}</MoreButton>
          )}
          {(state === "Complete" ||
            state === "InProgress" ||
            state === "Locked") && (
            <Questionbutton onClick={onClickQuestion}>
              <Icon icon="pen" size={14} />
              &nbsp;문제 풀기
            </Questionbutton>
          )}
        </KeywordTitleContainer>
      </KeywordListWrapper>
    </div>
  );
}

export default KeywordListUI;
