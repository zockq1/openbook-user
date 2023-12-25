import { ReactNode } from "react";
import styled from "styled-components";
import Header from "../../unit/ui/Header";
import { Default, Mobile } from "./Responsive";
import TitleBox from "../../unit/ui/TitleBox";

interface LayoutProps {
  children?: ReactNode;
}

const StyledMainPageLayout = styled.div`
  display: grid;
  position: relative;
  width: 100%;
  margin: 0 auto;
  //모바일
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: 250px;
    padding-top: 60px;
    padding-bottom: 8px;
    margin-bottom: 100px;
  }
  //PC, 태블릿
  @media (min-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 300px 300px;
    width: 800px;
    padding: 20px;
    padding-top: 90px;
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
        <TitleBox icon={"CHAPTER_COMPLETE_QUESTION"} category="" />
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
