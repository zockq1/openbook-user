import styled from "styled-components";
import { KeywordModel } from "../../../../types/topicTypes";
import Keyword from "../presenter/Keyword.presenter";
import TimelineListUI from "../../timeline/container/TimelineListUI.container";
import { ContentState } from "../../../../types/jjhTypes";
import Icon from "../../../atoms/icon/Icon";
import { ReactNode } from "react";

interface KeywordListUIProps {
  keywordList: KeywordModel[];
  isKeywordOn: boolean;
  onKeywordToggle: () => void;
  onClickQuestion: () => void;
  state: ContentState;
  content?: ReactNode;
}

const KeywordListWrapper = styled.div<{ isVisible: boolean }>`
  border-radius: 0 0 10px 10px;
`;

const KeywordListContainer = styled.div<{ isVisible: boolean }>`
  position: relative;
  padding: 0 5px;
  max-height: ${({ isVisible }) => (isVisible ? "" : "0px")};
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  border-bottom: 0;
  border-top: 0;
  background-color: ${({ theme }) => theme.colors.bg};
  transition: all 0.1s ease-in-out;
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
  align-items: center;
  height: 40px;
  width: 100%;

  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  border-top: 1px solid
    ${({ theme, isVisible }) =>
      !isVisible ? "transparent" : theme.colors.lightGrey};
  border-radius: 0 0 10px 10px;

  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.textBlue};
  font-family: "Spoqa Han Sans Neo";
  //transition: all 1s;

  button:nth-child(2) {
    border-left: 1px solid ${({ theme }) => theme.colors.lightGrey};
  }
`;

const MoreButton = styled.button`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textBlue};
`;

const Questionbutton = styled.button`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textBlue};
`;

const Border = styled.div`
  width: 1px;
  height: 60%;

  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

function KeywordListUI({
  keywordList,
  isKeywordOn,
  onKeywordToggle,
  state,
  onClickQuestion,
  content,
}: KeywordListUIProps) {
  return (
    <div style={{ position: "relative", paddingBottom: "4px" }}>
      <KeywordListWrapper
        isVisible={keywordList.length === 0 && !content ? false : isKeywordOn}
      >
        <KeywordListContainer
          isVisible={keywordList.length === 0 && !content ? false : isKeywordOn}
        >
          <KeywordList>
            {keywordList
              .filter((keyword) => !keyword.dateComment)
              .map((keyword, index) => (
                <Keyword key={index} keyword={keyword} />
              ))}
          </KeywordList>
          <TimelineListUI
            isTopic
            dateList={keywordList
              .filter((keyword) => !!keyword.dateComment)
              .sort((a, b) => a.number - b.number)
              .map((keyword, index) => {
                return {
                  date: keyword.dateComment,
                  comment: keyword.name,
                  keywordList: keyword.comment
                    .trim()
                    .split(".")
                    .filter(Boolean),
                };
              })}
          />
          {content}
        </KeywordListContainer>
        <KeywordTitleContainer
          isVisible={keywordList.length === 0 && !content ? false : isKeywordOn}
        >
          {keywordList.length === 0 && !content ? null : (
            <MoreButton onClick={onKeywordToggle}>
              {isKeywordOn ? (
                <Icon icon="up" size={40} />
              ) : (
                <Icon icon="down" size={40} />
              )}
            </MoreButton>
          )}
          {keywordList.length !== 0 &&
            !!content &&
            (state === "Complete" ||
              state === "InProgress" ||
              state === "Locked") && <Border />}
          {(state === "Complete" ||
            state === "InProgress" ||
            state === "Locked") && (
            <Questionbutton onClick={onClickQuestion}>
              <Icon icon="exam" size={18} /> &nbsp; 문제 풀기
            </Questionbutton>
          )}
        </KeywordTitleContainer>
      </KeywordListWrapper>
    </div>
  );
}

export default KeywordListUI;
