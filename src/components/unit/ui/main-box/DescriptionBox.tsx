import { ReactNode } from "react";
import styled from "styled-components";

const Box = styled.div`
  position: relative;
  @media (min-width: 768px) {
    grid-column: 2/3;
    grid-row: 1/5;
  }
  display: flex;
  justify-content: start;
  margin: 8px;
  padding: ${({ theme }) => theme.padding.base};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  border: 3px solid ${({ theme }) => theme.colors.textBlue};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  overflow: hidden;
`;

interface DescriptionBoxProps {
  children?: ReactNode;
}

function DescriptionBox({ children }: DescriptionBoxProps) {
  return <Box>{children}</Box>;
}

export default DescriptionBox;
