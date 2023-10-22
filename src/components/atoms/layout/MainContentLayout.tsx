import { ReactNode } from "react";
import styled from "styled-components";

interface LayoutProps {
  children?: ReactNode;
}

const StyledMainContentLayout = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 80px;
`;

function MainContentLayout({ children }: LayoutProps) {
  return <StyledMainContentLayout>{children}</StyledMainContentLayout>;
}

export default MainContentLayout;
