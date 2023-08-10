import { ReactNode } from "react";
import styled from "styled-components";

interface LayoutProps {
  children?: ReactNode;
}

const StyledLayout = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  position: relative;
  flex-direction: column;
  font-family: "Spoqa Han Sans Neo", "Apple SD Gothic Neo";
  background-color: ${({ theme }) => theme.colors.bg};
`;

function Layout({ children }: LayoutProps) {
  return <StyledLayout>{children}</StyledLayout>;
}
export default Layout;
