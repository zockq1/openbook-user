import styled from "styled-components";
import LoginButton from "../../atoms/button/LoginButton";
import Logo from "../../atoms/icon/Logo";

const StyledHeader = styled.header`
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
