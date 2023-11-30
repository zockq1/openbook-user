import { ReactNode } from "react";
import styled from "styled-components";
import { Default, Mobile } from "./Responsive";
import Header from "../../unit/ui/Header";

interface LayoutProps {
  children?: ReactNode;
}

const StyledMainPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  min-height: 100vh;
  //모바일
  @media (max-width: 767px) {
    width: 100vw;
    padding: 60px 20px 20px;
  }
  //PC, 태블릿
  @media (min-width: 768px) {
    max-width: 1200px;
    min-width: 768px;
    padding: 20px;
    padding: 100px 20px 20px;
  }

  .hover {
    outline: 3px solid ${({ theme }) => theme.colors.textBlue};
    transition: 0.05s ease-in-out;
  }
`;

const Content = styled.div`
  @media (min-width: 768px) {
    padding: 0 30%;
    grid-column: 1/5;
  }
`;

function ContentLayout({ children }: LayoutProps) {
  return (
    <>
      <Default>
        <Header />
      </Default>
      <StyledMainPageLayout>
        <Default>
          <Content>{children}</Content>
        </Default>
        <Mobile>{children}</Mobile>
      </StyledMainPageLayout>
    </>
  );
}

export default ContentLayout;
