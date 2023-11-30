import styled from "styled-components";
import LoginButton from "../../atoms/button/LoginButton";
import Logo from "../../atoms/icon/Logo";
import { Default, Mobile } from "../../atoms/layout/Responsive";
import NavigationBar from "./NavigationBar";
const MobileHeaderContainer = styled.header`
  display: flex;
  position: fixed;
  width: 100%;
  height: 45px;
  justify-content: space-between;
  padding: ${({ theme }) => theme.padding.large};
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 100;
`;

const DefualtHeader = styled.header`
  position: fixed;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  width: 100%;
  height: 100px;
  max-width: 1200px;
  min-width: 768px;
  padding: 20px;
  margin: 0 auto;
  z-index: 999;
  left: 50%;
  transform: translate(-50%, 0);

  background-color: ${({ theme }) => theme.colors.bg};
`;

function Header() {
  return (
    <>
      <Mobile>
        <MobileHeaderContainer>
          <Logo size={18} />
          <LoginButton />
        </MobileHeaderContainer>
      </Mobile>
      <Default>
        <DefualtHeader>
          <Logo size={30} />
          <NavigationBar />
          <LoginButton />
        </DefualtHeader>
      </Default>
    </>
  );
}

export default Header;
