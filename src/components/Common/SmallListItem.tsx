import { ReactNode } from "react";
import styled from "styled-components";

const StyledSmallListItem = styled.li`
  height: 30px;
  width: 90%;

  margin: 10px 0;

  font-weight: 700;
  font-size: 15px;
  color: #5a5a5a;
`;

interface SmallListItemProps {
  children?: ReactNode;
}

const SmallListItem = ({ children }: SmallListItemProps) => {
  return <StyledSmallListItem>{children}</StyledSmallListItem>;
};

export default SmallListItem;
