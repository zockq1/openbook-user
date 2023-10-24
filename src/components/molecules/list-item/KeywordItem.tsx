import styled, { ThemeContext } from "styled-components";
import Text from "../../atoms/text/Text";
import TextBox from "../../atoms/box/TextBox";
import { useContext } from "react";

interface KeywordCommentBoxProps {
  name: string;
  comment: string;
  isCommentOn: boolean;
}

const StyledKeywordCommentBox = styled.div<{ isCommentOn: boolean }>`
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
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  max-height: ${({ open }) => (open ? "100px" : "0")};
  font-size: ${({ open, theme }) => (open ? theme.fontSizes.small : "0px")};
  color: ${({ open }) => (open ? "inherit" : "transparent")};
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

function KeywoedItem({ name, comment, isCommentOn }: KeywordCommentBoxProps) {
  const theme = useContext(ThemeContext);

  return (
    <StyledKeywordCommentBox isCommentOn={isCommentOn}>
      <TextBox maxWidth="half" shadow={false}>
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
    </StyledKeywordCommentBox>
  );
}

export default KeywoedItem;
