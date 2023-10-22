import { ReactNode } from "react";
import styled from "styled-components";

const StyledButtonBackground = styled.button`
  position: fixed;

  bottom: 0;
  left: 0;
  height: 62px;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.bg};

  z-index: 9998;
`;

const StyledButton = styled.button`
  position: fixed;

  bottom: 18px;
  left: 15px;
  height: 50px;
  width: calc(100% - 30px);

  padding: 16px 24px;
  border-radius: ${({ theme }) => theme.padding.base};
  border: ${({ theme }) => theme.border.black};

  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  z-index: 9999;
`;
interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
}

function Button({ children, onClick }: ButtonProps) {
  return (
    <StyledButtonBackground>
      <StyledButton onClick={onClick}>{children}</StyledButton>
    </StyledButtonBackground>
  );
}

export default Button;
