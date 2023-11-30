import styled from "styled-components";
import LoginButton from "../../atoms/button/LoginButton";
import Logo from "../../atoms/icon/Logo";
import { Default, Mobile } from "../../atoms/layout/Responsive";
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
  display: flex;
  padding: ${({ theme }) => theme.padding.large};
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
        </DefualtHeader>
      </Default>
    </>
  );
}

export default Header;
