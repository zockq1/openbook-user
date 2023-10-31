import styled, { ThemeContext } from "styled-components";
import Text from "../../../atoms/text/Text";
import TextBox from "../../../atoms/box/TextBox";
import { useContext } from "react";
import { KeywordModel } from "../../../../types/topicTypes";

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

const Comment = styled.div<{ open: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-top: ${({ open }) => (open ? "10px" : "0")};
  padding: ${({ theme, open }) => (open ? theme.padding.small : "0")};
  border-radius: ${({ theme }) => theme.padding.base};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  max-height: ${({ open }) => (open ? "100px" : "0")};
  font-size: ${({ open, theme }) => (open ? theme.fontSizes.small : "0px")};
  color: ${({ open }) => (open ? "inherit" : "transparent")};
  background-color: ${({ theme }) => theme.colors.white};
  transition: 0.1s ease-in-out;
`;

const Triangle = styled.div<{ open: boolean }>`
  border-bottom: 10px solid ${({ open }) => (open ? "white" : "transparent")};
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 0px solid transparent;
  content: "";
  position: absolute;
  top: ${({ open }) => (open ? "-10px" : "0px")};
  left: 20px;
  z-index: 0;
  transition: 0.15s ease-in-out;
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
        <Comment open={isCommentOn}>
          <Triangle open={isCommentOn} />
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
        </Comment>
      )}
    </Keyword>
  );
}

export default KeywordUI;
