import styled from "styled-components";
import LoginButton from "../../atoms/button/LoginButton";
import Logo from "../../atoms/icon/Logo";

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.padding.large};
`;

function Header() {
  return (
    <StyledHeader>
      <Logo size={24} />
      <LoginButton />
    </StyledHeader>
  );
}

export default Header;
