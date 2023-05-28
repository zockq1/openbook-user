import { ReactNode } from "react";
import styled from "styled-components";

const StyledTitle = styled.div`
  margin-top: 15px;
  margin-left: 10px;
`;

interface TitleProps {
  children?: ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return <StyledTitle>{children}</StyledTitle>;
};

export default Title;
