import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const StyledNavigationBar = styled.nav`
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  @media (min-width: 768px) {
    width: 400px;
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
  @media (max-width: 767px) {
    position: fixed;
    top: 45px;
    width: 100%;
    height: 45px;
    height: 45px;
    margin: 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
    box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
    background-color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.base};
    z-index: 99;
  }
`;

interface NavigationProps {
  $isCurrent: boolean;
}

const Navigation = styled(Link)<NavigationProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-width: max-content;
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  color: ${({ $isCurrent, theme }) =>
    $isCurrent ? theme.colors.textBlue : theme.colors.grey};
  font-weight: ${({ $isCurrent, theme }) =>
    $isCurrent ? theme.fontWeight.regular : theme.fontWeight.light};
  font-family: "Spoqa Han Sans Neo";

  :hover {
    color: ${({ theme }) => theme.colors.textBlue};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
  }
`;

function NavigationBar() {
  const location = useLocation();

  return (
    <StyledNavigationBar>
      <Navigation to="/" $isCurrent={location.pathname === "/"}>
        정주행
      </Navigation>
      <Navigation to="/question" $isCurrent={location.pathname === "/question"}>
        문제
      </Navigation>
      <Navigation to="/my-info" $isCurrent={location.pathname === "/my-info"}>
        내 학습
      </Navigation>
      <Navigation to="/option" $isCurrent={location.pathname === "/option"}>
        설정
      </Navigation>
    </StyledNavigationBar>
  );
}

export default NavigationBar;
