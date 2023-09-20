import styled from "styled-components";
import Icon from "./Icon";

const StyledLogo = styled.div<LogoProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ size }) => `${size}px`};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-family: "Giants-Inline";
`;

interface LogoProps {
  size: number;
}

function Logo({ size }: LogoProps) {
  return (
    <StyledLogo size={size}>
      정주행
      <Icon category="정주행" size={size} />
      한국사
    </StyledLogo>
  );
}

export default Logo;
