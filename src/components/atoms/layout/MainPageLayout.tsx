import { ReactNode } from "react";
import styled from "styled-components";

interface LayoutProps {
  children?: ReactNode;
}

const StyledMainPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  min-width: 260px;
  height: calc(100vh - 172px);
  margin: 10px auto;
  padding: 0 20px;
`;

function MainPageLayout({ children }: LayoutProps) {
  return <StyledMainPageLayout>{children}</StyledMainPageLayout>;
}

export default MainPageLayout;
