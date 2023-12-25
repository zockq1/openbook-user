import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const StyledNavigationBar = styled.nav`
  display: flex;
  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
  @media (max-width: 767px) {
    position: fixed;
    top: 45px;
    width: 100%;
    height: 45px;
    margin: 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
    box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
    background-color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.base};
    z-index: 99;
  }
`;

interface NavigationProps {
  $isCurrent: boolean;
}

const Navigation = styled(Link)<NavigationProps>`
  display: flex;
  align-items: center;
  height: 100%;
  min-width: max-content;
  margin: 0 10px;
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  color: ${({ $isCurrent, theme }) =>
    $isCurrent ? theme.colors.textBlue : theme.colors.grey};
  font-weight: ${({ $isCurrent, theme }) =>
    $isCurrent ? theme.fontWeight.regular : theme.fontWeight.light};
  font-family: "Spoqa Han Sans Neo";
  font-size: ${({ theme }) => theme.fontSizes.base};

  :hover {
    color: ${({ theme }) => theme.colors.textBlue};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
  }
`;

function NavigationBar() {
  const location = useLocation();

  return (
    <StyledNavigationBar>
      <Navigation
        to="/jeong-ju-haeng"
        $isCurrent={location.pathname.includes("/jeong-ju-haeng")}
      >
        정주행
      </Navigation>
      <Navigation
        to="/learning"
        $isCurrent={location.pathname.includes("/learning")}
      >
        자료
      </Navigation>
      <Navigation
        to="/timeline-list"
        $isCurrent={location.pathname === "/timeline"}
      >
        연표
      </Navigation>
      <Navigation
        to="/question/quiz-list"
        $isCurrent={location.pathname.includes("/question/quiz")}
      >
        퀴즈
      </Navigation>
      <Navigation
        to="/question/timeline-list"
        $isCurrent={location.pathname.includes("/question/timeline")}
      >
        연표 문제
      </Navigation>
      <Navigation
        to="/question/mock-exam-list"
        $isCurrent={location.pathname.includes("/question/mock-exam")}
      >
        기출
      </Navigation>
      <Navigation
        to="/my-info/wrong-notes"
        $isCurrent={location.pathname.includes("wrong-notes")}
      >
        오답노트
      </Navigation>
      <Navigation
        to="/my-info/bookmark"
        $isCurrent={location.pathname.includes("bookmark")}
      >
        북마크
      </Navigation>
    </StyledNavigationBar>
  );
}

export default NavigationBar;
