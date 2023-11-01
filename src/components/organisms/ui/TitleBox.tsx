import styled, { ThemeContext } from "styled-components";
import Icon, { IconType } from "../../atoms/icon/Icon";
import BackButton from "../../atoms/button/BackButton";
import { useContext } from "react";
import HomeButton from "../../atoms/button/HomeButton";

interface TitleBoxProps {
  icon: IconType | undefined | null;
  category: string;
}

const StyledTitleBox = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;

  left: 0;

  padding: ${({ theme }) => theme.padding.large};
  margin-bottom: 10px;
  border-radius: 0 0 15px 15px;
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  //box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  background-color: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const Title = styled.span`
  display: flex;
`;

const TitleBox = ({ icon, category }: TitleBoxProps) => {
  const theme = useContext(ThemeContext);
  return (
    <StyledTitleBox>
      <BackButton color={theme.colors.textBlue} />
      <Title>
        {icon && <Icon icon={icon} />}
        &nbsp;
        {category}
      </Title>
      <HomeButton color={theme.colors.textBlue} />
    </StyledTitleBox>
  );
};

export default TitleBox;

// {title && <br />}
// {title && (
//   <Text
//     weight={theme.fontWeight.bold}
//     size={theme.fontSizes.xxl}
//     textAlign="center"
//     margin="auto"
//   >
//     {title}
//   </Text>
// )}
// {dateComment && (
//   <Text
//     weight={theme.fontWeight.light}
//     size={theme.fontSizes.small}
//     color={theme.colors.lightBlue}
//     margin="auto"
//     textAlign="center"
//     lineHeight="200%"
//   >
//     {dateComment}
//   </Text>
// )}
