import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLogo = styled(Link)<LogoProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  font-size: ${({ size }) => `${size}px`};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-family: "Giants-Regular";
  font-style: italic;
  color: ${({ theme }) => theme.colors.textBlue};
`;

interface LogoProps {
  size: number;
}

function Logo({ size }: LogoProps) {
  return (
    <StyledLogo to="/" size={size}>
      정주행 한국사
    </StyledLogo>
  );
}

export default Logo;
