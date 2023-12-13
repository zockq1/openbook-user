import styled from "styled-components";
import LoginButton from "../../atoms/button/LoginButton";
import Logo from "../../atoms/icon/Logo";
import { Default, Mobile } from "../../atoms/layout/Responsive";
import NavigationBar from "./NavigationBar";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import UserButton from "../../atoms/button/UserButton";

const MobileHeaderContainer = styled.header`
  display: flex;
  position: fixed;
  width: 100%;
  height: 45px;
  justify-content: space-between;
  padding: ${({ theme }) => theme.padding.base};
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 100;
`;

const DefualtHeader = styled.header`
  position: fixed;
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 2fr 1fr;
  width: 100vw;
  height: 60px;
  min-width: 768px;
  padding: 15px;
  margin: 0 auto;
  z-index: 10;
  left: 50%;
  transform: translate(-50%, 0);

  background-color: ${({ theme }) => theme.colors.bg};
`;

function Header() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <>
      <Mobile>
        <MobileHeaderContainer>
          <Logo size={18} />
          {isLoggedIn ? <UserButton /> : <LoginButton />}
        </MobileHeaderContainer>
      </Mobile>
      <Default>
        <DefualtHeader>
          <Logo size={30} />
          <NavigationBar />
          {isLoggedIn ? <UserButton /> : <LoginButton />}
        </DefualtHeader>
      </Default>
    </>
  );
}

export default Header;
