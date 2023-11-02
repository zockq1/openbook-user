import { ReactNode } from "react";
import styled from "styled-components";

interface LayoutProps {
  children?: ReactNode;
}

const StyledMainContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  min-height: calc(100vh - 82px);
  margin: 82px auto 0;
`;

function MainContentLayout({ children }: LayoutProps) {
  return <StyledMainContentLayout>{children}</StyledMainContentLayout>;
}

export default MainContentLayout;
