import styled, { ThemeContext } from "styled-components";
import Text from "../../../atoms/text/Text";
import TextBox from "../../../atoms/box/TextBox";
import { useContext } from "react";
import { KeywordModel } from "../../../../types/topicTypes";
import CommentUI from "./CommentUI.container";

interface KeywordCommentBoxProps {
  keyword: KeywordModel;
  isCommentOn: boolean;
}

const Keyword = styled.div<{ isCommentOn: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 5px;
`;

const Badge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 10;
  width: 20px;
  height: 20px;
  top: -9px;
  left: -7px;
  padding: 5px;
  border-radius: 100%;
  border: 2px solid ${({ theme }) => theme.colors.bg};
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xxs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

function KeywordUI({ keyword, isCommentOn }: KeywordCommentBoxProps) {
  const theme = useContext(ThemeContext);
  const { name, comment, questionList } = keyword;

  return (
    <Keyword isCommentOn={isCommentOn}>
      {questionList.length !== 0 && <Badge>{questionList.length}</Badge>}
      <TextBox maxWidth="full" shadow color="bgBlue">
        {name}
      </TextBox>
      {comment && (
        <CommentUI isCommentOpen={isCommentOn}>
          {comment
            .trim()
            .split(".")
            .filter(Boolean)
            .map((sentence) => (
              <Text
                key={sentence}
                weight={theme.fontWeight.light}
                lineHeight="120%"
              >
                {`${sentence}.`}
              </Text>
            ))}
        </CommentUI>
      )}
    </Keyword>
  );
}

export default KeywordUI;
