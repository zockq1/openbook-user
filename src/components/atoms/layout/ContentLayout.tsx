import { ReactNode } from "react";
import styled from "styled-components";
import { Default, Mobile } from "./Responsive";
import Header from "../../unit/ui/Header";

interface LayoutProps {
  children?: ReactNode;
  width?: string;
}

const StyledMainPageLayout = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
  margin: 0 auto;
  //모바일
  @media (max-width: 767px) {
    width: 100vw;
    padding: 60px 20px 20px;
  }
  //PC, 태블릿
  @media (min-width: 768px) {
    align-items: center;
    max-width: ${({ width }) => width};
    min-width: 900px;
    padding: 90px 50px 20px 50px;
  }

  .hover {
    outline: 3px solid ${({ theme }) => theme.colors.textBlue};
    transition: 0.05s ease-in-out;
  }
`;

const Content = styled.div`
  @media (min-width: 768px) {
    padding: 0 50px;
  }
`;

function ContentLayout({ children, width = "1680px" }: LayoutProps) {
  return (
    <>
      <Default>
        <Header />
      </Default>
      <StyledMainPageLayout width={width}>
        <Default>
          <Content>{children}</Content>
        </Default>
        <Mobile>{children}</Mobile>
      </StyledMainPageLayout>
    </>
  );
}

export default ContentLayout;
