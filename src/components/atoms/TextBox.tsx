import { ReactNode } from "react";
import styled from "styled-components";

interface TextBoxProps {
  children: ReactNode;
}

const StyledTextBox = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.padding.small};
  border-radius: ${({ theme }) => theme.padding.base};

  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

function TextBox({ children }: TextBoxProps) {
  return <StyledTextBox>{children}</StyledTextBox>;
}

export default TextBox;
