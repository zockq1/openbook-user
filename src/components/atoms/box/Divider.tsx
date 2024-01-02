import { ReactNode } from "react";
import styled from "styled-components";

interface ChapterNumberProps {
  children?: ReactNode;
}

const StyledDivider = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.thin};

  & > div {
    padding: 10px;
    border-top: 1px solid ${({ theme }) => theme.colors.textBlue};
    border-bottom: 1px solid ${({ theme }) => theme.colors.textBlue};
  }

  &::before,
  &::after {
    content: "";
    height: 1px;
    background-color: ${({ theme }) => theme.colors.textBlue};
    flex-grow: 1;
  }

  &::before {
    margin-right: 20px;
  }

  &::after {
    margin-left: 20px;
  }
  margin: 30px 0;
  @media (max-width: 767px) {
    margin: 10px 0 5px;
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

function Divider({ children }: ChapterNumberProps) {
  return (
    <StyledDivider id={children?.toString()}>
      <div>{children}</div>
    </StyledDivider>
  );
}

export default Divider;
