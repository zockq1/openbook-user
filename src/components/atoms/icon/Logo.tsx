import styled from "styled-components";
import Icon from "./Icon";

const StyledLogo = styled.div<LogoProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ size }) => `${size}px`};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-family: "Giants-Inline";
  color: ${({ theme }) => theme.colors.textBlue};
`;

interface LogoProps {
  size: number;
}

function Logo({ size }: LogoProps) {
  return (
    <StyledLogo size={size}>
      정주행
      <Icon icon="run" size={size} />
      한국사
    </StyledLogo>
  );
}

export default Logo;
