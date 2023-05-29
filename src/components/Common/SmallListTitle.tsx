import { ReactNode } from "react";
import styled from "styled-components";

const StyledSmallListTitle = styled.div`
  margin: auto 0;
`;

interface SmallListTitleProps {
  children?: ReactNode;
}

const SmallListTitle = ({ children }: SmallListTitleProps) => {
  return <StyledSmallListTitle>{children}</StyledSmallListTitle>;
};

export default SmallListTitle;
