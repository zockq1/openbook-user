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

const Comment = styled.div`
  display: flex;
  margin-top: 10px;
  padding: ${({ theme }) => theme.padding.small};
  border-radius: ${({ theme }) => theme.padding.base};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  &:after {
    border-bottom: 10px solid #fff;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 0px solid transparent;
    content: "";
    position: absolute;
    top: 33px;
    left: 20px;
  }
`;

function KeywoedItem({ name, comment, isCommentOn }: KeywordCommentBoxProps) {
  const theme = useContext(ThemeContext);
  return (
    <StyledKeywordCommentBox isCommentOn={isCommentOn}>
      <TextBox maxWidth="half" shadow={false}>
        {name}
      </TextBox>
      {comment && isCommentOn && (
        <Comment>
          <Text
            color={theme.colors.black}
            size={theme.fontSizes.xs}
            weight={theme.fontWeight.light}
            lineHeight="120%"
          >
            {comment}
          </Text>
        </Comment>
      )}
    </StyledKeywordCommentBox>
  );
}

export default KeywoedItem;
