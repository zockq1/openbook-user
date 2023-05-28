import React, { ReactNode } from "react";
import styled from "styled-components";

interface ItemProps {
  height: string;
  children: ReactNode;
}

const StyledItem = styled.li<ItemProps>`
  height: ${(props) => props.height};
  position: relative;
  width: 100%;
  margin-top: 10px;
  font-weight: 700;
  font-size: 15px;
  color: #5a5a5a;
  background-color: #fff;
`;

const ListItem = ({ height, children }: ItemProps) => {
  return <StyledItem height={height}>{children}</StyledItem>;
};

export default ListItem;
