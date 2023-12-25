import { ReactNode } from "react";
import styled from "styled-components";
import { Desktop, Mobile, Tablet } from "./Responsive";
import Header from "../../unit/ui/Header";

interface LayoutProps {
  children?: ReactNode;
  full?: boolean;
  leftMenu?: ReactNode;
  rightMenu?: ReactNode;
}

const StyledMainPageLayout = styled.div<{ full: boolean }>`
  display: grid;
  position: relative;
  min-height: 100vh;
  margin: 0 auto;
  //모바일
  @media (max-width: 767px) {
    width: 100vw;
    padding: 65px 10px 10px;
  }
  //태블릿
  @media (min-width: 768px) and (max-width: 991px) {
    grid-template-columns: ${({ full }) =>
      full ? "1fr" : "minmax(250px, 250px) minmax(400px, 700px)"};
    align-items: start;
    width: 100%;
    max-width: 1200px;

    padding: 90px 20px 20px 20px;
  }
  //PC,
  @media (min-width: 992px) {
    grid-template-columns: ${({ full }) =>
      full
        ? "1fr"
        : "minmax(250px, 250px) minmax(400px, 660px) minmax(auto, 300px)"};
    align-items: start;
    max-width: 1250px;
    padding: 90px 20px 20px 20px;
  }

  .hover {
    outline: 3px solid ${({ theme }) => theme.colors.textBlue};
    transition: 0.05s ease-in-out;
  }
`;

function ContentLayout({
  children,
  full = false,
  leftMenu,
  rightMenu,
}: LayoutProps) {
  return (
    <>
      <Desktop>
        <Header />
        <StyledMainPageLayout full={full}>
          {leftMenu}
          {children}
          {rightMenu}
        </StyledMainPageLayout>
      </Desktop>
      <Tablet>
        <Header />
        <StyledMainPageLayout full={full}>
          {leftMenu}
          {children}
        </StyledMainPageLayout>
      </Tablet>
      <Mobile>
        <StyledMainPageLayout full={full}>{children}</StyledMainPageLayout>
      </Mobile>
    </>
  );
}

export default ContentLayout;
