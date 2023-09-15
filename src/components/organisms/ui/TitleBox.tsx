import styled, { ThemeContext } from "styled-components";
import Icon from "../../atoms/icon/Icon";
import BackButton from "../../atoms/button/BackButton";
import Text from "../../atoms/text/Text";
import { useContext } from "react";

interface TitleBoxProps {
  title?: string;
  category: string;
  startDate?: number;
  endDate?: number;
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
  category,
  startDate,
  endDate,
  handleBackPage,
}: TitleBoxProps) => {
  const theme = useContext(ThemeContext);
  return (
    <>
      <StyledTitleBox position={"static"}>
        <Category>
          <BackButton onClick={handleBackPage} />
          &nbsp;&nbsp;
          <Icon category={category} />
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
        {(startDate || endDate) && (
          <Text
            weight={theme.fontWeight.light}
            size={theme.fontSizes.small}
            color={theme.colors.lightBlue}
            margin="auto"
            textAlign="center"
            lineHeight="200%"
          >
            {startDate ? startDate : "???"} ~ {endDate ? endDate : "???"}
          </Text>
        )}
      </StyledTitleBox>
      <StyledTitleBox position={"fixed"}>
        <Category>
          <BackButton onClick={handleBackPage} />
          &nbsp;&nbsp;
          <Icon category={category} />
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
        {(startDate || endDate) && (
          <Text
            weight={theme.fontWeight.light}
            size={theme.fontSizes.small}
            color={theme.colors.lightBlue}
            margin="auto"
            textAlign="center"
            lineHeight="200%"
          >
            {startDate ? startDate : "???"} ~ {endDate ? endDate : "???"}
          </Text>
        )}
      </StyledTitleBox>
    </>
  );
};

export default TitleBox;
