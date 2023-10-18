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
  handleBackPage: () => void;
}

interface StyledTitleBoxProps {
  position: "fixed" | "static";
}

const StyledTitleBox = styled.div<StyledTitleBoxProps>`
  position: ${({ position }) => position};
  display: flex;
  flex-direction: column;
  z-index: 100;

  width: 100%;

  padding: ${({ theme }) => theme.padding.large};
  margin-bottom: 10px;
  border-radius: 0 0 50px 50px;
  box-shadow: ${({ theme, position }) =>
    position === "fixed" && theme.shadow.defaultShadow};

  background-color: ${({ theme, position }) =>
    position === "fixed" ? theme.colors.blue : theme.colors.bg};

  color: ${({ theme, position }) =>
    position === "fixed" ? theme.colors.white : theme.colors.bg};
`;

const Category = styled.span`
  display: flex;
  align-items: center;

  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const TitleBox = ({
  title,
  icon,
  category,
  dateComment,
  handleBackPage,
}: TitleBoxProps) => {
  const theme = useContext(ThemeContext);
  return (
    <>
      <StyledTitleBox position={"static"}>
        <Category>
          <BackButton onClick={handleBackPage} color="white" />
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
      <StyledTitleBox position={"fixed"}>
        <Category>
          <BackButton onClick={handleBackPage} color={theme.colors.white} />
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
