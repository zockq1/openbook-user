import styled, { ThemeContext } from "styled-components";
import Icon, { IconType } from "../../atoms/icon/Icon";
import BackButton from "../../atoms/button/BackButton";
import Text from "../../atoms/text/Text";
import { useContext } from "react";

interface TitleBoxProps {
  title?: string;
  icon: IconType | undefined | null;
  category: string;
  dateComment?: string;
}

const StyledTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 100;

  left: 0;

  padding: ${({ theme }) => theme.padding.large};
  margin-bottom: 10px;
  border-radius: 0 0 50px 50px;
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  background-color: ${({ theme }) => theme.colors.blue};

  color: ${({ theme }) => theme.colors.white};
`;

const Category = styled.span`
  display: flex;
  align-items: center;

  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const TitleBox = ({ title, icon, category, dateComment }: TitleBoxProps) => {
  const theme = useContext(ThemeContext);
  return (
    <>
      <StyledTitleBox>
        <Category>
          <BackButton color="white" />
          &nbsp;&nbsp;
          {icon && <Icon icon={icon} />}
          &nbsp;&nbsp;
          {category}
        </Category>
        {title && <br />}
        {title && (
          <Text
            weight={theme.fontWeight.bold}
            size={theme.fontSizes.xxl}
            textAlign="center"
            margin="auto"
          >
            {title}
          </Text>
        )}
        {dateComment && (
          <Text
            weight={theme.fontWeight.light}
            size={theme.fontSizes.small}
            color={theme.colors.lightBlue}
            margin="auto"
            textAlign="center"
            lineHeight="200%"
          >
            {dateComment}
          </Text>
        )}
      </StyledTitleBox>
    </>
  );
};

export default TitleBox;
