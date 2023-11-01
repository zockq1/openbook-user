import { ReactNode } from "react";
import styled from "styled-components";

interface LayoutProps {
  children?: ReactNode;
}

const StyledMainContentLayout = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 82px auto;
  margin-bottom: 80px;
`;

function MainContentLayout({ children }: LayoutProps) {
  return <StyledMainContentLayout>{children}</StyledMainContentLayout>;
}

export default MainContentLayout;
