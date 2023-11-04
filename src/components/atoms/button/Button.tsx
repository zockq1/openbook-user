import { ReactNode } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  height: 50px;
  width: 100%;

  margin: ${({ theme }) => theme.margin.base};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: 2px solid ${({ theme }) => theme.colors.textBlue};

  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
`;

interface ButtonProps {
  children?: ReactNode;
  onClick: () => void;
}

function Button({ children, onClick }: ButtonProps) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

export default Button;
