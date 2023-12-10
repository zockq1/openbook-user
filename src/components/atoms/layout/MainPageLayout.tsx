import { ReactNode } from "react";
import styled from "styled-components";
import Header from "../../unit/ui/Header";
import NavigationBar from "../../unit/ui/NavigationBar";
import { Default, Mobile } from "./Responsive";

interface LayoutProps {
  children?: ReactNode;
}

const StyledMainPageLayout = styled.div`
  display: grid;
  position: relative;
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  //모바일
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: 3fr 2fr 2fr;
    padding-top: 98px;
    padding-bottom: 8px;
    margin-bottom: 100px;
  }
  //PC, 태블릿
  @media (min-width: 768px) {
    grid-template-columns: 1fr 300px 300px 1fr;
    grid-template-rows: 2fr 1fr 1fr;
    max-width: 1200px;
    min-width: 768px;
    padding: 20px;
    padding-top: 70px;
  }

  .hover {
    outline: 3px solid ${({ theme }) => theme.colors.textBlue};
    transition: 0.05s ease-in-out;
  }

  & > div {
  }
`;

function MainPageLayout({ children }: LayoutProps) {
  return (
    <>
      <Mobile>
        <Header />
        <NavigationBar />
      </Mobile>
      <StyledMainPageLayout>
        <Default>
          <Header />
        </Default>
        {children}
      </StyledMainPageLayout>
    </>
  );
}

export default MainPageLayout;
