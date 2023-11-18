import { Link, useLocation } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import Icon, { IconType } from "../../atoms/icon/Icon";

interface NavigationItemProps {
  to: string;
  icon: IconType;
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
  color: ${({ $isCurrent, theme }) =>
    $isCurrent ? theme.colors.textBlue : theme.colors.lightGrey};

  animation: ${({ $isCurrent }) =>
    $isCurrent
      ? css`
          ${popAnimation} 400ms linear
        `
      : ""};
`;

function NavigationItem({ to, icon }: NavigationItemProps) {
  const location = useLocation();
  const isCurrent = location.pathname === to;

  return (
    <Navigation to={to} $isCurrent={isCurrent} aria-label={icon}>
      <Icon icon={icon} size={24} />
    </Navigation>
  );
}

export default NavigationItem;
