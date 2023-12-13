import styled, { ThemeContext } from "styled-components";
import { IconType } from "../../atoms/icon/Icon";
import BackButton from "../../atoms/button/BackButton";
import { useContext } from "react";
import HomeButton from "../../atoms/button/HomeButton";
import { Mobile } from "../../atoms/layout/Responsive";

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

  padding: 15px 24px;
  margin-bottom: 10px;
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};

  background-color: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const Title = styled.span`
  display: flex;
`;

const TitleBox = ({ icon, category }: TitleBoxProps) => {
  const theme = useContext(ThemeContext);
  return (
    <Mobile>
      <StyledTitleBox>
        <BackButton color={theme.colors.textBlue} />
        <Title>{category}</Title>
        <HomeButton color={theme.colors.textBlue} />
      </StyledTitleBox>
    </Mobile>
  );
};

export default TitleBox;
