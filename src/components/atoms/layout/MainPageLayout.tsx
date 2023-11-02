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
  min-height: calc(100vh - 164px);
  margin: 82px auto;
`;

function MainPageLayout({ children }: LayoutProps) {
  return <StyledMainPageLayout>{children}</StyledMainPageLayout>;
}

export default MainPageLayout;
