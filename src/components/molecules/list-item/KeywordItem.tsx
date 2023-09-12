import styled, { ThemeContext } from "styled-components";
import Text from "../../atoms/text/Text";
import TextBox from "../../atoms/box/TextBox";
import { useContext } from "react";

interface KeywordCommentBoxProps {
  name: string;
  comment: string;
}

const StyledKeywordCommentBox = styled.div`
  display: flex;

  width: max-content;
  max-width: calc(100% - 40px);
  margin: 10px 20px;
  border-radius: ${({ theme }) => theme.padding.base};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
`;

function KeywoedItem({ name, comment }: KeywordCommentBoxProps) {
  const theme = useContext(ThemeContext);
  return (
    <StyledKeywordCommentBox>
      <TextBox maxWidth="half" shadow={false}>
        {name}
      </TextBox>
      <Text
        color={theme.colors.black}
        size={theme.fontSizes.xs}
        weight={theme.fontWeight.light}
        padding={theme.padding.small}
        lineHeight="120%"
      >
        {comment}
      </Text>
    </StyledKeywordCommentBox>
  );
}

export default KeywoedItem;
