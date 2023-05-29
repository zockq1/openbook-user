import React, { ReactNode } from "react";
import styled from "styled-components";

const StyledSmallList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 95%;

  border-radius: 10px;

  margin: 85px auto 10px;
  background-color: #fff;
`;

interface SmallListProps {
  children?: ReactNode;
}

const SmallList = ({ children }: SmallListProps) => {
  return <StyledSmallList>{children}</StyledSmallList>;
};

export default SmallList;
