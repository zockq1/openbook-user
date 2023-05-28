import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLinkBox = styled(Link)`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
`;

interface LinkBoxProps {
  children?: ReactNode;
  to: string;
}

const LinkBox = ({ children, to }: LinkBoxProps) => {
  return <StyledLinkBox to={to}>{children}</StyledLinkBox>;
};

export default LinkBox;
