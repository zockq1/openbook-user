import { ReactNode } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  height: 50px;
  width: calc(100% - 30px);

  padding: 16px 24px;
  margin: ${({ theme }) => theme.padding.base};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
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
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

export default Button;
