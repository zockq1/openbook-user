import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;

  height: 75px;
  width: 100%;

  background-color: #ffffff;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 45px;
  width: 100%;

  font-family: "Hanna";
  font-size: 24px;
  color: #2699fb;
`;

const Login = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;

  padding: 5px;
  border-radius: 6px;

  font-family: "Hanna";
  font-size: 18px;
  color: #ffffff;
  background-color: #2699fb;
`;

const NavigationBar = styled.nav`
  display: flex;
  justify-content: space-around;

  height: 30px;
  width: 100%;

  background-color: #ffffff;
`;

interface NavigationItemProps {
  $onActive: boolean;
}

const NavigationItem = styled(Link)<NavigationItemProps>`
  display: flex;
  align-items: center;

  height: 100%;

  padding: 5px;
  border-radius: 5px;

  color: ${({ $onActive }) => ($onActive ? "#2699fb" : "#838383")};
`;

const NavigationText = styled.span`
  font-family: "Hanna";
  font-weight: 100;
  font-size: 15px;
`;

function Header() {
  const [activeNav, setActiveNav] = useState(1);
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setActiveNav(1);
        break;
      case "/topic-learning":
        setActiveNav(2);
        break;
      case "/question-solving":
        setActiveNav(3);
        break;
      case "/note":
        setActiveNav(4);
        break;
      case "/settings":
        setActiveNav(5);
        break;
      default:
        setActiveNav(1);
        break;
    }
  }, [location.pathname]);

  return (
    <HeaderWrapper>
      <Logo>오픈북</Logo>
      <Login>로그인</Login>
      <NavigationBar>
        <NavigationItem
          to={"/"}
          onClick={() => setActiveNav(1)}
          $onActive={1 === activeNav}
        >
          <NavigationText>메인</NavigationText>
        </NavigationItem>
        <NavigationItem
          to={"/topic-learning"}
          onClick={() => setActiveNav(2)}
          $onActive={2 === activeNav}
        >
          <NavigationText>개념학습</NavigationText>
        </NavigationItem>
        <NavigationItem
          to={"/question-solving"}
          onClick={() => setActiveNav(3)}
          $onActive={3 === activeNav}
        >
          <NavigationText>문제풀기</NavigationText>
        </NavigationItem>
        <NavigationItem
          to={"/note"}
          onClick={() => setActiveNav(4)}
          $onActive={4 === activeNav}
        >
          <NavigationText>오답노트</NavigationText>
        </NavigationItem>
        <NavigationItem
          to={"/settings"}
          onClick={() => setActiveNav(5)}
          $onActive={5 === activeNav}
        >
          <NavigationText>옵션</NavigationText>
        </NavigationItem>
      </NavigationBar>
    </HeaderWrapper>
  );
}

export default Header;
