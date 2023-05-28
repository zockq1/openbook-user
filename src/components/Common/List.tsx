import React, { ReactNode } from "react";
import styled from "styled-components";

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 75px;
`;

interface ListProps {
  children?: ReactNode;
}

const List = ({ children }: ListProps) => {
  return <StyledList>{children}</StyledList>;
};

export default List;
