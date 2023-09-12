import { Link, useLocation } from "react-router-dom";
import styled, { ThemeContext, css, keyframes } from "styled-components";
import Icon from "../../atoms/icon/Icon";
import { useContext } from "react";

interface NavigationItemProps {
  to: string;
  category: string;
}

const popAnimation = keyframes`
  0% {
    transform: scale(0.7);
  }
  33% {
    transform: scale(0.9);
  }
  66% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

interface NavigationProps {
  $isCurrent: boolean;
}

const Navigation = styled(Link)<NavigationProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  background-color: ${({ $isCurrent, theme }) =>
    $isCurrent ? theme.colors.lightBlue : theme.colors.white};
  animation: ${({ $isCurrent }) =>
    $isCurrent
      ? css`
          ${popAnimation} 400ms linear
        `
      : ""};
`;

function NavigationItem({ to, category }: NavigationItemProps) {
  const theme = useContext(ThemeContext);
  const location = useLocation();
  const isCurrent = location.pathname === to;

  return (
    <Navigation to={to} $isCurrent={isCurrent}>
      <Icon
        category={category}
        size={24}
        color={isCurrent ? theme.colors.blue : theme.colors.lightGrey}
      />
    </Navigation>
  );
}

export default NavigationItem;
