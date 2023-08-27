import { ReactNode } from "react";
import styled from "styled-components";

interface TextProps {
  children?: ReactNode;
}

const StyledContentBox = styled.div`
  width: auto;
  margin: ${({ theme }) => theme.margin.base};
  padding: ${({ theme }) => theme.padding.large};
  border-radius: ${({ theme }) => theme.padding.base};
  border: ${({ theme }) => theme.border.black};

  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  line-height: 150%;
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    line-height: 300%;
  }

  table {
    border: solid 2px ${({ theme }) => theme.colors.lightGrey};
  }

  th,
  td {
    border: solid 2px ${({ theme }) => theme.colors.lightGrey};
    padding: 4px;
  }
`;

function ContentBox({ children }: TextProps) {
  return <StyledContentBox>{children}</StyledContentBox>;
}

export default ContentBox;
